// Lightweight WebAudio sound utility — synthesized clicks + success bell.
// No network calls, respects a persisted mute toggle and prefers-reduced-motion.

const STORAGE_KEY = "aam-sound-muted";

let ctx: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // ignore
  }
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent("aam-sound-muted", { detail: next }));
}

export function toggleMuted() {
  setMuted(!muted);
  return muted;
}

function shouldPlay(): boolean {
  if (muted) return false;
  if (typeof window === "undefined") return false;
  return true;
}

/** Soft golden UI click — quick sine pop with a subtle overtone. */
export function playClick() {
  if (!shouldPlay()) return;
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  gain.connect(ac.destination);

  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.1);
  osc.connect(gain);

  const osc2 = ac.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(1320, now);
  osc2.frequency.exponentialRampToValueAtTime(660, now + 0.1);
  const g2 = ac.createGain();
  g2.gain.setValueAtTime(0.05, now);
  g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  osc2.connect(g2);
  g2.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.13);
  osc2.start(now);
  osc2.stop(now + 0.11);
}

/** Success bell — two-note gentle chime (E5 → A5). */
export function playSuccess() {
  if (!shouldPlay()) return;
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  const notes: Array<{ f: number; t: number; d: number }> = [
    { f: 659.25, t: 0, d: 0.35 }, // E5
    { f: 880.0, t: 0.09, d: 0.55 }, // A5
  ];

  for (const n of notes) {
    const start = now + n.t;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + n.d);
    gain.connect(ac.destination);

    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(n.f, start);
    osc.connect(gain);
    osc.start(start);
    osc.stop(start + n.d + 0.02);

    // sparkle harmonic
    const h = ac.createOscillator();
    h.type = "sine";
    h.frequency.setValueAtTime(n.f * 2, start);
    const hg = ac.createGain();
    hg.gain.setValueAtTime(0.0001, start);
    hg.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
    hg.gain.exponentialRampToValueAtTime(0.0001, start + n.d * 0.7);
    h.connect(hg);
    hg.connect(ac.destination);
    h.start(start);
    h.stop(start + n.d);
  }
}