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
            <h2 id="screen-manual-title">Site e agendamento online</h2>
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
              Esta página apresenta os serviços, valores, plano mensal, trabalhos, localização e
              canais de contato da Barbearia do Detalhe. Também permite escolher um atendimento e
              realizar o agendamento online.
            </p>
          </section>

          <section>
            <h3>Agendamento</h3>
            <p>
              O fluxo possui quatro etapas: modalidade e serviço, data e horário, dados do cliente e
              resumo. A modalidade pode ser cliente avulso, plano mensal ou grupo. Ao usar Voltar ou
              Continuar, a página retorna ao bloco de agendamento e leva o foco ao título da nova etapa,
              mantendo o contexto visual e a navegação por teclado.
            </p>
          </section>

          <section>
            <h3>Modalidade e serviços</h3>
            <p>
              Cliente avulso escolhe o serviço desejado. Cliente do plano mensal seleciona a modalidade
              para que a cobertura do plano seja considerada antes da confirmação. No agendamento em
              grupo, é possível adicionar participantes, identificar cada pessoa e escolher serviços
              diferentes. A agenda considera os profissionais aptos e disponíveis para cada atendimento.
            </p>
          </section>

          <section>
            <h3>Data e horário</h3>
            <p>
              A agenda apresenta dias de atendimento de terça a sábado e horários divididos em janelas
              de 15 minutos. A duração do serviço define quantas janelas serão ocupadas. Um atendimento
              de 45 minutos, por exemplo, utiliza três janelas e exige que o mesmo profissional permaneça
              disponível durante todo o período. Horários sem continuidade suficiente não podem ser
              escolhidos como início. Horários ocupados ficam indisponíveis, e o intervalo de 12:00 a
              13:00 permanece bloqueado para almoço. A disponibilidade é validada novamente antes da
              confirmação.
            </p>
          </section>

          <section>
            <h3>Dados do cliente</h3>
            <p>
              O agendamento solicita nome e WhatsApp. O número usa máscara brasileira no formato
              (DD) 9XXXX-XXXX e só permite continuar quando houver DDD válido e formato de celular.
              Esses dados identificam o agendamento e permitem o envio da confirmação do atendimento.
            </p>
          </section>

          <section>
            <h3>Resumo e confirmação</h3>
            <p>
              O resumo apresenta modalidade, serviço ou participantes, duração, data, horário,
              todos os blocos ocupados, cliente, WhatsApp, profissional ou profissionais responsáveis
              e valor do atendimento. Ao confirmar, o sistema verifica novamente a disponibilidade,
              registra o horário e apresenta a confirmação. O WhatsApp informado também recebe os
              dados do agendamento.
            </p>
          </section>

          <section>
            <h3>Plano mensal</h3>
            <p>
              Clientes com plano mensal podem usar a mesma agenda para marcar os serviços incluídos.
              Antes de confirmar, o sistema verifica se o plano está ativo e se o serviço selecionado
              possui cobertura. Quando houver valor adicional, ele é informado no resumo. O vencimento
              do plano gera um lembrete pelo WhatsApp um dia antes, com opção de pagamento por Pix.
            </p>
          </section>

          <section>
            <h3>Grupo</h3>
            <p>
              O agendamento em grupo permite escolher serviços diferentes para cada participante.
              O horário só pode ser confirmado quando houver profissionais elegíveis e disponíveis
              em quantidade suficiente para atender todos os participantes simultaneamente.
            </p>
          </section>

          <section>
            <h3>Paleta de cores</h3>
            <p>
              O botão com ícone de paleta, ao lado do Manual da Tela, permite comparar quatro
              direções de identidade visual: azul-marinho e dourado para confiança e sofisticação,
              grafite e cobre para sofisticação e robustez, bordô e creme para elegância e
              personalidade, e madeira e bege para tradição e acolhimento. Essas associações servem
              como referência de posicionamento e podem variar conforme contexto, cultura e público.
              No modo Aleatório, uma dessas direções é sorteada ao iniciar o site. Ao escolher uma
              paleta específica, a preferência fica salva neste navegador até o usuário voltar ao modo
              Aleatório. A troca é somente visual e não altera dados nem regras do agendamento.
            </p>
          </section>

          <section>
            <h3>Outras seções e ações</h3>
            <p>
              Serviços, plano mensal, trabalhos, localização e dúvidas frequentes ficam disponíveis
              na mesma página. Os atalhos de WhatsApp, Instagram e rota abrem os respectivos serviços
              externos. Os links do menu levam diretamente à seção escolhida.
            </p>
          </section>

          <section>
            <h3>Estados e mensagens</h3>
            <p>
              Botões de continuação ficam indisponíveis enquanto os dados mínimos da etapa não forem
              preenchidos. Horários sem disponibilidade não podem ser selecionados. Após confirmar,
              a tela apresenta o resultado do agendamento e orienta o cliente caso seja necessário
              escolher outro horário.
            </p>
          </section>

          <section>
            <h3>Permissões</h3>
            <p>
              A página é pública e o fluxo de agendamento é destinado aos clientes da barbearia.
              As ações disponíveis são apresentadas de acordo com a etapa atual do atendimento.
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
