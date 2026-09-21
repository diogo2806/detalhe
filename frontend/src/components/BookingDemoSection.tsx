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
import { useMemo, useState } from "react";

type BookingMode = "AVULSO" | "PLANO" | "GRUPO";

type ServiceDefinition = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
};

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

const SERVICES: ServiceDefinition[] = [
  { id: "corte-maquina-tesoura", name: "Corte máquina & tesoura", price: 40, durationMinutes: 45 },
  { id: "corte-navalhado", name: "Corte navalhado", price: 40, durationMinutes: 45 },
  { id: "corte-barba", name: "Corte & barba", price: 55, durationMinutes: 45 },
  { id: "corte-maquina", name: "Corte máquina", price: 35, durationMinutes: 45 },
  { id: "corte-barba-sobrancelha", name: "Corte & barba & sobrancelha", price: 55, durationMinutes: 45 },
  { id: "corte-pigmentacao", name: "Corte + pigmentação", price: 45, durationMinutes: 45 },
  { id: "so-barba", name: "Só barba", price: 20, durationMinutes: 30 },
  { id: "pezinho", name: "Pezinho", price: 10, durationMinutes: 15 },
  { id: "reflexo-corte", name: "Reflexo alinhado + corte", price: 110, durationMinutes: 90 },
  { id: "nevou-corte", name: "Nevou + corte", price: 100, durationMinutes: 60 },
  { id: "sobrancelha", name: "Sobrancelha", price: 10, durationMinutes: 15 },
];

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
    description: "Prévia do fluxo para clientes com plano ativo.",
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

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDuration(durationMinutes: number): string {
  if (durationMinutes < 60) {
    return `${durationMinutes} min`;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function generateSegmentSlots(start: number, end: number, durationMinutes: number): string[] {
  const slots: string[] = [];

  for (let slotStart = start; slotStart + durationMinutes <= end; slotStart += SLOT_INTERVAL) {
    slots.push(minutesToTime(slotStart));
  }

  return slots;
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

  const morningSlots = useMemo(
    () => generateSegmentSlots(MORNING_START, MORNING_END, effectiveDuration),
    [effectiveDuration],
  );
  const afternoonSlots = useMemo(
    () => generateSegmentSlots(AFTERNOON_START, AFTERNOON_END, effectiveDuration),
    [effectiveDuration],
  );

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
  const stepTwoValid = selectedDate.length > 0 && selectedTime.length > 0;
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

  return (
    <section className="section section--accent" id="agendamento" aria-labelledby="agendamento-title">
      <div className="section__heading section__heading--split">
        <div>
          <span className="eyebrow">Demonstração interativa</span>
          <h2 id="agendamento-title">Veja como será o agendamento online</h2>
        </div>
        <p>
          Esta versão serve apenas para apresentação. Nenhum horário é consultado no backend,
          reservado, persistido ou enviado ao n8n.
        </p>
      </div>

      <div className="booking-demo">
        <div className="booking-demo__notice" role="note">
          <BadgeCheck aria-hidden="true" size={20} />
          <div>
            <strong>Modo demonstração</strong>
            <span>
              A grade abaixo usa as regras de horário e duração do projeto, mas não representa
              disponibilidade real de profissionais.
            </span>
          </div>
        </div>

        {demoComplete ? (
          <div className="booking-demo__confirmation" role="status" aria-live="polite">
            <span className="booking-demo__confirmation-icon" aria-hidden="true">
              <Check size={30} />
            </span>
            <span className="eyebrow">Simulação concluída</span>
            <h3>Pronto! Essa é a confirmação que você verá ao agendar.</h3>
            <p>
              Neste teste, nenhum horário foi reservado de verdade. Quando o agendamento online
              estiver ativo, esta tela mostrará a confirmação do seu horário e você receberá uma
              mensagem no WhatsApp.
            </p>
            <button className="button button--primary" type="button" onClick={resetDemo}>
              Fazer nova simulação
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
                    <h3>Como será o atendimento?</h3>
                    <p>Escolha a modalidade para visualizar o fluxo correspondente.</p>
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
                            Cada pessoa pode escolher um serviço diferente. A capacidade simultânea
                            será validada apenas na versão com backend.
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
                      A cobertura definitiva de cada serviço pelo plano mensal ainda será parametrizada.
                      Nesta prévia, o valor da tabela permanece visível apenas como referência.
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 2 de 4</span>
                    <h3>Escolha uma data e um horário</h3>
                    <p>
                      A grade começa a cada 15 minutos e elimina inícios que fariam o atendimento
                      ultrapassar o almoço ou o fechamento.
                    </p>
                  </div>

                  <div className="booking-date-grid" role="group" aria-label="Datas de demonstração">
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

                  <div className="booking-times">
                    <div className="booking-times__period">
                      <div className="booking-times__heading">
                        <Clock3 aria-hidden="true" size={18} />
                        <strong>Manhã • 09:00–12:00</strong>
                      </div>
                      <div className="booking-time-grid">
                        {morningSlots.map((time) => (
                          <button
                            className={
                              selectedTime === time
                                ? "booking-time booking-time--selected"
                                : "booking-time"
                            }
                            type="button"
                            key={time}
                            aria-pressed={selectedTime === time}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
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
                        {afternoonSlots.map((time) => (
                          <button
                            className={
                              selectedTime === time
                                ? "booking-time booking-time--selected"
                                : "booking-time"
                            }
                            type="button"
                            key={time}
                            aria-pressed={selectedTime === time}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="booking-inline-message" role="note">
                    Duração considerada nesta simulação: <strong>{formatDuration(effectiveDuration)}</strong>.
                    Nenhum conflito com agenda real ou profissional é consultado nesta versão.
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 3 de 4</span>
                    <h3>{mode === "GRUPO" ? "Dados do responsável" : "Seus dados"}</h3>
                    <p>
                      Na versão final, estes dados serão usados para identificar o agendamento e enviar
                      a confirmação.
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
                    Os dados digitados permanecem somente na memória desta página e desaparecem ao
                    atualizar ou sair do site.
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="booking-step">
                  <div className="booking-step__heading">
                    <span className="eyebrow">Etapa 4 de 4</span>
                    <h3>Confira a prévia antes da confirmação</h3>
                    <p>
                      O sistema definitivo fará uma nova validação de disponibilidade antes de salvar.
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
                      <span>Horário</span>
                      <strong>{selectedTime}</strong>
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
                      <span>Profissional</span>
                      <strong>Será definido conforme disponibilidade real</strong>
                    </div>
                    <div className="booking-summary__row">
                      <span>{mode === "PLANO" ? "Valor de referência" : "Valor"}</span>
                      <strong>
                        {formatCurrency(mode === "GRUPO" ? groupTotal : selectedService.price)}
                      </strong>
                    </div>
                  </div>

                  {mode === "PLANO" && (
                    <div className="booking-inline-message" role="note">
                      A versão final verificará se o serviço está incluído no plano ativo antes de
                      definir eventual cobrança por atendimento.
                    </div>
                  )}

                  {mode === "GRUPO" && (
                    <div className="booking-inline-message" role="note">
                      A versão final somente confirmará o grupo se houver uma combinação suficiente de
                      profissionais elegíveis e disponíveis para todos os participantes.
                    </div>
                  )}

                  <button
                    className="button button--primary booking-demo__confirm-button"
                    type="button"
                    onClick={() => setDemoComplete(true)}
                  >
                    <Check aria-hidden="true" size={18} />
                    Visualizar confirmação
                  </button>
                </div>
              )}
            </div>

            <div className="booking-demo__footer">
              <button
                className="button button--secondary"
                type="button"
                disabled={step === 1}
                onClick={() => setStep((currentStep) => Math.max(1, currentStep - 1))}
              >
                Voltar
              </button>

              {step < 4 && (
                <button
                  className="button button--primary"
                  type="button"
                  disabled={!canAdvance}
                  onClick={() => setStep((currentStep) => Math.min(4, currentStep + 1))}
                >
                  Continuar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
