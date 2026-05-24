let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTones(ctx: AudioContext): void {
  const now = ctx.currentTime;

  const tone = (
    frequency: number,
    start: number,
    duration: number,
    volume: number
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now + start);
    gain.gain.setValueAtTime(0, now + start);
    gain.gain.linearRampToValueAtTime(volume, now + start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + start);
    osc.stop(now + start + duration);
  };

  tone(987.77, 0, 0.55, 0.12);
  tone(1318.51, 0.04, 0.45, 0.06);
}

/** Resume audio after a user gesture (scroll, click, key). */
export function unlockAudio(): void {
  if (typeof window === "undefined") return;

  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

/** Plays immediately when audio is unlocked; never delays until a later gesture. */
export function playSoftBell(): void {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioContext();
    if (ctx.state !== "running") {
      return;
    }
    playTones(ctx);
  } catch {
    // Unsupported or blocked
  }
}
