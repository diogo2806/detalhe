export type PaletteId = "original" | "graphite-copper" | "burgundy-cream" | "blue-silver";
export type PalettePreference = PaletteId | "random";

export const PALETTES: Array<{ id: PaletteId; name: string; description: string }> = [
  {
    id: "original",
    name: "Original",
    description: "Azul profundo com dourado.",
  },
  {
    id: "graphite-copper",
    name: "Grafite e cobre",
    description: "Neutros escuros com destaque quente.",
  },
  {
    id: "burgundy-cream",
    name: "Bordô e creme",
    description: "Fundo vinho escuro com contraste suave.",
  },
  {
    id: "blue-silver",
    name: "Azul e prata",
    description: "Azul frio com destaque metálico claro.",
  },
];

const STORAGE_KEY = "detalhe-color-palette";
const PALETTE_IDS = PALETTES.map((palette) => palette.id);

const isPaletteId = (value: string): value is PaletteId =>
  PALETTE_IDS.includes(value as PaletteId);

const isPalettePreference = (value: string): value is PalettePreference =>
  value === "random" || isPaletteId(value);

export function getPalettePreference(): PalettePreference {
  try {
    const storedPreference = window.localStorage.getItem(STORAGE_KEY);

    if (storedPreference && isPalettePreference(storedPreference)) {
      return storedPreference;
    }
  } catch {
    return "random";
  }

  return "random";
}

export function chooseRandomPalette(): PaletteId {
  const index = Math.floor(Math.random() * PALETTE_IDS.length);
  return PALETTE_IDS[index] ?? "original";
}

export function applyPalette(palette: PaletteId) {
  if (palette === "original") {
    delete document.documentElement.dataset.palette;
    return;
  }

  document.documentElement.dataset.palette = palette;
}

export function applyPalettePreference(preference: PalettePreference): PaletteId {
  const palette = preference === "random" ? chooseRandomPalette() : preference;
  applyPalette(palette);
  return palette;
}

export function savePalettePreference(preference: PalettePreference) {
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // A preferência continua válida durante a sessão mesmo se o navegador bloquear o localStorage.
  }
}

export function initializePalette() {
  applyPalettePreference(getPalettePreference());
}
