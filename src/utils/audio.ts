import notifySound from '@/assets/sound.mp3'

class AudioManager {
  private audio: HTMLAudioElement | null = null
  private audioCtx: AudioContext | null = null

  constructor () {
    try {
      this.audio = new Audio(notifySound)
      this.audio.volume = 0.5
    } catch {
      // Audio not supported in environment
    }
  }

  // Synthesize a sci-fi cyber ping using Web Audio API as high-reliability fallback
  private playSynthesizedChime () {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx()
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume()
      }

      const now = this.audioCtx.currentTime
      const osc = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08)
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.16)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc.connect(gain)
      gain.connect(this.audioCtx.destination)

      osc.start(now)
      osc.stop(now + 0.24)
    } catch {
      // AudioContext playback failed or blocked
    }
  }

  public playNotification (enabled: boolean = true) {
    if (!enabled) return
    if (this.audio) {
      this.audio.currentTime = 0
      this.audio.play().catch(() => {
        // Fallback to Web Audio chime if element playback failed
        this.playSynthesizedChime()
      })
    } else {
      this.playSynthesizedChime()
    }
  }
}

export const audioManager = new AudioManager()
