import { BookOpen, X } from "lucide-react";
import { useRef } from "react";

export function ScreenManualDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="icon-button"
        type="button"
        aria-label="Abrir manual da tela"
        title="Manual da tela"
        onClick={openDialog}
      >
        <BookOpen aria-hidden="true" size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="screen-manual"
        aria-labelledby="screen-manual-title"
        onCancel={closeDialog}
      >
        <div className="screen-manual__header">
          <div>
            <span className="eyebrow">Manual da Tela</span>
            <h2 id="screen-manual-title">Prévia do site da Barbearia do Detalhe</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Fechar manual da tela"
            title="Fechar manual da tela"
            onClick={closeDialog}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="screen-manual__content">
          <section>
            <h3>Finalidade</h3>
            <p>
              Esta página apresenta a proposta visual e comercial do novo site para validação do cliente.
              Nesta fase não existe backend, persistência nem agendamento real.
            </p>
          </section>

          <section>
            <h3>Seções disponíveis</h3>
            <p>
              A página apresenta proposta de valor, diferenciais, serviços e preços, plano mensal,
              trabalhos, localização, horários, contato e dúvidas frequentes.
            </p>
          </section>

          <section>
            <h3>Botões e ações</h3>
            <p>
              Os botões de WhatsApp, Instagram e Google Maps abrem serviços externos. Os links internos
              apenas navegam entre as seções da página. Nenhum botão cria ou confirma agendamento.
            </p>
          </section>

          <section>
            <h3>Campos e filtros</h3>
            <p>
              Não há campos, filtros ou formulários nesta fase. Dados pessoais não são coletados pelo site.
            </p>
          </section>

          <section>
            <h3>Regras de uso</h3>
            <p>
              Serviços e valores são apenas informativos. Para confirmar disponibilidade, adesão ao plano
              mensal ou atendimento, o visitante deve falar com a barbearia pelo WhatsApp.
            </p>
          </section>

          <section>
            <h3>Próximas fases</h3>
            <p>
              Após aprovação, o projeto poderá receber agenda online, profissionais, grupos, serviços com
              múltiplas janelas, plano mensal, Pix e automações n8n.
            </p>
          </section>

          <section>
            <h3>Estados e mensagens</h3>
            <p>
              A única mensagem de estado fixa é a identificação de que esta é uma prévia para aprovação e
              que o agendamento online será ativado em uma fase posterior.
            </p>
          </section>

          <section>
            <h3>Permissões</h3>
            <p>
              A página é pública e não possui autenticação, área administrativa ou controle de perfis.
            </p>
          </section>
        </div>

        <div className="screen-manual__footer">
          <button className="button button--secondary" type="button" onClick={closeDialog}>
            Fechar
          </button>
        </div>
      </dialog>
    </>
  );
}
