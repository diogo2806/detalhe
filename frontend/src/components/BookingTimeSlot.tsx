type BookingTimeSlotProps = {
  time: string;
  availableBarbers: string[];
  startAvailableBarbers: string[];
  selectedBarbers: string[];
  canStart: boolean;
  isSelected: boolean;
  requiredDurationMinutes: number;
  onSelect: () => void;
};

export function BookingTimeSlot({
  time,
  availableBarbers,
  startAvailableBarbers,
  selectedBarbers,
  canStart,
  isSelected,
  requiredDurationMinutes,
  onSelect,
}: BookingTimeSlotProps) {
  const isOccupied = availableBarbers.length === 0;
  const cannotStartHere = !isOccupied && !canStart;
  const isDisabled = isOccupied || cannotStartHere;

  const classNames = [
    "booking-time",
    isSelected ? "booking-time--selected" : "",
    isOccupied ? "booking-time--occupied" : "",
    cannotStartHere ? "booking-time--unavailable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibilityLabel = isSelected
    ? `${time}. Seu atendimento. ${selectedBarbers.join(", ")}.`
    : isOccupied
      ? `${time}. Horário ocupado. Nenhum barbeiro disponível nesta janela.`
      : cannotStartHere
        ? `${time}. Barbeiros nesta janela: ${availableBarbers.join(", ")}. Não é possível iniciar um serviço de ${requiredDurationMinutes} minutos aqui porque não há continuidade suficiente.`
        : `${time}. Disponíveis para os ${requiredDurationMinutes} minutos: ${startAvailableBarbers.join(", ")}.`;

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
          <span className="booking-time__hint">Nenhum barbeiro disponível nesta janela</span>
        </>
      ) : cannotStartHere ? (
        <>
          <span className="booking-time__status">Barbeiros nesta janela</span>
          <span className="booking-time__barbers">{availableBarbers.join(" • ")}</span>
          <span className="booking-time__hint">
            Não é possível iniciar {requiredDurationMinutes} min aqui
          </span>
        </>
      ) : (
        <>
          <span className="booking-time__status">
            Disponíveis para {requiredDurationMinutes} min
          </span>
          <span className="booking-time__barbers">{startAvailableBarbers.join(" • ")}</span>
        </>
      )}
    </button>
  );
}
