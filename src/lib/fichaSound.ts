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
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.82,
      start + duration,
    );

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  };

  const click = (start: number, frequency: number, gainValue: number) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.5,
      start + 0.08,
    );
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.12);
  };

  tone(220, now, 0.18, 0.16, "sawtooth");
  tone(440, now + 0.08, 0.18, 0.14, "triangle");
  tone(660, now + 0.16, 0.18, 0.12, "triangle");
  tone(880, now + 0.24, 0.22, 0.1, "sine");
  click(now + 0.02, 120, 0.12);
  click(now + 0.11, 150, 0.1);
  click(now + 0.2, 180, 0.08);

  window.setTimeout(() => {
    void context.close().catch(() => {});
  }, 420);
}
