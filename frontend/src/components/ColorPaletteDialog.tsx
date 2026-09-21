import { Check, Palette, X } from "lucide-react";
import { useRef, useState } from "react";

type PaletteId = "original" | "graphite-copper" | "burgundy-cream" | "blue-silver";

const PALETTES: Array<{ id: PaletteId; name: string; description: string }> = [
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

export function ColorPaletteDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedPalette, setSelectedPalette] = useState<PaletteId>("original");

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  const applyPalette = (palette: PaletteId) => {
    setSelectedPalette(palette);

    if (palette === "original") {
      delete document.documentElement.dataset.palette;
      return;
    }

    document.documentElement.dataset.palette = palette;
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="icon-button"
        type="button"
        aria-label="Alterar paleta de cores"
        title="Paleta de cores"
        onClick={openDialog}
      >
        <Palette aria-hidden="true" size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="screen-manual color-palette-dialog"
        aria-labelledby="color-palette-title"
        onCancel={closeDialog}
      >
        <div className="screen-manual__header">
          <div>
            <span className="eyebrow">Aparência do protótipo</span>
            <h2 id="color-palette-title">Paleta de cores</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Fechar seletor de paleta"
            title="Fechar seletor de paleta"
            onClick={closeDialog}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="screen-manual__content">
          <p className="color-palette-dialog__intro">
            Compare combinações de cores para avaliar a identidade visual. A alteração é somente
            visual, não muda o agendamento e volta ao padrão ao recarregar a página.
          </p>

          <div className="color-palette-grid" aria-label="Paletas disponíveis">
            {PALETTES.map((palette) => {
              const isSelected = palette.id === selectedPalette;

              return (
                <button
                  key={palette.id}
                  className={`color-palette-option${isSelected ? " color-palette-option--selected" : ""}`}
                  type="button"
                  data-palette-preview={palette.id}
                  aria-pressed={isSelected}
                  onClick={() => applyPalette(palette.id)}
                >
                  <span className="color-palette-option__swatches" aria-hidden="true">
                    <span className="color-palette-swatch color-palette-swatch--background" />
                    <span className="color-palette-swatch color-palette-swatch--surface" />
                    <span className="color-palette-swatch color-palette-swatch--primary" />
                  </span>
                  <span className="color-palette-option__content">
                    <strong>{palette.name}</strong>
                    <span>{palette.description}</span>
                  </span>
                  {isSelected && <Check className="color-palette-option__check" aria-hidden="true" size={20} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="screen-manual__footer">
          <button className="button button--secondary" type="button" onClick={closeDialog}>
            Fechar
          </button>
        </div>
      </dialog>
    </>
  );
}
