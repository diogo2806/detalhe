const faqItems = [
  {
    question: "Já é possível agendar pelo site?",
    answer:
      "Ainda não. Esta primeira versão é uma prévia estática para aprovação. Enquanto o sistema de agenda não é ativado, o atendimento continua sendo combinado diretamente pelo WhatsApp.",
  },
  {
    question: "Os serviços e preços já aparecem no site?",
    answer:
      "Sim. A prévia apresenta a tabela informativa de serviços e valores para facilitar a decisão do cliente antes do contato.",
  },
  {
    question: "Como funciona o plano mensal?",
    answer:
      "A página apresenta o conceito do plano mensal. Condições, cobertura e adesão devem ser confirmadas diretamente com a barbearia nesta fase.",
  },
  {
    question: "O site coleta meu nome, telefone ou outros dados?",
    answer:
      "Não. Nesta fase não há formulário, conta, banco de dados ou backend. Os contatos acontecem pelos serviços externos indicados na página.",
  },
  {
    question: "O que será desenvolvido depois da aprovação?",
    answer:
      "A evolução prevista inclui agendamento online, disponibilidade de profissionais, serviços com múltiplas janelas, grupos, plano mensal, Pix e automações com n8n.",
  },
];

export function FaqSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="section__heading">
        <span className="eyebrow">Dúvidas frequentes</span>
        <h2 id="faq-title">O que já está nesta prévia e o que vem depois</h2>
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
