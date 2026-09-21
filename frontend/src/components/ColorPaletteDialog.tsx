import { Check, Palette, Shuffle, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  applyPalettePreference,
  getPalettePreference,
  PALETTES,
  savePalettePreference,
  type PalettePreference,
} from "../shared/palette";

export function ColorPaletteDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedPreference, setSelectedPreference] = useState<PalettePreference>(
    getPalettePreference,
  );

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  const selectPreference = (preference: PalettePreference) => {
    savePalettePreference(preference);
    applyPalettePreference(preference);
    setSelectedPreference(preference);
  };

  const isRandomSelected = selectedPreference === "random";

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
            <span className="eyebrow">Aparência do site</span>
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
            No modo Aleatório, o sistema sorteia uma paleta ao iniciar. Ao escolher uma paleta
            específica, ela fica salva neste navegador até você voltar ao modo Aleatório.
          </p>

          <div className="color-palette-grid" role="group" aria-label="Paletas disponíveis">
            <button
              className={`color-palette-option${isRandomSelected ? " color-palette-option--selected" : ""}`}
              type="button"
              aria-pressed={isRandomSelected}
              onClick={() => selectPreference("random")}
            >
              <span className="color-palette-option__random" aria-hidden="true">
                <Shuffle size={22} />
              </span>
              <span className="color-palette-option__content">
                <strong>Aleatório</strong>
                <span>Sorteia uma paleta a cada vez que o sistema é iniciado.</span>
              </span>
              {isRandomSelected && (
                <Check className="color-palette-option__check" aria-hidden="true" size={20} />
              )}
            </button>

            {PALETTES.map((palette) => {
              const isSelected = palette.id === selectedPreference;

              return (
                <button
                  key={palette.id}
                  className={`color-palette-option${isSelected ? " color-palette-option--selected" : ""}`}
                  type="button"
                  data-palette-preview={palette.id}
                  aria-pressed={isSelected}
                  onClick={() => selectPreference(palette.id)}
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
                  {isSelected && (
                    <Check className="color-palette-option__check" aria-hidden="true" size={20} />
                  )}
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
