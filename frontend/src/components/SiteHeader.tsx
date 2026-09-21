import { Scissors } from "lucide-react";
import { ScreenManualDialog } from "./ScreenManualDialog";

export function SiteHeader() {
  return (
    <>
      <div className="preview-banner" role="status">
        Demonstração do agendamento disponível • nenhuma reserva é gravada nesta versão.
      </div>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Barbearia do Detalhe - início">
          <span className="brand__mark" aria-hidden="true">
            <Scissors size={22} />
          </span>
          <span className="brand__text">
            <strong>Barbearia</strong>
            <span>do Detalhe</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#agendamento">Agendamento</a>
          <a href="#servicos">Serviços</a>
          <a href="#plano">Plano mensal</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#localizacao">Localização</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        <div className="site-header__actions">
          <ScreenManualDialog />
          <a className="button button--primary button--compact" href="#agendamento">
            Agendar horário
          </a>
        </div>
      </header>
    </>
  );
}
