import { useEffect, useState } from "react";
import { CASE_GROUPS, ALL_CASES } from "./data/cases";
import type { CaseResult, OCCase, OCItem } from "./types";
import CaseList from "./components/CaseList";
import CaseOpener from "./components/CaseOpener";
import OCProfile from "./components/OCProfile";
import "./styles/theme.css";
import "./App.css";

const STORAGE_KEY = "oc-decider-results";
type View = "cases" | "profile";

function loadResults(): Record<string, CaseResult> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CaseResult>) : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [view, setView] = useState<View>("cases");
  const [results, setResults] = useState<Record<string, CaseResult>>(loadResults);
  const [activeCase, setActiveCase] = useState<OCCase | null>(null);

  const [selectedCaseIds, setSelectedCaseIds] = useState<Set<string>>(new Set());
  const [isMultiOpening, setIsMultiOpening] = useState(false);
  const [multiOpenCases, setMultiOpenCases] = useState<OCCase[]>([]);

  // NEW: Calculate if all cases are selected
  const isAllSelected = selectedCaseIds.size === ALL_CASES.length && ALL_CASES.length > 0;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  }, [results]);

  const handleLanded = (caseId: string, item: OCItem) => {
    setResults((prev) => ({
      ...prev,
      [caseId]: { caseId, item, rolledAt: Date.now() },
    }));
  };

  const openCaseById = (caseId: string) => {
    const ocCase = ALL_CASES.find((c) => c.id === caseId);
    if (ocCase) setActiveCase(ocCase);
  };

  const toggleSelectCase = (id: string) => {
    setSelectedCaseIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // NEW: Handlers for Select/Deselect All
  const handleSelectAll = () => {
    setSelectedCaseIds(new Set(ALL_CASES.map(c => c.id)));
  };

  const handleDeselectAll = () => {
    setSelectedCaseIds(new Set());
  };

  const startMultiOpen = () => {
    if (selectedCaseIds.size === 0) return;
    const casesToOpen = ALL_CASES.filter(c => selectedCaseIds.has(c.id));
    setMultiOpenCases(casesToOpen);
    setIsMultiOpening(true);
  };

  const closeMultiOpen = () => {
    setIsMultiOpening(false);
    setMultiOpenCases([]);
    setSelectedCaseIds(new Set());
  };

  const handleSingleLanded = (item: OCItem) => {
    if (!activeCase) return;
    handleLanded(activeCase.id, item);
  };

  const handleMultiLanded = (caseId: string, item: OCItem) => {
    handleLanded(caseId, item);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-brand-mark">◆</span>
          <span className="app-brand-name">OC Decider</span>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-tab${view === "cases" ? " nav-tab--active" : ""}`}
            onClick={() => setView("cases")}
          >
            Cases
          </button>
          <button
            className={`nav-tab${view === "profile" ? " nav-tab--active" : ""}`}
            onClick={() => setView("profile")}
          >
            Your OC
            {Object.keys(results).length > 0 && (
              <span className="nav-tab-count">{Object.keys(results).length}</span>
            )}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === "cases" ? (
          <>
            <CaseList
              groups={CASE_GROUPS}
              results={results}
              onOpenCase={setActiveCase}
              selectedIds={selectedCaseIds}
              onToggleSelect={toggleSelectCase}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              isAllSelected={isAllSelected}
            />

            {selectedCaseIds.size > 0 && !isMultiOpening && (
              <div className="multi-open-bar">
                <span>{selectedCaseIds.size} cases selected</span>
                <button
                  className="primary-button small"
                  onClick={startMultiOpen}
                >
                  Unbox All
                </button>
                <button
                  className="ghost-button small"
                  onClick={handleDeselectAll}
                >
                  Clear
                </button>
              </div>
            )}
          </>
        ) : (
          <OCProfile
            results={results}
            onOpenCase={openCaseById}
            onResetAll={() => setResults({})}
          />
        )}
      </main>

      {activeCase && !isMultiOpening && (
        <CaseOpener
          ocCase={activeCase}
          onLanded={handleSingleLanded}
          onClose={() => setActiveCase(null)}
        />
      )}

      {isMultiOpening && (
        <div className="multi-open-overlay">
          <div className="multi-open-container">
            <header className="multi-open-header">
              <h2>Unboxing {multiOpenCases.length} Cases</h2>
              <button className="icon-button" onClick={closeMultiOpen}>✕</button>
            </header>
            <div className="multi-open-grid">
              {multiOpenCases.map((ocCase) => (
                <CaseOpener
                  key={ocCase.id}
                  ocCase={ocCase}
                  onLanded={(item) => handleMultiLanded(ocCase.id, item)}
                  onClose={() => { }}
                  compact={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}