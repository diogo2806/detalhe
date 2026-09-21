import {
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Plus,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  SERVICES,
  type ServiceDefinition,
} from "../shared/constants/serviceCatalog";
import { formatCurrency, formatDuration } from "../shared/utils/formatters";
import { BookingTimeSlot } from "./BookingTimeSlot";

type BookingMode = "AVULSO" | "PLANO" | "GRUPO";

type DemoDate = {
  iso: string;
  shortLabel: string;
  fullLabel: string;
};

type GroupParticipant = {
  id: number;
  name: string;
  serviceId: string;
};

type DemoBarber = "Barbeiro A" | "Barbeiro B" | "Barbeiro C";

type BookingAssignment = {
  participantLabel: string;
  barber: DemoBarber;
  durationMinutes: number;
};

type BookingAllocation = {
  assignments: BookingAssignment[];
  selectedTimes: string[];
  selectedBarbersByTime: Record<string, DemoBarber[]>;
};

const MODE_OPTIONS: Array<{
  value: BookingMode;
  title: string;
  description: string;
}> = [
  {
    value: "AVULSO",
    title: "Cliente avulso",
    description: "Escolha um serviço, uma data e um horário.",
  },
  {
    value: "PLANO",
    title: "Plano mensal",
    description: "Agende os serviços disponíveis para o seu plano ativo.",
  },
  {
    value: "GRUPO",
    title: "Agendamento em grupo",
    description: "Organize dois ou mais atendimentos no mesmo horário.",
  },
];

const MORNING_START = 9 * 60;
const MORNING_END = 12 * 60;
const AFTERNOON_START = 13 * 60;
const AFTERNOON_END = 20 * 60 + 30;
const SLOT_INTERVAL = 15;
const DEMO_BARBERS: DemoBarber[] = ["Barbeiro A", "Barbeiro B", "Barbeiro C"];

const BRAZILIAN_DDDS = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]);

function formatBrazilianWhatsApp(value: string): string | null {
  const digits = value.replace(/\D/g, "");

  if (digits.length > 11) {
    return null;
  }

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const subscriber = digits.slice(2);

  if (subscriber.length <= 5) {
    return `(${ddd}) ${subscriber}`;
  }

  return `(${ddd}) ${subscriber.slice(0, 5)}-${subscriber.slice(5)}`;
}

