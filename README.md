# Barbearia do Detalhe

Projeto da experiência digital da Barbearia do Detalhe, em Itaguaí/RJ.

## Fase 1 — validação comercial

A primeira fase contém somente um frontend estático de apresentação, sem backend e sem persistência.

Objetivos desta fase:

- apresentar a identidade e a proposta do novo site;
- exibir serviços e preços;
- apresentar o conceito do plano mensal;
- mostrar trabalhos reais;
- facilitar contato por WhatsApp, Instagram e Google Maps;
- permitir que o cliente valide o visual e a proposta antes do desenvolvimento do sistema completo.

Nesta fase não existe:

- criação de agendamento;
- consulta de agenda;
- seleção real de profissional;
- autenticação;
- área do assinante;
- cobrança;
- Pix gerado pelo sistema;
- integração com n8n;
- banco de dados;
- API backend.

Os botões de contato usam links externos e o agendamento online é apresentado como funcionalidade de uma fase posterior.

## Próximas fases previstas

Após aprovação comercial, o sistema poderá evoluir para:

- agendamento online;
- serviços que ocupam uma ou mais janelas de tempo;
- agendamento em grupo, inclusive com necessidade de vários profissionais simultaneamente;
- gestão de profissionais e disponibilidade;
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
