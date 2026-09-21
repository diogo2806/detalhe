type BookingTimeSlotProps = {
  time: string;
  availableBarbers: string[];
  selectedBarbers: string[];
  canStart: boolean;
  isSelected: boolean;
  onSelect: () => void;
};

export function BookingTimeSlot({
  time,
  availableBarbers,
  selectedBarbers,
  canStart,
  isSelected,
  onSelect,
}: BookingTimeSlotProps) {
  const isOccupied = availableBarbers.length === 0;
  const isDisabled = isOccupied || !canStart;

  const classNames = [
    "booking-time",
    isSelected ? "booking-time--selected" : "",
    isOccupied ? "booking-time--occupied" : "",
    !isOccupied && !canStart ? "booking-time--unavailable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibilityLabel = isSelected
    ? `${time}. Seu atendimento. ${selectedBarbers.join(", ")}.`
    : isOccupied
      ? `${time}. Horário ocupado.`
      : canStart
        ? `${time}. Disponíveis: ${availableBarbers.join(", ")}.`
        : `${time}. Disponíveis: ${availableBarbers.join(", ")}. Não comporta a duração completa deste serviço.`;

  return (
    <button
      className={classNames}
      type="button"
      disabled={isDisabled && !isSelected}
      aria-pressed={isSelected}
      aria-label={accessibilityLabel}
      onClick={onSelect}
    >
      <strong className="booking-time__hour">{time}</strong>

      {isSelected ? (
        <>
          <span className="booking-time__status">Seu atendimento</span>
          <span className="booking-time__barbers">{selectedBarbers.join(" • ")}</span>
        </>
      ) : isOccupied ? (
        <span className="booking-time__status">Horário ocupado</span>
      ) : (
        <>
          <span className="booking-time__status">Disponíveis</span>
          <span className="booking-time__barbers">{availableBarbers.join(" • ")}</span>
          {!canStart && (
            <span className="booking-time__hint">Não comporta este serviço</span>
          )}
        </>
      )}
    </button>
  );
}
