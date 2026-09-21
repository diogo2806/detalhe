import { Clock3 } from "lucide-react";
import { SERVICES } from "../shared/constants/serviceCatalog";
import { formatCurrency, formatDuration } from "../shared/utils/formatters";

export function ServicesSection() {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="section__heading section__heading--split">
        <div>
          <span className="eyebrow">Tabela de serviços</span>
          <h2 id="servicos-title">Escolha o acabamento que combina com você</h2>
        </div>
        <p>
          Confira os serviços, valores e duração de cada atendimento. Escolha o melhor horário
          disponível na agenda.
        </p>
      </div>

      <div className="service-grid">
        {SERVICES.map((service) => (
          <article className="service-card" key={service.id}>
            <div>
              <h3>{service.name}</h3>
              <span className="service-card__duration">
                <Clock3 aria-hidden="true" size={15} />
                {formatDuration(service.durationMinutes)}
              </span>
            </div>
            <strong>{formatCurrency(service.price)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