function isValidBrazilianWhatsApp(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  if (digits.length !== 11) {
    return false;
  }

  const ddd = digits.slice(0, 2);
  const subscriber = digits.slice(2);

  return BRAZILIAN_DDDS.has(ddd) && /^9\d{8}$/.test(subscriber);
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function generateSegmentSlots(start: number, end: number): string[] {
  const slots: string[] = [];

  for (let slotStart = start; slotStart < end; slotStart += SLOT_INTERVAL) {
    slots.push(minutesToTime(slotStart));
  }

  return slots;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDemoAvailableBarbers(dateIso: string, time: string): DemoBarber[] {
  const daySeed = Number(dateIso.slice(-2));
  const slotIndex = Math.floor((timeToMinutes(time) - MORNING_START) / SLOT_INTERVAL);
  const patterns: DemoBarber[][] = [
    ["Barbeiro A", "Barbeiro B", "Barbeiro C"],
    ["Barbeiro A", "Barbeiro B"],
    ["Barbeiro B", "Barbeiro C"],
    ["Barbeiro A", "Barbeiro C"],
    ["Barbeiro A", "Barbeiro B", "Barbeiro C"],
    ["Barbeiro A"],
    ["Barbeiro B"],
    ["Barbeiro C"],
    [],
    ["Barbeiro A", "Barbeiro B"],
    ["Barbeiro A", "Barbeiro C"],
    ["Barbeiro B", "Barbeiro C"],
  ];

  return patterns[Math.abs(slotIndex + daySeed) % patterns.length];
}

function getRequiredTimes(
  startTime: string,
  durationMinutes: number,
  periodSlots: string[],
): string[] | null {
  const requiredWindows = durationMinutes / SLOT_INTERVAL;
  const startIndex = periodSlots.indexOf(startTime);

  if (startIndex < 0 || startIndex + requiredWindows > periodSlots.length) {
    return null;
  }

  return periodSlots.slice(startIndex, startIndex + requiredWindows);
}

function getCommonBarbers(dateIso: string, times: string[]): DemoBarber[] {
  if (times.length === 0) {
    return [];
  }

  return DEMO_BARBERS.filter((barber) =>
    times.every((time) => getDemoAvailableBarbers(dateIso, time).includes(barber)),
  );
}

function assignGroupBarbers(
  dateIso: string,
  startTime: string,
  participants: GroupParticipant[],
  periodSlots: string[],
): BookingAssignment[] | null {
  const options = participants.map((participant, index) => {
    const service = getService(participant.serviceId);
    const times = getRequiredTimes(startTime, service.durationMinutes, periodSlots);

    return {
      participantLabel: participant.name.trim() || `Participante ${index + 1}`,
      durationMinutes: service.durationMinutes,
      barbers: times ? getCommonBarbers(dateIso, times) : [],
    };
  });

  if (options.some((option) => option.barbers.length === 0) || options.length > DEMO_BARBERS.length) {
    return null;
  }

  const assignments: BookingAssignment[] = [];

  function backtrack(index: number, usedBarbers: Set<DemoBarber>): boolean {
    if (index === options.length) {
      return true;
    }

    const option = options[index];

    for (const barber of option.barbers) {
      if (usedBarbers.has(barber)) {
        continue;
      }

      usedBarbers.add(barber);
      assignments.push({
        participantLabel: option.participantLabel,
        barber,
        durationMinutes: option.durationMinutes,
      });

      if (backtrack(index + 1, usedBarbers)) {
        return true;
      }

      assignments.pop();
      usedBarbers.delete(barber);
    }

    return false;
  }

  return backtrack(0, new Set<DemoBarber>()) ? assignments : null;
}

function assignmentsAreAvailable(
  dateIso: string,
  startTime: string,
  assignments: BookingAssignment[],
  periodSlots: string[],
): boolean {
  return assignments.every((assignment) => {
    const assignmentTimes = getRequiredTimes(
      startTime,
      assignment.durationMinutes,
      periodSlots,
    );

    return (
      assignmentTimes !== null &&
      assignmentTimes.every((time) =>
        getDemoAvailableBarbers(dateIso, time).includes(assignment.barber),
      )
    );
  });
}

function buildAllocation(
  dateIso: string,
  startTime: string,
  mode: BookingMode,
  durationMinutes: number,
  participants: GroupParticipant[],
  periodSlots: string[],
): BookingAllocation | null {
  const selectedTimes = getRequiredTimes(startTime, durationMinutes, periodSlots);

  if (!selectedTimes) {
    return null;
  }

  const assignments =
    mode === "GRUPO"
      ? assignGroupBarbers(dateIso, startTime, participants, periodSlots)
      : (() => {
          const commonBarbers = getCommonBarbers(dateIso, selectedTimes);

          if (commonBarbers.length === 0) {
            return null;
          }

          return [
            {
              participantLabel: "Cliente",
              barber: commonBarbers[0],
              durationMinutes,
            },
          ];
        })();

  if (!assignments || !assignmentsAreAvailable(dateIso, startTime, assignments, periodSlots)) {
    return null;
  }

  const selectedBarbersByTime: Record<string, DemoBarber[]> = {};

  for (const time of selectedTimes) {
    const elapsedMinutes = timeToMinutes(time) - timeToMinutes(startTime);
    selectedBarbersByTime[time] = assignments
      .filter((assignment) => elapsedMinutes < assignment.durationMinutes)
      .map((assignment) => assignment.barber);
  }

  return {
    assignments,
    selectedTimes,
    selectedBarbersByTime,
  };
}

function getStartAvailableBarbers(
  dateIso: string,
  startTime: string,
  mode: BookingMode,
  durationMinutes: number,
  periodSlots: string[],
  allocation: BookingAllocation | null,
): DemoBarber[] {
  if (!allocation) {
    return [];
  }

  if (mode === "GRUPO") {
    return Array.from(new Set(allocation.assignments.map((assignment) => assignment.barber)));
  }

  const requiredTimes = getRequiredTimes(startTime, durationMinutes, periodSlots);
  return requiredTimes ? getCommonBarbers(dateIso, requiredTimes) : [];
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getNextServiceDates(count: number): DemoDate[] {
  const dates: DemoDate[] = [];
  const cursor = new Date();

  cursor.setHours(12, 0, 0, 0);

  while (dates.length < count) {
    const dayOfWeek = cursor.getDay();

    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      const shortLabel = new Intl.DateTimeFormat("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      })
        .format(cursor)
        .replace(".", "");

      const fullLabel = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }).format(cursor);

      dates.push({
        iso: toIsoDate(cursor),
        shortLabel,
        fullLabel,
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function getService(serviceId: string): ServiceDefinition {
  return SERVICES.find((service) => service.id === serviceId) ?? SERVICES[0];
}

export function BookingDemoSection() {
  const dates = useMemo(() => getNextServiceDates(5), []);
  const bookingSectionRef = useRef<HTMLElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const [mode, setMode] = useState<BookingMode>("AVULSO");
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState(dates[0]?.iso ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [phone, setPhone] = useState("");
  const [demoComplete, setDemoComplete] = useState(false);
  const [nextParticipantId, setNextParticipantId] = useState(3);
  const [participants, setParticipants] = useState<GroupParticipant[]>([
    { id: 1, name: "", serviceId: SERVICES[0].id },
    { id: 2, name: "", serviceId: SERVICES[0].id },
  ]);

  const selectedService = getService(serviceId);
  const groupDuration = Math.max(
    ...participants.map((participant) => getService(participant.serviceId).durationMinutes),
  );
  const effectiveDuration = mode === "GRUPO" ? groupDuration : selectedService.durationMinutes;

  const morningSlots = useMemo(() => generateSegmentSlots(MORNING_START, MORNING_END), []);
  const afternoonSlots = useMemo(() => generateSegmentSlots(AFTERNOON_START, AFTERNOON_END), []);

  const selectedPeriodSlots =
    selectedTime && timeToMinutes(selectedTime) < MORNING_END ? morningSlots : afternoonSlots;
  const selectedAllocation = selectedTime
    ? buildAllocation(
        selectedDate,
        selectedTime,
        mode,
        effectiveDuration,
        participants,
        selectedPeriodSlots,
      )
    : null;

  const selectedDateOption = dates.find((date) => date.iso === selectedDate);
  const groupTotal = participants.reduce(
    (total, participant) => total + getService(participant.serviceId).price,
    0,
  );
  const whatsappIsValid = isValidBrazilianWhatsApp(phone);

  const stepOneValid =
    mode !== "GRUPO" ||
    (participants.length >= 2 &&
      participants.every(
        (participant) => participant.name.trim().length > 0 && participant.serviceId.length > 0,
      ));
  const stepTwoValid =
    selectedDate.length > 0 && selectedTime.length > 0 && selectedAllocation !== null;
  const stepThreeValid = responsibleName.trim().length > 1 && whatsappIsValid;

  const changeMode = (newMode: BookingMode) => {
    setMode(newMode);
    setStep(1);
    setSelectedTime("");
    setDemoComplete(false);
  };

  const changeService = (newServiceId: string) => {
    setServiceId(newServiceId);
    setSelectedTime("");
  };

  const updateParticipant = (
    participantId: number,
    field: "name" | "serviceId",
    value: string,
  ) => {
    setParticipants((currentParticipants) =>
      currentParticipants.map((participant) =>
        participant.id === participantId ? { ...participant, [field]: value } : participant,
      ),
    );

    if (field === "serviceId") {
      setSelectedTime("");
    }
  };

  const addParticipant = () => {
    setParticipants((currentParticipants) => [
      ...currentParticipants,
      {
        id: nextParticipantId,
        name: "",
        serviceId: SERVICES[0].id,
      },
    ]);
    setNextParticipantId((currentId) => currentId + 1);
    setSelectedTime("");
  };

  const removeParticipant = (participantId: number) => {
    setParticipants((currentParticipants) =>
      currentParticipants.filter((participant) => participant.id !== participantId),
    );
    setSelectedTime("");
  };

  const resetDemo = () => {
    setStep(1);
    setMode("AVULSO");
    setServiceId(SERVICES[0].id);
    setSelectedDate(dates[0]?.iso ?? "");
    setSelectedTime("");
    setResponsibleName("");
    setPhone("");
    setParticipants([
      { id: 1, name: "", serviceId: SERVICES[0].id },
      { id: 2, name: "", serviceId: SERVICES[0].id },
    ]);
    setNextParticipantId(3);
    setDemoComplete(false);
  };

  const canAdvance =
    (step === 1 && stepOneValid) ||
    (step === 2 && stepTwoValid) ||
    (step === 3 && stepThreeValid);

  const navigateToStep = (nextStep: number) => {
    setStep(Math.min(4, Math.max(1, nextStep)));

    window.requestAnimationFrame(() => {
      bookingSectionRef.current?.scrollIntoView({ block: "start" });
      stepHeadingRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <section
      ref={bookingSectionRef}
      className="section section--accent"
      id="agendamento"
      aria-labelledby="agendamento-title"
    >
      <div className="section__heading section__heading--split">
        <div>
          <span className="eyebrow">Agendamento online</span>
          <h2 id="agendamento-title">Agende seu horário</h2>
        </div>
        <p>
          Escolha a modalidade, o serviço, a data e um horário disponível.
          
        </p>
      </div>

      <div className="booking-demo">
        <div className="booking-demo__notice" role="note">
          <BadgeCheck aria-hidden="true" size={20} />
          <div>
            <strong>Disponibilidade do atendimento</strong>
            <span>
              Os horários consideram a duração do serviço e os profissionais disponíveis durante
              todo o atendimento.
            </span>
          </div>
        </div>

        {demoComplete ? (
          <div className="booking-demo__confirmation" role="status" aria-live="polite">
            <span className="booking-demo__confirmation-icon" aria-hidden="true">
              <Check size={30} />
            </span>
            <span className="eyebrow">Agendamento confirmado</span>
            <h3>Horário agendado com sucesso!</h3>
            <p>
              Confira os dados do atendimento. A confirmação também será enviada para o WhatsApp
              informado.
            </p>
            <button className="button button--primary" type="button" onClick={resetDemo}>
              Agendar outro horário
            </button>
          </div>
        ) : (
          <>
            <ol className="booking-stepper" aria-label="Etapas do agendamento">
              {["Modalidade e serviço", "Data e horário", "Seus dados", "Resumo"].map(
                (label, index) => {
                  const stepNumber = index + 1;
                  const isCurrent = step === stepNumber;
                  const isComplete = step > stepNumber;

                  return (
                    <li
                      className={
                        isCurrent
                          ? "booking-stepper__item booking-stepper__item--current"
                          : isComplete
                            ? "booking-stepper__item booking-stepper__item--complete"
                            : "booking-stepper__item"
                      }
                      key={label}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      <span>{isComplete ? <Check aria-hidden="true" size={16} /> : stepNumber}</span>
                      <strong>{label}</strong>
                    </li>
                  );
                },
              )}
            </ol>

            <div className="booking-demo__body" aria-live="polite">
              {step === 1 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 1 de 4</span>
                    <h3 ref={stepHeadingRef} tabIndex={-1}>Como você deseja agendar?</h3>
                    <p>Escolha a modalidade e o serviço para continuar.</p>
                  </div>

                  <div className="booking-mode-grid">
                    {MODE_OPTIONS.map((option) => (
                      <button
                        className={
                          mode === option.value
                            ? "booking-mode-card booking-mode-card--selected"
                            : "booking-mode-card"
                        }
                        type="button"
                        key={option.value}
                        aria-pressed={mode === option.value}
                        onClick={() => changeMode(option.value)}
                      >
                        {option.value === "GRUPO" ? (
                          <Users aria-hidden="true" size={22} />
                        ) : (
                          <UserRound aria-hidden="true" size={22} />
                        )}
                        <strong>{option.title}</strong>
                        <span>{option.description}</span>
                      </button>
                    ))}
                  </div>

                  {mode !== "GRUPO" ? (
                    <label className="form-field">
                      <span>Serviço</span>
                      <select value={serviceId} onChange={(event) => changeService(event.target.value)}>
                        {SERVICES.map((service) => (
                          <option value={service.id} key={service.id}>
                            {service.name} — {formatCurrency(service.price)} —{" "}
                            {formatDuration(service.durationMinutes)}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <div className="booking-group">
                      <div className="booking-group__heading">
                        <div>
                          <h4>Participantes</h4>
                          <p>
                            Cada pessoa pode escolher um serviço diferente. A agenda mostra somente horários
                            com profissionais suficientes para atender todo o grupo.
                          </p>
                        </div>
                        <button className="button button--secondary" type="button" onClick={addParticipant}>
                          <Plus aria-hidden="true" size={18} />
                          Adicionar participante
                        </button>
                      </div>

                      <div className="booking-group__list">
                        {participants.map((participant, index) => (
                          <article className="booking-participant" key={participant.id}>
                            <div className="booking-participant__header">
                              <strong>Participante {index + 1}</strong>
                              {participants.length > 2 && (
                                <button
                                  className="icon-button"
                                  type="button"
                                  aria-label={`Remover participante ${index + 1}`}
                                  title={`Remover participante ${index + 1}`}
                                  onClick={() => removeParticipant(participant.id)}
                                >
                                  <Trash2 aria-hidden="true" size={17} />
                                </button>
                              )}
                            </div>
                            <div className="booking-participant__fields">
                              <label className="form-field">
                                <span>Nome ou identificação</span>
                                <input
                                  type="text"
                                  value={participant.name}
                                  placeholder="Ex.: Filho 1"
                                  onChange={(event) =>
                                    updateParticipant(participant.id, "name", event.target.value)
                                  }
                                />
                              </label>
                              <label className="form-field">
                                <span>Serviço</span>
                                <select
                                  value={participant.serviceId}
                                  onChange={(event) =>
                                    updateParticipant(participant.id, "serviceId", event.target.value)
                                  }
                                >
                                  {SERVICES.map((service) => (
                                    <option value={service.id} key={service.id}>
                                      {service.name} — {formatDuration(service.durationMinutes)}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {mode === "PLANO" && (
                    <div className="booking-inline-message" role="note">
                      O sistema verifica os serviços incluídos no seu plano ativo antes da confirmação.
                      Se houver valor adicional, ele será informado no resumo.
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 2 de 4</span>
                    <h3 ref={stepHeadingRef} tabIndex={-1}>Escolha uma data e um horário</h3>
                    <p>
                      Cada cartão representa 15 minutos. Um horário só pode ser escolhido como início
                      quando o mesmo barbeiro estiver disponível durante toda a duração do serviço.
                    </p>
                  </div>

                  <div className="booking-date-grid" role="group" aria-label="Datas disponíveis">
                    {dates.map((date) => (
                      <button
                        className={
                          selectedDate === date.iso
                            ? "booking-date booking-date--selected"
                            : "booking-date"
                        }
                        type="button"
                        key={date.iso}
                        aria-pressed={selectedDate === date.iso}
                        onClick={() => {
                          setSelectedDate(date.iso);
                          setSelectedTime("");
                        }}
                      >
                        <CalendarDays aria-hidden="true" size={18} />
                        <span>{date.shortLabel}</span>
                      </button>
                    ))}
                  </div>

                  <div className="booking-inline-message" role="note">
                    Este atendimento ocupa <strong>{effectiveDuration / SLOT_INTERVAL}</strong>{" "}
                    {effectiveDuration / SLOT_INTERVAL === 1 ? "janela" : "janelas"} de 15 minutos.
                    Cada cartão mostra quem está livre naquele bloco. Quando houver continuidade,
                    também mostra quem pode iniciar {effectiveDuration} min naquele horário. Verde marca
                    o seu atendimento, amarelo indica que ninguém consegue permanecer livre pela duração
                    completa e vermelho indica que não há barbeiro disponível naquele bloco.
                  </div>

                  <div className="booking-times">
                    <div className="booking-times__period">
                      <div className="booking-times__heading">
                        <Clock3 aria-hidden="true" size={18} />
                        <strong>Manhã • 09:00–12:00</strong>
                      </div>
                      <div className="booking-time-grid">
                        {morningSlots.map((time) => {
                          const allocation = buildAllocation(
                            selectedDate,
                            time,
                            mode,
                            effectiveDuration,
                            participants,
                            morningSlots,
                          );
                          const selectedBarbers =
                            selectedAllocation?.selectedBarbersByTime[time] ?? [];
                          const startAvailableBarbers = getStartAvailableBarbers(
                            selectedDate,
                            time,
                            mode,
                            effectiveDuration,
                            morningSlots,
                            allocation,
                          );

                          return (
                            <BookingTimeSlot
                              key={time}
                              time={time}
                              availableBarbers={getDemoAvailableBarbers(selectedDate, time)}
                              startAvailableBarbers={startAvailableBarbers}
                              selectedBarbers={selectedBarbers}
                              canStart={allocation !== null}
                              isSelected={selectedBarbers.length > 0}
                              requiredDurationMinutes={effectiveDuration}
                              onSelect={() => {
                                if (allocation) {
                                  setSelectedTime(time);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="booking-lunch-block" aria-label="Intervalo de almoço bloqueado">
                      12:00–13:00 • intervalo de almoço
                    </div>

                    <div className="booking-times__period">
                      <div className="booking-times__heading">
                        <Clock3 aria-hidden="true" size={18} />
                        <strong>Tarde/noite • 13:00–20:30</strong>
                      </div>
                      <div className="booking-time-grid">
                        {afternoonSlots.map((time) => {
                          const allocation = buildAllocation(
                            selectedDate,
                            time,
                            mode,
                            effectiveDuration,
                            participants,
                            afternoonSlots,
                          );
                          const selectedBarbers =
                            selectedAllocation?.selectedBarbersByTime[time] ?? [];
                          const startAvailableBarbers = getStartAvailableBarbers(
                            selectedDate,
                            time,
                            mode,
                            effectiveDuration,
                            afternoonSlots,
                            allocation,
                          );

                          return (
                            <BookingTimeSlot
                              key={time}
                              time={time}
                              availableBarbers={getDemoAvailableBarbers(selectedDate, time)}
                              startAvailableBarbers={startAvailableBarbers}
                              selectedBarbers={selectedBarbers}
                              canStart={allocation !== null}
                              isSelected={selectedBarbers.length > 0}
                              requiredDurationMinutes={effectiveDuration}
                              onSelect={() => {
                                if (allocation) {
                                  setSelectedTime(time);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="booking-inline-message" role="note">
                    <strong>Horário ocupado</strong> significa que não há barbeiro naquele bloco.
                    Nos demais cartões, a primeira lista mostra quem está livre naquela janela; quando
                    o serviço pode começar ali, uma segunda linha mostra quem consegue permanecer livre
                    até o fim do atendimento.
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 3 de 4</span>
                    <h3 ref={stepHeadingRef} tabIndex={-1}>
                      {mode === "GRUPO" ? "Dados do responsável" : "Seus dados"}
                    </h3>
                    <p>
                      Esses dados identificam o agendamento e serão usados para enviar a confirmação.
                    </p>
                  </div>

                  <div className="booking-customer-fields">
                    <label className="form-field">
                      <span>{mode === "GRUPO" ? "Nome do responsável" : "Nome do cliente"}</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={responsibleName}
                        placeholder="Digite o nome"
                        onChange={(event) => setResponsibleName(event.target.value)}
                      />
                    </label>

                    <label className="form-field">
                      <span>WhatsApp</span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        maxLength={15}
                        placeholder="(21) 97562-3471"
                        aria-describedby="booking-phone-help"
                        aria-invalid={phone.length > 0 && !whatsappIsValid}
                        onChange={(event) => {
                          const formattedWhatsApp = formatBrazilianWhatsApp(event.target.value);

                          if (formattedWhatsApp !== null) {
                            setPhone(formattedWhatsApp);
                          }
                        }}
                      />
                      <small id="booking-phone-help" aria-live="polite">
                        {phone.length === 0
                          ? "Digite um celular com WhatsApp e DDD. Ex.: (21) 97562-3471."
                          : phone.replace(/\D/g, "").length < 11
                            ? "Continue digitando o WhatsApp com DDD."
                            : whatsappIsValid
                              ? "WhatsApp pronto para continuar."
                              : "Informe um celular brasileiro válido com DDD e número iniciado por 9."}
                      </small>
                    </label>
                  </div>

                  <div className="booking-inline-message booking-inline-message--safe" role="note">
                    Use um número com WhatsApp para receber a confirmação e as informações do atendimento.
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 4 de 4</span>
                    <h3 ref={stepHeadingRef} tabIndex={-1}>
                      Confira os dados antes de confirmar
                    </h3>
                    <p>
                      A disponibilidade será validada novamente no momento da confirmação para evitar conflitos.
                    </p>
                  </div>

                  <div className="booking-summary">
                    <div className="booking-summary__row">
                      <span>Modalidade</span>
                      <strong>
                        {mode === "AVULSO"
                          ? "Cliente avulso"
                          : mode === "PLANO"
                            ? "Plano mensal"
                            : "Agendamento em grupo"}
                      </strong>
                    </div>

                    {mode !== "GRUPO" ? (
                      <>
                        <div className="booking-summary__row">
                          <span>Serviço</span>
                          <strong>{selectedService.name}</strong>
                        </div>
                        <div className="booking-summary__row">
                          <span>Duração</span>
                          <strong>{formatDuration(selectedService.durationMinutes)}</strong>
                        </div>
                      </>
                    ) : (
                      <div className="booking-summary__group">
                        <span>Participantes</span>
                        {participants.map((participant) => {
                          const participantService = getService(participant.serviceId);

                          return (
                            <div className="booking-summary__participant" key={participant.id}>
                              <strong>{participant.name}</strong>
                              <span>
                                {participantService.name} •{" "}
                                {formatDuration(participantService.durationMinutes)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="booking-summary__row">
                      <span>Data</span>
                      <strong>{selectedDateOption?.fullLabel ?? selectedDate}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Início</span>
                      <strong>{selectedTime}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Horários do atendimento</span>
                      <strong>{selectedAllocation?.selectedTimes.join(" • ")}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>{mode === "GRUPO" ? "Responsável" : "Cliente"}</span>
                      <strong>{responsibleName}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>WhatsApp</span>
                      <strong>{phone}</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>{mode === "GRUPO" ? "Profissionais" : "Profissional"}</span>
                      <strong>
                        {selectedAllocation?.assignments
                          .map((assignment) =>
                            mode === "GRUPO"
                              ? `${assignment.participantLabel}: ${assignment.barber}`
                              : assignment.barber,
                          )
                          .join(" • ")}
                      </strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>Valor</span>
                      <strong>
                        {formatCurrency(mode === "GRUPO" ? groupTotal : selectedService.price)}
                      </strong>
                    </div>
                  </div>

                  {mode === "PLANO" && (
                    <div className="booking-inline-message" role="note">
                      O plano ativo e a cobertura do serviço serão validados antes da confirmação.
                      Se houver valor adicional, ele será informado antes de concluir.
                    </div>
                  )}

                  {mode === "GRUPO" && (
                    <div className="booking-inline-message" role="note">
                      O grupo só será confirmado quando houver profissionais suficientes e disponíveis
                      para todos os participantes.
                    </div>
                  )}

                  <button
                    className="button button--primary booking-demo__confirm-button"
                    type="button"
                    onClick={() => setDemoComplete(true)}
                  >
                    <Check aria-hidden="true" size={18} />
                    Confirmar agendamento
                  </button>
                </div>
              )}
            </div>

            <div className="booking-demo__footer">
              <button
                className="button button--secondary"
                type="button"
                disabled={step === 1}
                onClick={() => navigateToStep(step - 1)}
              >
                Voltar
              </button>

              {step < 4 && (
                <div className="booking-demo__footer-next">
                  {step === 2 && !stepTwoValid && (
                    <span className="booking-demo__continue-help" role="status">
                      Selecione um horário disponível para continuar.
                    </span>
                  )}
                  <button
                    className="button button--primary"
                    type="button"
                    disabled={!canAdvance}
                    aria-disabled={!canAdvance}
                    onClick={() => navigateToStep(step + 1)}
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
