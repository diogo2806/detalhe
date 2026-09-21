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
- bloqueio visual do almoço entre 12:00 e 13:00;
- respeito à duração do serviço para não ultrapassar almoço ou fechamento;
- preenchimento de nome e telefone/WhatsApp;
- resumo antes da confirmação;
- aparência do estado de confirmação.

A demonstração **não**:

- consulta disponibilidade real;
- conhece profissionais cadastrados;
- reserva horário;
- cria protocolo;
- grava dados;
- usa localStorage;
- chama API;
- envia dados para backend;
- dispara n8n.

Todos os dados digitados existem apenas no estado React da página e desaparecem ao atualizar ou sair do site.

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
