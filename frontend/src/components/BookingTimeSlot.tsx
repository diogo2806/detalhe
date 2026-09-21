type BookingTimeSlotProps = {
  time: string;
  availableBarbers: string[];
  selectedBarbers: string[];
  canStart: boolean;
  isSelected: boolean;
  requiredDurationMinutes: number;
  onSelect: () => void;
};

export function BookingTimeSlot({
  time,
  availableBarbers,
  selectedBarbers,
  canStart,
  isSelected,
  requiredDurationMinutes,
  onSelect,
}: BookingTimeSlotProps) {
  const isOccupied = availableBarbers.length === 0;
  const isUnavailable = !isOccupied && !canStart;
  const isDisabled = isOccupied || isUnavailable;

  const classNames = [
    "booking-time",
    isSelected ? "booking-time--selected" : "",
    isOccupied ? "booking-time--occupied" : "",
    isUnavailable ? "booking-time--unavailable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibilityLabel = isSelected
    ? `${time}. Seu atendimento. ${selectedBarbers.join(", ")}.`
    : isOccupied
      ? `${time}. Horário ocupado.`
      : isUnavailable
        ? `${time}. Sem vaga para este serviço. Nenhum barbeiro está livre durante todos os ${requiredDurationMinutes} minutos.`
        : `${time}. Disponíveis: ${availableBarbers.join(", ")}.`;

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
        <>
          <span className="booking-time__status">Horário ocupado</span>
          <span className="booking-time__hint">Não disponível</span>
        </>
      ) : isUnavailable ? (
        <>
          <span className="booking-time__status">Sem vaga para este serviço</span>
          <span className="booking-time__hint">
            Nenhum barbeiro livre durante todos os {requiredDurationMinutes} min
          </span>
        </>
      ) : (
        <>
          <span className="booking-time__status">Disponíveis</span>
          <span className="booking-time__barbers">{availableBarbers.join(" • ")}</span>
        </>
      )}
    </button>
  );
}
