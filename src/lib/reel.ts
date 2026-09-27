export interface ReelResult {
  sequence: number[];
  winning_position: number;
  winning_index: number;
}

const REEL_LENGTH = 60;

/** Pure-JS mirror of the Rust command, used only when there's no Tauri host
 * to talk to (e.g. previewing the UI with a plain `npm run dev` in a
 * browser tab). It follows the identical rule: every slot, including the
 * winner, is drawn from a uniform distribution — no weighting anywhere. */
function generateReelInBrowser(itemCount: number, reelLength: number): ReelResult {
  const sequence = Array.from({ length: reelLength }, () =>
    Math.floor(Math.random() * itemCount),
  );
  const winning_position = reelLength - 6;
  const winning_index = Math.floor(Math.random() * itemCount);
  sequence[winning_position] = winning_index;
  return { sequence, winning_position, winning_index };
}

export async function generateReel(itemCount: number): Promise<ReelResult> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke<ReelResult>("generate_reel", {
      itemCount,
      reelLength: REEL_LENGTH,
    });
  } catch {
    // Not running inside Tauri (or the command failed to load) — fall back
    // so the interface still works while developing in a browser.
    return generateReelInBrowser(itemCount, REEL_LENGTH);
  }
}
