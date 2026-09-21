import { ArrowRight, CalendarClock, MapPin, ShieldCheck } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5521967284242?text=Ol%C3%A1!%20Vi%20a%20pr%C3%A9via%20do%20novo%20site%20da%20Barbearia%20do%20Detalhe%20e%20quero%20saber%20mais.";

export function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <div className="badge">
          <MapPin aria-hidden="true" size={16} />
          Centro de Itaguaí • RJ
        </div>
        <h1>
          Precisão no corte.
          <span> Detalhe em cada acabamento.</span>
        </h1>
        <p className="hero__lead">
          Uma nova experiência digital para aproximar a Barbearia do Detalhe dos clientes, apresentar
          serviços com clareza e preparar o caminho para o agendamento online.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#servicos">
            Conhecer serviços
            <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="button button--secondary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
        </div>
        <div className="hero__highlights" aria-label="Diferenciais da proposta">
          <span>
            <CalendarClock aria-hidden="true" size={18} />
            Agendamento online previsto
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={18} />
            Sem coleta de dados nesta fase
          </span>
        </div>
      </div>

      <div className="hero__visual">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqHbL32SGDsKZqznj8lA0BR2Bsgr8ZwkP8t3RbndEYPkMkzzDGZT8Qzq-lqDDb-m1nwYIN4TdizR4VqwX4EUjyd8eOcb1KjfeE_MxMgZ0DcFCsKV1aQKVu3mspyOdhvy9QiaebqOxnG5_zDnHGT0fGyq40yvMdO8r6UzR1GlErM6ANHQ0s28qGeJcb3LJPRNI6HMwdK0ZWs0yTiY3qSeR_jvkTAX1qYFpVos2svBOQAhtaXIpLZlpob-AyR3E14CpPvXE"
          alt="Atendimento profissional na Barbearia do Detalhe"
        />
        <div className="hero__visual-caption">
          <span>Barbearia do Detalhe</span>
          <strong>Rua Nilo Peçanha • Centro</strong>
        </div>
      </div>
    </section>
  );
}
