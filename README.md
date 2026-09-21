# Barbearia do Detalhe

Projeto da experiência digital da Barbearia do Detalhe, em Itaguaí/RJ.

## Fase atual — validação comercial

A fase atual contém somente o frontend para apresentação ao cliente. Não existe backend funcional, banco de dados ou persistência.

Objetivos desta fase:

- apresentar a identidade e a proposta do novo site;
- exibir serviços e preços;
- apresentar o conceito do plano mensal;
- mostrar trabalhos reais;
- facilitar contato por WhatsApp, Instagram e Google Maps;
- demonstrar visualmente o fluxo completo de agendamento;
- permitir comparar quatro paletas de cores diretamente no protótipo;
- permitir que o cliente valide experiência, textos e organização antes do desenvolvimento do núcleo definitivo.

## Demonstração do agendamento

A landing possui uma demonstração interativa de agendamento executada inteiramente no navegador.

O cliente pode visualizar:

- cliente avulso;
- plano mensal;
- agendamento em grupo;
- escolha entre os 11 serviços;
- serviços diferentes por participante do grupo;
- próximos dias de atendimento de terça a sábado;
- grade de horários a cada 15 minutos;
- duração dos serviços sempre em múltiplos de 15 minutos;
- destaque de todas as janelas consumidas pela duração escolhida;
- janelas demonstrativas ocupadas e desabilitadas;
- profissionais disponíveis exibidos em cada janela;
- Barbeiro A, Barbeiro B e Barbeiro C como identificadores explícitos de demonstração;
- validação de um mesmo profissional livre durante toda a duração do serviço;
- validação defensiva de que o barbeiro atribuído está disponível em cada janela selecionada;
- separação entre barbeiros livres no bloco e barbeiros que permanecem livres por toda a duração;
- cartões válidos mostram a disponibilidade daquela janela e, separadamente, quem pode iniciar o serviço completo;
- janelas sem continuidade suficiente mostram quem está livre naquele bloco e ficam desabilitadas como início;
- seleção usa estado verde, indisponibilidade parcial usa âmbar e horário ocupado usa vermelho;
- botão Continuar desabilitado enquanto não houver um horário válido selecionado;
- bloqueio visual do almoço entre 12:00 e 13:00;
- respeito à duração do serviço para não ultrapassar almoço ou fechamento;
- preenchimento de nome e WhatsApp com máscara brasileira `(DD) 9XXXX-XXXX`;
- validação de DDD brasileiro e número móvel iniciado por `9`;
- resumo antes da confirmação;
- reposicionamento automático no bloco de agendamento ao avançar ou voltar entre etapas;
- foco no título da nova etapa para manter o contexto também na navegação por teclado;
- aparência do estado de confirmação;
- seletor de paleta no cabeçalho, ao lado do Manual da Tela, sem alterar os dados do agendamento e sem persistência após recarregar a página.

A demonstração **não**:

- consulta disponibilidade real;
- conhece profissionais reais cadastrados;
- reserva horário;
- cria protocolo;
- grava dados;
- usa localStorage;
- chama API;
- envia dados para backend;
- dispara n8n.

Todos os dados digitados existem apenas no estado React da página e desaparecem ao atualizar ou sair do site.

A disponibilidade exibida nesta fase também é apenas demonstrativa. Os identificadores `Barbeiro A`, `Barbeiro B` e `Barbeiro C` não representam pessoas reais. A versão definitiva receberá profissionais, bloqueios e ocupações reais do backend.

A validação desta fase confirma apenas o formato de um número móvel brasileiro. A confirmação de que o número está efetivamente registrado no WhatsApp dependerá da integração futura com o provedor de WhatsApp/n8n. Quando o backend for implementado, o número deverá ser normalizado para o formato internacional antes do envio à automação, por exemplo `+5521975623471`.

## Núcleo definitivo previsto

Após aprovação comercial, o sistema poderá evoluir para:

- backend e persistência;
- serviços parametrizados;
- cadastro de profissionais;
- vínculo profissional × serviço;
- expediente e bloqueios individuais;
- cálculo de disponibilidade real;
- prevenção de conflito e dupla reserva;
- agendamento individual;
- agendamento em grupo com múltiplos profissionais;
- confirmação transacional;
- geração de protocolo;
- plano mensal;
- lembrete de vencimento um dia antes;
- pagamento via Pix;
- confirmação e lembretes por n8n.

## Frontend

O frontend está em `frontend/` e usa React + TypeScript + Vite.

Para executar localmente:

```bash
cd frontend
npm install
npm run dev
```

Para gerar a versão estática:

```bash
npm run build
```

## Deploy

O frontend possui Dockerfile próprio para implantação como App Service no EasyPanel. Não há Docker Compose.

Configuração do domínio do frontend no EasyPanel:

- protocolo de destino: `HTTP`;
- porta de destino: `80`;
- caminho: `/`.

A porta `80` é exclusiva do container do frontend. Quando o backend for criado, ele será implantado como serviço separado e poderá utilizar a porta interna `8080`.
