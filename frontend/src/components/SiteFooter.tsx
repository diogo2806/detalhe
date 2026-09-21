import { Instagram, MessageCircle, Scissors } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="brand brand--footer">
        <span className="brand__mark" aria-hidden="true">
          <Scissors size={22} />
        </span>
        <span className="brand__text">
          <strong>Barbearia</strong>
          <span>do Detalhe</span>
        </span>
      </div>

      <p>Rua Nilo Peçanha, Centro • Itaguaí - RJ</p>

      <div className="site-footer__links">
        <a href="https://wa.me/5521967284242" target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" size={17} />
          WhatsApp
        </a>
        <a href="https://www.instagram.com/barbeariadodetalhe/" target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" size={17} />
          Instagram
        </a>
      </div>
    </footer>
  );
}
