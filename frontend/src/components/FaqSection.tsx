const faqItems = [
  {
    question: "Como faço para agendar pelo site?",
    answer:
      "Escolha a modalidade, o serviço, a data e um horário disponível. Depois, informe seus dados, confira o resumo e confirme o agendamento.",
  },
  {
    question: "Como funcionam os horários disponíveis?",
    answer:
      "A agenda considera a duração do serviço e os profissionais disponíveis durante todo o atendimento. Antes da confirmação, o horário é validado novamente para evitar conflitos.",
  },
  {
    question: "Posso agendar para mais de uma pessoa?",
    answer:
      "Sim. No agendamento em grupo, adicione os participantes, escolha o serviço de cada pessoa e selecione um horário com profissionais disponíveis para atender todo o grupo.",
  },
  {
    question: "Como funciona o plano mensal?",
    answer:
      "Ao escolher Plano mensal, o sistema verifica o plano ativo e os serviços incluídos. Se houver algum valor adicional, ele será informado antes da confirmação.",
  },
  {
    question: "Como recebo a confirmação do agendamento?",
    answer:
      "Depois de confirmar, a tela apresenta os dados do atendimento e a confirmação também é enviada para o WhatsApp informado.",
  },
  {
    question: "O que acontece se o horário não estiver mais disponível?",
    answer:
      "A disponibilidade é conferida novamente no momento da confirmação. Se o horário tiver sido ocupado, você será avisado e poderá escolher outro.",
  },
];

export function FaqSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="section__heading">
        <span className="eyebrow">Dúvidas frequentes</span>
        <h2 id="faq-title">Tudo o que você precisa saber para agendar</h2>
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
