/** Short, soft two-tone chime via Web Audio (no audio file). */
export function playSoftBell(): void {
  if (typeof window === "undefined") return;

  void (async () => {
    try {
      const ctx = new AudioContext();
      if (ctx.state === "suspended") await ctx.resume();

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

      tone(987.77, 0, 0.55, 0.1);
      tone(1318.51, 0.04, 0.45, 0.05);

      window.setTimeout(() => void ctx.close(), 700);
    } catch {
      // Blocked by autoplay policy or unsupported environment
    }
  })();
}
