export function playFichaPurchaseSound() {
  const AudioCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioCtor) return;

  const context = new AudioCtor();
  const now = context.currentTime;

  const tone = (
    frequency: number,
    start: number,
    duration: number,
    gainValue: number,
    type: OscillatorType,
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  };

  const click = (start: number, frequency: number) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.6,
      start + 0.08,
    );
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.1, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.12);
  };

  tone(740, now, 0.12, 0.12, "square");
  tone(880, now + 0.08, 0.1, 0.1, "triangle");
  tone(1180, now + 0.16, 0.12, 0.09, "sawtooth");
  click(now + 0.02, 120);
  click(now + 0.12, 140);

  window.setTimeout(() => {
    void context.close().catch(() => {});
  }, 260);
}
