import { Clock3, MapPin, MessageCircle, Navigation } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/XS9hxaPot1yu2rwx7";
const WHATSAPP_URL = "https://wa.me/5521967284242";

export function LocationSection() {
  return (
    <section className="section section--muted" id="localizacao" aria-labelledby="localizacao-title">
      <div className="location-panel">
        <div>
          <span className="eyebrow">Centro de Itaguaí</span>
          <h2 id="localizacao-title">Fácil de encontrar. Fácil de falar.</h2>
          <p>
            Rua Nilo Peçanha, Centro • Itaguaí - RJ • CEP 23815-465.
          </p>
        </div>

        <div className="location-grid">
          <article className="location-card">
            <MapPin aria-hidden="true" size={22} />
            <div>
              <h3>Endereço</h3>
              <p>Rua Nilo Peçanha, Centro • Itaguaí - RJ</p>
            </div>
          </article>

          <article className="location-card">
            <Clock3 aria-hidden="true" size={22} />
            <div>
              <h3>Funcionamento</h3>
              <p>Terça a sábado, das 09:00 às 20:20.</p>
            </div>
          </article>

          <article className="location-card">
            <MessageCircle aria-hidden="true" size={22} />
            <div>
              <h3>WhatsApp</h3>
              <p>(21) 96728-4242</p>
            </div>
          </article>
        </div>

        <div className="location-panel__actions">
          <a className="button button--primary" href={MAPS_URL} target="_blank" rel="noreferrer">
            <Navigation aria-hidden="true" size={18} />
            Abrir rota
          </a>
          <a className="button button--secondary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" size={18} />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
