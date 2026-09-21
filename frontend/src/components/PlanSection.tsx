import { CalendarCheck2, CircleDollarSign, Repeat2 } from "lucide-react";

const WHATSAPP_PLAN_URL =
  "https://wa.me/5521975623471?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Plano%20Mensal%20da%20Barbearia%20do%20Detalhe.";

export function PlanSection() {
  return (
    <section className="section section--accent" id="plano" aria-labelledby="plano-title">
      <div className="plan-panel">
        <div className="plan-panel__content">
          <span className="eyebrow">Plano mensal</span>
          <h2 id="plano-title">Plano mensal para quem gosta de manter o corte em dia</h2>
          <p>
            O plano mensal facilita a rotina de clientes frequentes e organiza os atendimentos ao longo do
            mês. Os serviços incluídos podem ser agendados diretamente pela agenda online.
          </p>
          <a className="button button--primary" href={WHATSAPP_PLAN_URL} target="_blank" rel="noreferrer">
            Quero conhecer o plano
          </a>
        </div>

        <div className="plan-panel__benefits">
          <article>
            <Repeat2 aria-hidden="true" size={22} />
            <h3>Recorrência</h3>
            <p>Organize seus atendimentos ao longo do mês.</p>
          </article>
          <article>
            <CalendarCheck2 aria-hidden="true" size={22} />
            <h3>Agenda online</h3>
            <p>Agende os serviços do plano nos horários disponíveis.</p>
          </article>
          <article>
            <CircleDollarSign aria-hidden="true" size={22} />
            <h3>Pix e lembretes</h3>
            <p>Lembrete de vencimento pelo WhatsApp, com opção de pagamento por Pix.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
