export function playFichaPurchaseSound() {
  const AudioCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioCtor) return;

  const context = new AudioCtor();
  const now = context.currentTime;

  const triggerTone = (
    frequency: number,
    start: number,
    duration: number,
    gainValue: number,
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  };

  const makeNoiseBurst = (
    start: number,
    duration: number,
    gainValue: number,
  ) => {
    const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let index = 0; index < frameCount; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * (1 - index / frameCount);
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    filter.type = "highpass";
    filter.frequency.setValueAtTime(1200, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(start);
    source.stop(start + duration);
  };

  triggerTone(920, now, 0.18, 0.16);
  triggerTone(760, now + 0.08, 0.18, 0.14);
  triggerTone(620, now + 0.16, 0.2, 0.1);
  makeNoiseBurst(now + 0.02, 0.2, 0.08);

  window.setTimeout(() => {
    void context.close().catch(() => {});
  }, 400);
}
