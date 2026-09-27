import type { CaseGroup, CaseResult, OCCase } from "../types";
import CaseCard from "./CaseCard";

interface Props {
  groups: CaseGroup[];
  results: Record<string, CaseResult>;
  onOpenCase: (ocCase: OCCase) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  // New props for Select All functionality
  onSelectAll: () => void;
  onDeselectAll: () => void;
  isAllSelected: boolean;
}

export default function CaseList({
  groups,
  results,
  onOpenCase,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  isAllSelected
}: Props) {
  return (
    <div className="case-list">
      {/* NEW: Toolbar for Select All / Deselect All */}
      <div className="case-list-toolbar">
        <button
          className="ghost-button small"
          onClick={isAllSelected ? onDeselectAll : onSelectAll}
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </button>

        {selectedIds.size > 0 && (
          <span className="selection-count">
            {selectedIds.size} selected
          </span>
        )}
      </div>

      {groups.map((group) => (
        <section key={group.id} className="case-group">
          <div className="case-group-heading">
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </div>
          <div className="case-grid">
            {group.cases.map((ocCase) => (
              <CaseCard
                key={ocCase.id}
                ocCase={ocCase}
                result={results[ocCase.id]}
                onOpen={() => onOpenCase(ocCase)}
                isSelected={selectedIds.has(ocCase.id)}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}