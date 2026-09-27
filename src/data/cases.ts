import type { CaseGroup, OCItem } from "../types";

// A cosmetic swatch cycle. These colors do NOT encode rarity or odds —
// every item in a case has an identical, uniform chance of being picked.
// The color only helps a card feel distinct on the shelf.
const swatches = [
  "#E8B94D", // gold
  "#5FB0FF", // sky
  "#FF7A7A", // coral
  "#8FE3B0", // mint
  "#C792EA", // lilac
  "#FF9F5B", // amber
  "#6FD3D3", // teal
  "#F27FB0", // pink
];

// Updated to accept just an array of strings since emojis are removed
function items(list: string[]): OCItem[] {
  return list.map((label, i) => ({
    id: label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""), // strips trailing hyphens
    label: label.trim(),
    emoji: "", // Emojis removed
    color: swatches[i % swatches.length],
  }));
}

export const CASE_GROUPS: CaseGroup[] = [
  {
    id: "accessories",
    name: "Accessories",
    description: "Four separate cases covering what your OC wears on their head, face, body, and hands.",
    cases: [
      {
        id: "headwear",
        name: "Headwear Case",
        tagline: "What sits on top",
        accent: "#E8B94D",
        items: items([
          "Beanie", "Cowboy Hat", "Cat Ears", "Halo", "Bandana",
          "Flower Crown", "Wizard Hat", "Big Headphones", "Antlers", "Beret",
          "Bare Head", "Royal Crown", "Top Hat", "Oversized Hood", "Sun Visor",
          "Fascinator", "Deerstalker", "Pilot Cap", "Baseball Cap", "Wide Sun Hat", "Bucket Hat", "Hooded Scarf", "Visor Cap", "Crown of Thorns", "Hair Ribbon", "Feathered Hat", "Sailor Cap", "Headband", "Rabbit Ears", "Hood Ornament"
        ]),
      },
      {
        id: "eyewear",
        name: "Eyewear Case",
        tagline: "What frames the eyes",
        accent: "#5FB0FF",
        items: items([
          "Round Glasses", "Aviator Sunglasses", "Eyepatch", "Monocle", "Combat Goggles",
          "Star Stickers", "Cracked Visor", "Blindfold", "Ski Mask", "Bare Face",
          "Cat-eye Glasses", "VR Headset", "Scar Over Eye", "Colored Contacts", "Half-Moon Spectacles",
          "Steampunk Goggles", "Face Tattoo", "Cybernetic Eye", "Monocle Chain", "Tinted Visor", "Reading Glasses", "LED Visor", "Round Sunglasses", "Bandage Over Eye", "AR Glasses", "Face Veil", "Butterfly Mask", "Single Lens"
        ]),
      },
      {
        id: "jewelry",
        name: "Jewelry & Trinkets Case",
        tagline: "What catches the light",
        accent: "#C792EA",
        items: items([
          "Choker", "Hoop Earrings", "Pendant Necklace", "Nose Ring", "Friendship Bracelet",
          "Signet Ring", "Layered Chains", "Charm Anklet", "Nothing", "Lapel Brooch",
          "Hairpin", "Toe Ring", "Belly Chain", "Crown Tiara", "Cufflinks",
          "Septum Piercing", "Ear Cuffs", "Locket", "Pearl Necklace", "Arm Cuff", "Chain Earrings", "Waist Chain", "Key Pendant", "Gemstone Ring", "Safety Pin Piercing", "Ribbon Choker", "Bracelet Stack", "Lucky Charm"
        ]),
      },
      {
        id: "props",
        name: "Bags & Props Case",
        tagline: "What they carry",
        accent: "#FF9F5B",
        items: items([
          "Backpack", "Katana", "Skateboard", "Umbrella", "Spellbook",
          "Camera", "Guitar Case", "Lantern", "Potion Vial", "Empty Hands",
          "Sword & Shield", "Walking Cane", "Pet Companion", "Sketchbook", "Deck of Cards",
          "Telescope", "Mechanical Familiar", "Wizard Staff", "Messenger Bag", "Camera Drone", "Pocket Watch", "Folding Fan", "Plush Toy", "Magic Wand", "Binoculars", "Toolbox", "Briefcase", "Musical Box"
        ]),
      },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "One case, whole outfit — the overall silhouette your OC is dressed in.",
    cases: [
      {
        id: "clothing",
        name: "Clothing Case",
        tagline: "The whole fit",
        accent: "#8FE3B0",
        items: items([
          "Hoodie & Joggers", "Plate Armor", "Kimono", "Denim Jacket", "Trench Coat",
          "Turtleneck Sweater", "Crop Top & Cargos", "Ball Gown", "Overalls", "Cyberpunk Bodysuit",
          "Flannel & Shorts", "Lab Coat", "Tracksuit", "Sundress", "Leather Jacket",
          "Three-Piece Suit", "School Uniform", "Wizard Robes", "Corset & Skirt", "Tactical Vest", "Military Uniform", "Oversized Sweater", "Hakama", "Streetwear", "Gothic Dress", "Raincoat & Boots", "Formal Dress", "Utility Jumpsuit", "Poncho", "Performance Outfit"
        ]),
      },
    ],
  },
  {
    id: "skin",
    name: "Skin Color",
    description: "One case covering realistic tones plus a few unnatural ones, for the non-humans.",
    cases: [
      {
        id: "skin-tone",
        name: "Skin Tone Case",
        tagline: "Realistic and not-so-realistic",
        accent: "#FF7A7A",
        items: items([
          "Porcelain", "Fair", "Light Olive", "Tan", "Golden Brown",
          "Deep Brown", "Ebony", "Ashen Grey", "Pale Blue", "Sunset Coral",
          "Mossy Green", "Crimson Red", "Violet", "Metallic Gold", "Silver",
          "Translucent", "Bark-like", "Starry Night", "Warm Beige", "Cool Beige", "Rosy Fair", "Copper", "Chestnut", "Mahogany", "Blue Grey", "Lavender", "Peach", "Pearlescent"
        ]),
      },
    ],
  },
  {
    id: "age",
    name: "Age",
    description: "One case for how old your OC reads — or whether age even applies to them.",
    cases: [
      {
        id: "age",
        name: "Age Case",
        tagline: "How old they read",
        accent: "#6FD3D3",
        items: items([
          "Child (8-10)", "Preteen (11-13)", "Teenager (14-17)", "Young Adult (18-24)", "Adult (25-39)",
          "Middle-Aged (40-59)", "Elder (60+)", "Ageless / Immortal", "Toddler", "Infant",
          "Ancient", "Reincarnated", "Time-Displaced", "Young Child (5-7)", "Late Teen (17-19)", "Young Adult (20-29)", "Adult (30-49)", "Mature Adult (50-69)", "Centuries Old", "Eternal Child", "Artificial Age", "Unknown", "Age-Shifting"
        ]),
      },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    description: "One case for how your OC presents.",
    cases: [
      {
        id: "gender",
        name: "Gender Case",
        tagline: "How they present",
        accent: "#F27FB0",
        items: items([
          "Masculine", "Feminine", "Androgynous", "Nonbinary", "Genderfluid",
          "Agender", "Demiboy", "Demigirl", "Transmasculine", "Transfeminine", "Two-Spirit", "Masc-leaning Androgynous", "Fem-leaning Androgynous", "Bigender", "Genderflux", "Neutrois", "Demiboyflux", "Demigirlflux", "Questioning", "Presentation Fluid", "No Gender Expression"
        ]),
      },
    ],
  },
  {
    id: "pose",
    name: "Poses",
    description: "One case for the pose your OC gets drawn in first.",
    cases: [
      {
        id: "pose",
        name: "Pose Case",
        tagline: "How they're standing",
        accent: "#5FB0FF",
        items: items([
          "Battle-Ready Stance", "Casual Lean", "Mid-Air Jump", "Sitting Cross-Legged", "Hero Landing",
          "Over-the-Shoulder Glance", "Full Sprint", "Arms Crossed", "Curled Up Asleep", "Victory Pose",
          "Levitating", "Hand on Hip", "Looking at Phone", "Leaning on Wall", "Stretching",
          "Meditating", "Pointing Forward", "Dramatic Kneel", "Crouching", "Back Turned", "Walking Away", "Reaching Up", "Reaching Forward", "Dancing", "Falling", "Ready to Dodge", "Casual Wave"
        ]),
      },
    ],
  },
  {
    id: "physical-traits",
    name: "Physical Traits",
    description: "The defining physical characteristics of your OC, from their hair to their species.",
    cases: [
      {
        id: "hair",
        name: "Hair Case",
        tagline: "What's on their head (naturally)",
        accent: "#FF7A7A",
        items: items([
          "Messy Bun", "Long & Flowing", "Undercut", "Braids", "Bald",
          "Neon Spikes", "Twin Tails", "Pixie Cut", "Dreadlocks", "Pompadour",
          "Wild & Unkempt", "Mohawk", "Bob Cut", "Side Part", "Curly",
          "Wavy", "French Twist", "Space Buns", "Asymmetrical", "Shaved Sides", "High Ponytail", "Low Ponytail", "Side Ponytail", "Hime Cut", "Wolf Cut", "Shaggy Cut", "Layered Cut", "Long Braids", "Fishtail Braid", "Hair Covering One Eye"
        ]),
      },
    ],
  },
  {
    id: "identity-lore",
    name: "Identity & Lore",
    description: "The core of who your OC is, their origins, and what species they belong to.",
    cases: [
      {
        id: "species",
        name: "Species & Race Case",
        tagline: "What they are",
        accent: "#C792EA",
        items: items([
          "Human", "Elf", "Orc", "Cyborg", "Demon",
          "Vampire", "Beastkin", "Angel", "Slime", "Merfolk",
          "Fae", "Undead", "Alien", "Android / AI", "Dragon",
          "Kitsune", "Goblin", "Zombie", "Ghost", "Shapeshifter", "Werewolf", "Mermaid", "Dryad", "Centaur", "Harpy", "Nymph", "Living Doll", "Construct", "Phoenix", "Void Entity"
        ]),
      },
    ],
  },
  {
    id: "extras-flavor",
    name: "Extras & Flavor",
    description: "The final touches that bring your OC to life, including their combat style or abilities.",
    cases: [
      {
        id: "weapons-abilities",
        name: "Weapons & Abilities Case",
        tagline: "How they fight (or don't)",
        accent: "#6FD3D3",
        items: items([
          "Dual Katanas", "Heavy Magic", "Sniper Rifle", "Bare Fists", "Healing Magic",
          "Cursed Grimoire", "Energy Blasts", "Stealth & Daggers", "Giant Hammer", "Psychic Powers",
          "Alchemy", "None / Pacifist", "Bow & Arrow", "Shield & Sword", "Necromancy",
          "Time Magic", "Elemental Control", "Tech Gadgets", "Whip", "Musical Instrument", "Spear", "Twin Blades", "Scythe", "Magic Cards", "Summoning", "Gravity Control", "Lightning Magic", "Ice Magic", "Barrier Magic", "Martial Arts"
        ]),
      },
    ],
  },
  {
    id: "eyes",
    name: "Eye Style",
    description: "One case for the shape, design, and visual treatment of the eyes.",
    cases: [{
      id: "eye-style",
      name: "Eye Style Case",
      tagline: "How the eyes look",
      accent: "#5FB0FF",
      items: items([
        "Round & Soft", "Sharp & Narrow", "Large Anime Eyes", "Small Eyes",
        "Half-Lidded", "Downturned", "Upturned", "Heterochromia",
        "Heavy Upper Lashes", "Minimal Eyes", "Glowing Eyes", "Cat-like Eyes",
        "Sleepy Eyes", "Intense Eyes", "Detailed Irises", "Simple Irises",
        "No Visible Pupils", "Geometric Pupils", "Star Pupils", "Slit Pupils"
      ]),
    }],
  },
  {
    id: "expressions",
    name: "Facial Expressions",
    description: "One case for the emotion or expression your OC wears.",
    cases: [{
      id: "facial-expression",
      name: "Expression Case",
      tagline: "What their face is doing",
      accent: "#FF7A7A",
      items: items([
        "Neutral", "Soft Smile", "Big Smile", "Grinning", "Blushing",
        "Embarrassed", "Flustered", "Angry", "Annoyed", "Sad",
        "Crying", "Worried", "Surprised", "Shocked", "Confused",
        "Determined", "Smug", "Bored", "Sleepy", "Evil Smile"
      ]),
    }],
  },
  {
    id: "lighting",
    name: "Light Position",
    description: "One case for where the main light comes from.",
    cases: [{
      id: "light-position",
      name: "Light Position Case",
      tagline: "Where the light hits",
      accent: "#E8B94D",
      items: items([
        "Front", "Front-Left", "Front-Right", "Side-Left", "Side-Right",
        "Top", "Top-Left", "Top-Right", "Bottom", "Bottom-Left",
        "Bottom-Right", "Backlight", "Rim Light", "Overhead Spotlight",
        "Underlight", "Split Lighting", "Window Light", "Neon Sign Light",
        "Candlelight", "Multiple Light Sources"
      ]),
    }],
  },
  {
    id: "environment",
    name: "Background & Environment",
    description: "One case for the place or atmosphere surrounding your OC.",
    cases: [{
      id: "background-environment",
      name: "Environment Case",
      tagline: "Where they exist",
      accent: "#8FE3B0",
      items: items([
        "Plain Studio", "Bedroom", "Rooftop", "City Street", "Neon Alley",
        "Forest", "Beach", "Mountains", "School", "Classroom", "Library",
        "Café", "Train Station", "Ancient Ruins", "Castle", "Temple",
        "Cyberpunk City", "Space Station", "Dreamscape", "Void"
      ]),
    }],
  },
  {
    id: "hair-style",
    name: "Hair",
    description: "One case dedicated specifically to the hairstyle and hair silhouette.",
    cases: [{
      id: "hair-style",
      name: "Hair Style Case",
      tagline: "What happens to the hair",
      accent: "#C792EA",
      items: items([
        "Straight", "Wavy", "Curly", "Messy", "Short Bob", "Long Flowing",
        "Wolf Cut", "Hime Cut", "Layered", "Shaggy", "High Ponytail",
        "Low Ponytail", "Twin Tails", "Side Ponytail", "Braided",
        "Fishtail Braid", "Side Part", "Middle Part",
        "Hair Covering One Eye", "Windblown"
      ]),
    }],
  },
  {
    id: "scope",
    name: "Art Scope",
    description: "One case for how much of the character and scene gets drawn.",
    cases: [{
      id: "art-scope",
      name: "Art Scope Case",
      tagline: "How much gets drawn",
      accent: "#FF9F5B",
      items: items([
        "Icon", "Headshot", "Bust", "Shoulders-Up", "Waist-Up", "Thigh-Up",
        "Knee-Up", "Full Body", "Character + Prop",
        "Character + Simple Background", "Character + Detailed Background",
        "Two Characters", "Small Group", "Wide Scene", "Environmental Shot",
        "Close-Up Portrait", "Dynamic Action Shot", "Full Illustration",
        "Splash Art", "Cinematic Composition"
      ]),
    }],
  },
];

export const ALL_CASES = CASE_GROUPS.flatMap((g) => g.cases);


