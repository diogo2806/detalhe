import { Clock3, MapPinned, Scissors, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: Scissors,
    title: "Serviços claros",
    description: "Valores e opções apresentados de forma direta para o cliente decidir antes de sair de casa.",
  },
  {
    icon: Clock3,
    title: "Tempo valorizado",
    description: "A proposta futura de agenda reduz espera e organiza melhor a rotina da barbearia.",
  },
  {
    icon: Smartphone,
    title: "Contato fácil",
    description: "WhatsApp, Instagram e rotas ficam acessíveis em poucos cliques.",
  },
  {
    icon: MapPinned,
    title: "Presença local",
    description: "O site reforça localização, identidade e relacionamento com clientes de Itaguaí.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section section--muted" aria-labelledby="beneficios-title">
      <div className="section__heading">
        <span className="eyebrow">Experiência simples</span>
        <h2 id="beneficios-title">Tudo o que o cliente precisa encontrar rapidamente</h2>
      </div>
      <div className="card-grid card-grid--four">
        {benefits.map(({ icon: Icon, title, description }) => (
          <article className="info-card" key={title}>
            <span className="info-card__icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
