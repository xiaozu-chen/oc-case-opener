use rand::Rng;
use serde::Serialize;

/// The result of spinning one case.
///
/// `sequence` is a strip of item indices used purely for the visual scroll —
/// it is filler so the reel has something to scroll past. `winning_index` is
/// the item that was actually selected, chosen uniformly at random with no
/// weighting, odds, or pity of any kind. `winning_position` tells the
/// frontend which slot in `sequence` holds that winning item, so the reel
/// animation can land exactly on it.
#[derive(Serialize)]
pub struct ReelResult {
    sequence: Vec<usize>,
    winning_position: usize,
    winning_index: usize,
}

/// Generates a reel strip for a case with `item_count` possible items.
///
/// Every slot in the strip — including the winning slot — is drawn from a
/// uniform distribution over `0..item_count`. There is no rarity table, no
/// weighting, and no history that influences the draw: every item in a case
/// always has exactly the same chance of being chosen.
#[tauri::command]
fn generate_reel(item_count: usize, reel_length: usize) -> Result<ReelResult, String> {
    if item_count == 0 {
        return Err("A case needs at least one item before it can be opened.".into());
    }
    let reel_length = reel_length.max(24);

    let mut rng = rand::thread_rng();
    let mut sequence: Vec<usize> = (0..reel_length)
        .map(|_| rng.gen_range(0..item_count))
        .collect();

    // Leave room after the winning slot so the strip still has a few frames
    // to glide past before the pointer settles.
    let winning_position = reel_length - 6;
    let winning_index = rng.gen_range(0..item_count);
    sequence[winning_position] = winning_index;

    Ok(ReelResult {
        sequence,
        winning_position,
        winning_index,
    })
}

/// A single, uniformly random pick with no reel — used for the "reroll all"
/// shortcut where the UI doesn't play the full spin animation.
#[tauri::command]
fn roll_item(item_count: usize) -> Result<usize, String> {
    if item_count == 0 {
        return Err("A case needs at least one item before it can be opened.".into());
    }
    Ok(rand::thread_rng().gen_range(0..item_count))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_reel, roll_item])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
