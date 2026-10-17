import { useState, useEffect, useRef, useCallback } from 'react'
import { ChatMessage, ConnectionStatus } from '@/types/chat'
import { audioManager } from '@/utils/audio'
import Storage from '@/utils/storage'
import { Language, translations } from '@/i18n/translations'
export const UID_STORED = 'instantChatBotUidNameStored'

export function useDarkWebChat (lang: Language = 'en') {
  const t = translations[lang]
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('webchat_messages')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // Ignore
    }
    return [
      {
        id: 'sys-0',
        text: translations.en.welcomeSystem,
        sender: 'system',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        isSystem: true,
      },
      {
        id: 'msg-init-1',
        text: translations.en.welcomeMessage,
        sender: 'operator',
        author: translations.en.supportAgent,
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        meta: {
          encrypted: true,
        },
      },
    ]
  })

  const [unreadCount, setUnreadCount] = useState(0)
  const [status, setStatus] = useState<ConnectionStatus>('offline')
  const [isTyping, setIsTyping] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return Storage.get('webchat_sound_enabled') !== 'false'
  })
  const [latency, setLatency] = useState(24)
  const [uid, setUid] = useState(() => {
    return Storage.get(UID_STORED) || `user_${Math.random().toString(36).substring(2, 8)}`
  })

  const uidRef = useRef(uid)
  uidRef.current = uid
  const tRef = useRef(t)
  tRef.current = t

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<any>(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen
  const soundEnabledRef = useRef(soundEnabled)
  soundEnabledRef.current = soundEnabled

  // Save messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('webchat_messages', JSON.stringify(messages.slice(-50)))
    } catch {
      // Ignore
    }
  }, [messages])

  // Latency jitter for realistic connection feel
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.min(65, Math.max(14, prev + Math.floor(Math.random() * 7) - 3)))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Manage window globals for legacy compatibility
  useEffect(() => {
    window.instantChatBot = {
      show: isOpen,
      open: () => {
        setIsOpen(prev => !prev)
      },
    }
  }, [isOpen])

  // Track window focus/blur
  useEffect(() => {
    const onFocus = () => { window.__arsfChatInBackground = false }
    const onBlur = () => { window.__arsfChatInBackground = true }
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  // Trigger sound and unread count
  const handleIncomingMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => {
      const isDup = prev.some(
        m => m.id === msg.id || (m.sender === msg.sender && m.text.trim() === msg.text.trim() && (m.img || '') === (msg.img || ''))
      )
      if (isDup) return prev
      return [...prev, msg]
    })
    if (!isOpenRef.current || document.hidden || window.__arsfChatInBackground) {
      setUnreadCount(prev => prev + 1)
      audioManager.playNotification(soundEnabledRef.current)
    }
  }, [])

  // Simulated bot reply
  const triggerBotReply = useCallback((userText: string) => {
    setIsTyping(true)
    const delay = Math.floor(Math.random() * 900) + 700

    setTimeout(() => {
      setIsTyping(false)
      const clean = userText.trim().toLowerCase()
      const currentT = translations[lang]

      let replyText = ''
      let isSystem = false

      if (clean === '/help') {
        replyText = lang === 'ru'
          ? 'Доступные команды:\n• /status  - проверка статуса соединения\n• /ping    - проверка задержки\n• /clear   - очистить диалог\n• /agent   - позвать оператора'
          : 'Available commands:\n• /status - check connection status\n• /ping   - check latency\n• /clear  - clear chat history\n• /agent  - request live support agent'
        isSystem = true
      } else if (clean === '/status') {
        replyText = lang === 'ru'
          ? `СТАТУС СИСТЕМЫ: АКТИВЕН\n• Задержка: ${latency}мс\n• Шифрование: TLS 1.3 / E2EE\n• Сессия: ${uid}`
          : `SYSTEM STATUS: OPERATIONAL\n• Latency: ${latency}ms\n• Security: TLS 1.3 / E2EE Active\n• Session ID: ${uid}`
        isSystem = true
      } else if (clean === '/ping') {
        replyText = lang === 'ru'
          ? `PONG! Задержка сети: ${latency}мс`
          : `PONG! Network latency: ${latency}ms`
        isSystem = true
      } else if (clean === '/agent') {
        replyText = lang === 'ru'
          ? 'Запрос отправлен. Дежурный специалист подключится в течение 1 минуты.'
          : 'Request dispatched. A support specialist will join this conversation shortly.'
        isSystem = true
      } else {
        const pool = currentT.botResponses
        replyText = pool[Math.floor(Math.random() * pool.length)]
      }

      const botMsg: ChatMessage = {
        id: `op-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        text: replyText,
        sender: isSystem ? 'system' : 'operator',
        author: isSystem ? currentT.systemNotice : currentT.supportAgent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        isSystem,
        meta: {
          encrypted: true,
        },
      }

      handleIncomingMessage(botMsg)
    }, delay)
  }, [handleIncomingMessage, lang, latency, uid])

  // WebSocket connection management
  const connectWebSocket = useCallback(() => {
    // If already connected or connecting, do not re-connect
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return
    }

    let wsUri = ''
    if (window.__arsfChatUrl) {
      wsUri = `wss://${window.__arsfChatUrl}/`
    } else if (import.meta.env.VITE_APP_WS_URI) {
      wsUri = import.meta.env.VITE_APP_WS_URI
    }

    if (!wsUri || wsUri.includes('undefined')) {
      setStatus('simulated')
      return
    }

    setStatus('connecting')

    try {
      const ws = new WebSocket(wsUri)
      wsRef.current = ws
      window.__arsfChat = ws

      ws.onopen = () => {
        setStatus('connected')
        const handshakeMsg = {
          service: 'lastmes',
          g: window.__arsfChatIdg || '',
          uid: uidRef.current,
          message: 'hi',
        }
        ws.send(JSON.stringify(handshakeMsg))
      }

      ws.onmessage = (event) => {
        try {
          let data = event.data
          if (typeof data === 'string' && data.startsWith('{')) {
            const parsed = JSON.parse(data)
            if (parsed.service === 'setUid' && parsed.message) {
              uidRef.current = parsed.message
              setUid(parsed.message)
              Storage.set(UID_STORED, parsed.message)
              return
            }
            if (parsed.service === 'lastmes') {
              const rawLastMess = Array.isArray(parsed.lastMess)
                ? parsed.lastMess
                : Array.isArray(parsed.messages)
                  ? parsed.messages
                  : []

              if (rawLastMess.length === 0) {
                return
              }

              // Sort chronologically (oldest first)
              const sorted = [...rawLastMess]
              const hasTimestamps = sorted.some((m: any) => m && m.createdAt)
              if (hasTimestamps) {
                sorted.sort((a: any, b: any) => {
                  const tA = a?.createdAt ? new Date(a.createdAt).getTime() : 0
                  const tB = b?.createdAt ? new Date(b.createdAt).getTime() : 0
                  return tA - tB
                })
              } else {
                // In legacy backend, lastMess was returned newest-first; reverse to maintain chronological display
                sorted.reverse()
              }

              const loaded: ChatMessage[] = sorted
                .filter((m: any) => m && (m.message || m.text || m.img))
                .map((m: any, idx: number) => {
                  const isOperator = m.sender === 'admin' || m.sender === 'operator'
                  const text = (m.message || m.text || '').trim()
                  const createdTime = m.createdAt ? new Date(m.createdAt) : null
                  const timestamp = createdTime && !isNaN(createdTime.getTime())
                    ? createdTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                  const stableId = m._id
                    ? `msg-${m._id}`
                    : m.id
                      ? `msg-${m.id}`
                      : `hist-${m.sender || 'm'}-${m.createdAt || idx}-${text.slice(0, 20)}`

                  return {
                    id: stableId,
                    text,
                    sender: isOperator ? 'operator' : 'user',
                    author: isOperator ? tRef.current.supportAgent : tRef.current.you,
                    timestamp,
                    status: 'delivered',
                    img: m.img,
                    meta: {
                      encrypted: true,
                    },
                  }
                })

              setMessages(prev => {
                const seenFingerprints = new Set<string>()
                const seenIds = new Set<string>()

                const makeFingerprint = (msg: { sender: string; text: string; img?: string }) =>
                  `${msg.sender}::${(msg.text || '').trim()}::${msg.img || ''}`

                const result: ChatMessage[] = []

                // 1. Keep initial system notice (sys-0) if present
                const initialSystemMsg = prev.find(p => p.id === 'sys-0' || (p.isSystem && p.sender === 'system'))
                if (initialSystemMsg) {
                  result.push(initialSystemMsg)
                  seenIds.add(initialSystemMsg.id)
                  seenFingerprints.add(makeFingerprint(initialSystemMsg))
                }

                // 2. Add loaded history messages
                for (const msg of loaded) {
                  const fp = makeFingerprint(msg)
                  if (!seenFingerprints.has(fp) && !seenIds.has(msg.id)) {
                    seenFingerprints.add(fp)
                    seenIds.add(msg.id)
                    result.push(msg)
                  }
                }

                // 3. Preserve any local pending messages or newly added user messages
                for (const p of prev) {
                  if (p.id === 'sys-0' || p.id === 'msg-init-1') continue
                  const fp = makeFingerprint(p)
                  if (!seenFingerprints.has(fp) && !seenIds.has(p.id)) {
                    seenFingerprints.add(fp)
                    seenIds.add(p.id)
                    result.push(p)
                  }
                }

                return result
              })

              return
            }
            data = parsed
          }

          const incomingText = typeof data === 'object' ? data.message || JSON.stringify(data) : data
          if (incomingText) {
            const incomingMsg: ChatMessage = {
              id: `ws-${Date.now()}`,
              text: incomingText,
              sender: 'operator',
              author: tRef.current.supportAgent,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'delivered',
              img: typeof data === 'object' ? data.img : undefined,
            }
            handleIncomingMessage(incomingMsg)
          }
        } catch {
          // Parse error
        }
      }

      ws.onerror = () => {
        setStatus('simulated')
      }

      ws.onclose = () => {
        setStatus('simulated')
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket()
        }, 8000)
      }
    } catch {
      setStatus('simulated')
    }
  }, [handleIncomingMessage])

  // Connect to WebSocket ONLY when chat is opened for the first time
  useEffect(() => {
    if (isOpen) {
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED || wsRef.current.readyState === WebSocket.CLOSING) {
        connectWebSocket()
      }
    }
  }, [isOpen, connectWebSocket])

  // Cleanup on unmount only (keep socket alive in background when toggling isOpen)
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  // Send message
  const sendMessage = useCallback((text: string, img?: string) => {
    if (!text && !img) return

    const trimmed = text.trim()

    // Handle /clear command
    if (trimmed.toLowerCase() === '/clear') {
      setMessages([])
      return
    }

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: trimmed,
      sender: 'user',
      author: t.you,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      img,
      meta: {
        encrypted: true,
      },
    }

    setMessages(prev => [...prev, newMsg])

    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === newMsg.id ? { ...m, status: 'delivered' } : m)),
      )
    }, 250)

    let sentWs = false
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        const payload = {
          message: trimmed || 'Image attachment',
          host: window.location.host,
          pathname: window.location.pathname,
          g: window.__arsfChatIdg || '',
          uid,
          img: img || '',
        }
        wsRef.current.send(JSON.stringify(payload))
        sentWs = true
      } catch {
        sentWs = false
      }
    }

    if (!sentWs || status === 'simulated') {
      triggerBotReply(trimmed)
    }
  }, [status, t.you, triggerBotReply, uid])

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev
      if (next) {
        setUnreadCount(0)
      }
      return next
    })
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev
      Storage.set('webchat_sound_enabled', String(next))
      if (next) {
        audioManager.playNotification(true)
      }
      return next
    })
  }, [])

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: `sys-reset-${Date.now()}`,
        text: lang === 'ru'
          ? 'История сообщений была очищена.'
          : 'Chat conversation history has been cleared.',
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        isSystem: true,
      },
    ])
  }, [lang])

  return {
    isOpen,
    toggleOpen,
    messages,
    sendMessage,
    unreadCount,
    status,
    isTyping,
    soundEnabled,
    toggleSound,
    latency,
    uid,
    clearChat,
  }
}
