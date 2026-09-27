import { useCallback, useEffect, useRef, useState } from "react";
import type { OCCase, OCItem } from "../types";
import { generateReel } from "../lib/reel";
import { useSound } from "../hooks/useSound";

interface Props {
  ocCase: OCCase;
  onLanded: (item: OCItem) => void;
  onClose: () => void;
  compact?: boolean; // New prop
}

const CARD_WIDTH = 148;
const SPIN_MS = 6200;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

type Phase = "idle" | "spinning" | "landed";

export default function CaseOpener({ ocCase, onLanded, onClose, compact = false }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [strip, setStrip] = useState<number[]>([]);
  const [winningPosition, setWinningPosition] = useState(0);
  const [offset, setOffset] = useState(0);
  const [landedItem, setLandedItem] = useState<OCItem | null>(null);
  const [flash, setFlash] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const { playFrame, playSelect, playUnbox } = useSound();

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const handleOpen = async () => {
    if (phase === "spinning") return;

    setFlash(true);
    setTimeout(() => setFlash(false), 2200);
    playUnbox();

    setPhase("spinning");
    setLandedItem(null);

    const result = await generateReel(ocCase.items.length);
    setStrip(result.sequence);
    setWinningPosition(result.winning_position);

    const container = trackRef.current?.parentElement;
    // In compact mode, width might be smaller, so we recalculate center
    const centerOffset = (container?.clientWidth ?? 900) / 2;

    const targetOffset =
      result.winning_position * CARD_WIDTH + CARD_WIDTH / 2 - centerOffset;
    const startOffset = CARD_WIDTH / 2 - centerOffset;

    lastIndexRef.current = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / SPIN_MS);
      const eased = easeOutExpo(t);
      const current = startOffset + (targetOffset - startOffset) * eased;
      setOffset(current);

      const idx = Math.round((current - startOffset) / CARD_WIDTH);
      if (idx !== lastIndexRef.current && idx >= 0 && idx < result.sequence.length) {
        lastIndexRef.current = idx;
        if (t < 1) playFrame();
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOffset(targetOffset);
        const item = ocCase.items[result.winning_index];
        setLandedItem(item);
        setPhase("landed");
        playSelect();
        onLanded(item);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  // Content of the opener panel
  const panelContent = (
    <div
      className={`opener-panel ${compact ? 'opener-panel--compact' : ''}`}
      style={{ ["--accent" as string]: ocCase.accent }}
    >
      {!compact && (
        <header className="opener-header">
          <div>
            <p className="opener-eyebrow">{ocCase.tagline}</p>
            <h2>{ocCase.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
      )}

      {compact && (
        <div className="compact-case-title">
          <h3>{ocCase.name}</h3>
        </div>
      )}

      <div className="reel-viewport">
        {flash && <div className="reel-flash" />}
        <div className="reel-pointer" />
        {phase === "idle" ? (
          <div className="reel-preview">
            {ocCase.items.slice(0, 5).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="reel-track"
            style={{ transform: `translateX(${-offset}px)` }}
          >
            {strip.map((itemIndex, i) => (
              <ItemCard
                key={i}
                item={ocCase.items[itemIndex]}
                highlighted={phase === "landed" && i === winningPosition}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="opener-footer">
        {phase === "idle" && (
          <button className="primary-button" onClick={handleOpen}>
            Open
          </button>
        )}
        {phase === "spinning" && (
          <button className="primary-button" disabled>
            Rolling…
          </button>
        )}
        {phase === "landed" && landedItem && (
          <div className="landed-row">
            <div className="landed-result">
              <span className="landed-emoji">{landedItem.emoji}</span>
              <span className="landed-label">{landedItem.label}</span>
            </div>
            {!compact && (
              <div className="landed-actions">
                <button className="ghost-button" onClick={handleOpen}>
                  Reroll
                </button>
                <button className="primary-button" onClick={onClose}>
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </footer>
    </div>
  );

  if (compact) {
    return panelContent;
  }

  return (
    <div className="opener-overlay" role="dialog" aria-label={`${ocCase.name} opener`}>
      {panelContent}
    </div>
  );
}

function ItemCard({ item, highlighted }: { item: OCItem; highlighted?: boolean }) {
  return (
    <div
      className={`item-card${highlighted ? " item-card--win" : ""}`}
      style={{ ["--item-color" as string]: item.color }}
    >
      <span className="item-card-emoji">{item.emoji}</span>
      <span className="item-card-label">{item.label}</span>
    </div>
  );
}