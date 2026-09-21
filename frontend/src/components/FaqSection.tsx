const faqItems = [
  {
    question: "Já é possível agendar pelo site?",
    answer:
      "Você já pode navegar por uma demonstração completa do fluxo de agendamento, escolhendo modalidade, serviço, data, horário e dados do cliente. Nesta fase, porém, nenhuma reserva é gravada e a disponibilidade mostrada não representa a agenda real.",
  },
  {
    question: "Os horários mostrados estão realmente disponíveis?",
    answer:
      "Não. A grade desta prévia serve para demonstrar intervalos de 15 minutos, duração dos serviços, almoço e fechamento. A versão definitiva consultará profissionais, bloqueios e agendamentos no backend antes de confirmar.",
  },
  {
    question: "É possível visualizar agendamento em grupo?",
    answer:
      "Sim. A demonstração permite adicionar participantes e escolher um serviço para cada pessoa. A validação de profissionais simultâneos será feita somente quando o backend definitivo estiver integrado.",
  },
  {
    question: "Como funciona o plano mensal?",
    answer:
      "A página apresenta o conceito do plano mensal e permite visualizar o fluxo de agenda nessa modalidade. Valor da mensalidade e cobertura definitiva dos serviços continuam pendentes de definição comercial.",
  },
  {
    question: "Os dados digitados no agendamento são armazenados?",
    answer:
      "Não. Nome, telefone e escolhas do agendamento permanecem apenas na memória da página durante a demonstração e desaparecem ao atualizar ou sair do site.",
  },
  {
    question: "O que será desenvolvido depois da aprovação?",
    answer:
      "A evolução prevista inclui persistência no backend, disponibilidade real de profissionais, prevenção de conflitos, protocolo, confirmação por n8n, plano mensal, Pix e automações de cobrança.",
  },
];

export function FaqSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="section__heading">
        <span className="eyebrow">Dúvidas frequentes</span>
        <h2 id="faq-title">O que já pode ser demonstrado e o que depende do backend</h2>
      </div>

      <div className="faq-list">
        {faqItems.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
