import { Clock3 } from "lucide-react";

const services = [
  { name: "Corte máquina & tesoura", price: "R$ 40,00", duration: "40 min" },
  { name: "Corte navalhado", price: "R$ 40,00", duration: "40 min" },
  { name: "Corte máquina", price: "R$ 35,00", duration: "40 min" },
  { name: "Só barba", price: "R$ 20,00", duration: "30 min" },
  { name: "Pezinho", price: "R$ 10,00", duration: "10 min" },
  { name: "Sobrancelha", price: "R$ 10,00", duration: "10 min" },
  { name: "Corte & barba", price: "R$ 55,00", duration: "40 min" },
  { name: "Corte, barba & sobrancelha", price: "R$ 55,00", duration: "40 min" },
  { name: "Corte + pigmentação", price: "R$ 45,00", duration: "40 min" },
  { name: "Nevou + corte", price: "R$ 100,00", duration: "1 h" },
  { name: "Reflexo alinhado + corte", price: "R$ 110,00", duration: "1 h 30 min" },
];

export function ServicesSection() {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="section__heading section__heading--split">
        <div>
          <span className="eyebrow">Tabela de serviços</span>
          <h2 id="servicos-title">Escolha o acabamento que combina com você</h2>
        </div>
        <p>
          Nesta prévia os valores são informativos. A disponibilidade continua sendo confirmada diretamente
          com a barbearia.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.name}>
            <div>
              <h3>{service.name}</h3>
              <span className="service-card__duration">
                <Clock3 aria-hidden="true" size={15} />
                {service.duration}
              </span>
            </div>
            <strong>{service.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
