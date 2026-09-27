import { ALL_CASES } from "../data/cases";
import type { CaseResult } from "../types";

interface Props {
  results: Record<string, CaseResult>;
  onOpenCase: (caseId: string) => void;
  onResetAll: () => void;
}

export default function OCProfile({ results, onOpenCase, onResetAll }: Props) {
  const total = ALL_CASES.length;
  const done = Object.keys(results).length;
  const complete = done === total;

  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <p className="opener-eyebrow">
            {complete ? "Fully decided" : `${done} / ${total} decided`}
          </p>
          <h2>Your OC</h2>
        </div>
        {done > 0 && (
          <button className="ghost-button" onClick={onResetAll}>
            Reroll everything
          </button>
        )}
      </div>

      {done === 0 ? (
        <p className="profile-empty">
          Nothing decided yet — open a case to start filling this in.
        </p>
      ) : (
        <div className="profile-grid">
          {ALL_CASES.map((ocCase) => {
            const result = results[ocCase.id];
            return (
              <button
                key={ocCase.id}
                className={`profile-slot${result ? "" : " profile-slot--empty"}`}
                style={{ ["--accent" as string]: ocCase.accent }}
                onClick={() => onOpenCase(ocCase.id)}
              >
                <span className="profile-slot-name">{ocCase.name}</span>
                {result ? (
                  <span className="profile-slot-value">
                    <span>{result.item.emoji}</span> {result.item.label}
                  </span>
                ) : (
                  <span className="profile-slot-value profile-slot-value--empty">
                    Not opened
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
