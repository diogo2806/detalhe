import { CalendarCheck2, CircleDollarSign, Repeat2 } from "lucide-react";

const WHATSAPP_PLAN_URL =
  "https://wa.me/5521967284242?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Plano%20Mensal%20da%20Barbearia%20do%20Detalhe.";

export function PlanSection() {
  return (
    <section className="section section--accent" id="plano" aria-labelledby="plano-title">
      <div className="plan-panel">
        <div className="plan-panel__content">
          <span className="eyebrow">Relacionamento recorrente</span>
          <h2 id="plano-title">Plano mensal para quem gosta de manter o corte em dia</h2>
          <p>
            A proposta do plano mensal é transformar visitas recorrentes em uma experiência mais previsível
            para o cliente e para a barbearia. As condições finais serão confirmadas diretamente com a equipe.
          </p>
          <a className="button button--primary" href={WHATSAPP_PLAN_URL} target="_blank" rel="noreferrer">
            Quero saber mais
          </a>
        </div>

        <div className="plan-panel__benefits">
          <article>
            <Repeat2 aria-hidden="true" size={22} />
            <h3>Recorrência</h3>
            <p>Uma proposta pensada para clientes frequentes.</p>
          </article>
          <article>
            <CalendarCheck2 aria-hidden="true" size={22} />
            <h3>Agenda futura</h3>
            <p>Na próxima fase, o plano poderá se integrar ao agendamento online.</p>
          </article>
          <article>
            <CircleDollarSign aria-hidden="true" size={22} />
            <h3>Pix e lembretes</h3>
            <p>Pagamento e automações por n8n ficam reservados para a evolução do sistema.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
