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
            <h2 id="screen-manual-title">Prévia do site e do agendamento</h2>
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
              Esta página apresenta a proposta visual e comercial do site e permite demonstrar como
              será o agendamento online. A demonstração funciona somente no navegador, sem backend,
              banco de dados, reserva real, protocolo ou integração com n8n.
            </p>
          </section>

          <section>
            <h3>Agendamento</h3>
            <p>
              O fluxo possui quatro etapas: modalidade e serviço, data e horário, dados do cliente e
              resumo. A modalidade pode ser cliente avulso, plano mensal ou grupo. Ao usar Voltar ou
              Continuar, a página retorna ao bloco de agendamento e leva o foco ao título da nova etapa,
              mantendo o contexto visual e de navegação por teclado.
            </p>
          </section>

          <section>
            <h3>Modalidade e serviços</h3>
            <p>
              Cliente avulso e plano mensal escolhem um serviço. Em grupo, é possível adicionar dois
              ou mais participantes, informar uma identificação para cada pessoa e selecionar
              serviços diferentes. Como ainda não existe cadastro real da equipe, a demonstração usa
              os identificadores Barbeiro A, Barbeiro B e Barbeiro C somente para mostrar como a
              disponibilidade dos profissionais aparecerá na agenda.
            </p>
          </section>

          <section>
            <h3>Data e horário</h3>
            <p>
              A prévia mostra dias de atendimento de terça a sábado, horários divididos em janelas
              de 15 minutos e serviços com duração sempre em múltiplos de 15 minutos. Cada cartão
              mostra todos os barbeiros livres naquele bloco e, quando o serviço pode começar ali,
              mostra separadamente quais profissionais permanecem livres durante toda a duração.
              Ao escolher um horário, todas as janelas necessárias ficam marcadas; por exemplo,
              45 minutos ocupam 3 janelas e o mesmo barbeiro precisa estar livre nas três. Uma janela
              amarela pode ter barbeiros livres naquele bloco, mas nenhum deles consegue permanecer
              livre até o fim do serviço. Uma janela vermelha significa que não existe barbeiro
              disponível naquele bloco. As janelas selecionadas usam verde e nunca acumulam o estado
              amarelo de indisponibilidade. Antes de marcar um atendimento, a demonstração também
              confere novamente se o barbeiro atribuído está disponível em cada janela selecionada.
              Enquanto não houver uma seleção válida, o botão Continuar permanece desabilitado.
              O intervalo de 12:00 a 13:00 permanece bloqueado para almoço.
            </p>
          </section>

          <section>
            <h3>Dados do cliente</h3>
            <p>
              A demonstração solicita nome e WhatsApp. O número recebe máscara brasileira no formato
              (DD) 9XXXX-XXXX e só permite continuar quando estiver com DDD válido e formato de celular.
              Esses dados ficam apenas na memória da página enquanto ela estiver aberta e não são
              enviados nem persistidos.
            </p>
          </section>

          <section>
            <h3>Resumo e confirmação</h3>
            <p>
              O resumo apresenta modalidade, serviço ou participantes, duração, data, horário,
              todos os blocos ocupados pelo atendimento, cliente, WhatsApp, profissional de
              demonstração e valor de referência. Ao concluir a simulação, a tela mostra como será a
              confirmação do horário e informa que nenhum agendamento de verdade foi feito nesta etapa
              de apresentação.
            </p>
          </section>

          <section>
            <h3>Plano mensal</h3>
            <p>
              O fluxo pode ser visualizado, mas preço da mensalidade e cobertura definitiva de
              serviços ainda não são inventados. Na versão final, o backend validará o plano ativo e
              a cobertura antes de definir eventual cobrança.
            </p>
          </section>

          <section>
            <h3>Grupo</h3>
            <p>
              A prévia permite montar o grupo e escolher serviços diferentes. A versão definitiva só
              oferecerá e confirmará horários quando houver profissionais elegíveis suficientes para
              todos os participantes simultaneamente.
            </p>
          </section>

          <section>
            <h3>Outras seções e ações</h3>
            <p>
              Serviços, plano mensal, trabalhos, localização e FAQ continuam disponíveis. WhatsApp,
              Instagram e Google Maps abrem serviços externos. Os links internos navegam pela própria
              página.
            </p>
          </section>

          <section>
            <h3>Estados e mensagens</h3>
            <p>
              A interface identifica permanentemente o modo demonstração. Botões de continuação ficam
              indisponíveis enquanto os dados mínimos da etapa não forem preenchidos. Ao finalizar, a
              tela informa claramente que nenhuma reserva ou protocolo foi criado.
            </p>
          </section>

          <section>
            <h3>Permissões</h3>
            <p>
              A página é pública e não possui autenticação, área administrativa ou controle de perfis
              nesta fase.
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
