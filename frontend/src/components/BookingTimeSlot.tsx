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

  const stateClassName = isSelected
    ? "booking-time--selected"
    : isOccupied
      ? "booking-time--occupied"
      : cannotStartHere
        ? "booking-time--unavailable"
        : "";

  const classNames = ["booking-time", stateClassName].filter(Boolean).join(" ");

  const accessibilityLabel = isSelected
    ? `${time}. Seu atendimento. ${selectedBarbers.join(", ")}.`
    : isOccupied
      ? `${time}. Horário ocupado. Nenhum barbeiro disponível nesta janela.`
      : cannotStartHere
        ? `${time}. Disponíveis nesta janela: ${availableBarbers.join(", ")}. Nenhum desses profissionais permanece disponível durante todos os ${requiredDurationMinutes} minutos necessários.`
        : `${time}. Disponíveis nesta janela: ${availableBarbers.join(", ")}. Podem iniciar um atendimento de ${requiredDurationMinutes} minutos: ${startAvailableBarbers.join(", ")}.`;

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
          <span className="booking-time__status">Disponíveis nesta janela</span>
          <span className="booking-time__barbers">{availableBarbers.join(" • ")}</span>
          <span className="booking-time__hint">
            Nenhum fica livre por {requiredDurationMinutes} min
          </span>
        </>
      ) : (
        <>
          <span className="booking-time__status">Disponíveis nesta janela</span>
          <span className="booking-time__barbers">{availableBarbers.join(" • ")}</span>
          <span className="booking-time__start">
            Podem iniciar {requiredDurationMinutes} min: {startAvailableBarbers.join(" • ")}
          </span>
        </>
      )}
    </button>
  );
}
