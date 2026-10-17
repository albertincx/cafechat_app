export type MessageSender = 'user' | 'operator' | 'system'

export interface ChatMessage {
  id: string
  text: string
  sender: MessageSender
  author?: string
  timestamp: string
  isMine?: boolean
  img?: string
  status?: 'sending' | 'sent' | 'delivered'
  isSystem?: boolean
  meta?: {
    encrypted?: boolean
    cipher?: string
    hash?: string
  }
}

export type ConnectionStatus = 'connected' | 'connecting' | 'offline' | 'simulated'

export interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  unreadCount: number
  status: ConnectionStatus
  isTyping: boolean
  soundEnabled: boolean
  latency: number
  uid: string
}
