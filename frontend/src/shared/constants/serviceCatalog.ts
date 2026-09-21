export type ServiceDefinition = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
};

export const SERVICES: ServiceDefinition[] = [
  { id: "corte-maquina-tesoura", name: "Corte máquina & tesoura", price: 40, durationMinutes: 45 },
  { id: "corte-navalhado", name: "Corte navalhado", price: 40, durationMinutes: 45 },
  { id: "corte-maquina", name: "Corte máquina", price: 35, durationMinutes: 45 },
  { id: "so-barba", name: "Só barba", price: 20, durationMinutes: 30 },
  { id: "pezinho", name: "Pezinho", price: 10, durationMinutes: 15 },
  { id: "sobrancelha", name: "Sobrancelha", price: 10, durationMinutes: 15 },
  { id: "corte-barba", name: "Corte & barba", price: 55, durationMinutes: 45 },
  {
    id: "corte-barba-sobrancelha",
    name: "Corte, barba & sobrancelha",
    price: 55,
    durationMinutes: 45,
  },
  { id: "corte-pigmentacao", name: "Corte + pigmentação", price: 45, durationMinutes: 45 },
  { id: "nevou-corte", name: "Nevou + corte", price: 100, durationMinutes: 60 },
  { id: "reflexo-corte", name: "Reflexo alinhado + corte", price: 110, durationMinutes: 90 },
];
