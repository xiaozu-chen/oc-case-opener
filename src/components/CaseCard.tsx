import type { CaseResult, OCCase } from "../types";

interface Props {
  ocCase: OCCase;
  result?: CaseResult;
  onOpen: () => void;
  // New props for multi-select
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

export default function CaseCard({
  ocCase,
  result,
  onOpen,
  isSelected = false,
  onToggleSelect
}: Props) {

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card open
    if (onToggleSelect) {
      onToggleSelect(ocCase.id);
    }
  };

  return (
    <button
      className={`case-card ${isSelected ? 'case-card--selected' : ''}`}
      style={{ ["--accent" as string]: ocCase.accent }}
      onClick={onOpen}
    >
      {/* Selection Checkbox */}
      {onToggleSelect && (
        <div
          className="case-card-checkbox"
          onClick={handleCheckboxClick}
        >
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
          />
          <span className="checkmark"></span>
        </div>
      )}

      <div className="case-card-glow" />
      <p className="case-card-tagline">{ocCase.tagline}</p>
      <h3 className="case-card-name">{ocCase.name}</h3>
      <p className="case-card-count">{ocCase.items.length} possible items</p>

      <div className="case-card-footer">
        {result ? (
          <span className="case-card-result">
            <span>{result.item.emoji}</span> {result.item.label}
          </span>
        ) : (
          <span className="case-card-cta">Open case →</span>
        )}
      </div>
    </button>
  );
}