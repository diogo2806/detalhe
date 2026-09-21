import { Instagram } from "lucide-react";

const photos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDodstt0tJqtuiyAuoH0sV7TCvZBPZZamUYyFyMb31-qGZMM143_luxfp09FJqFmeB1W5wPl_wdKZ7BHLins7LouyN8RY4tUQN5ykkN2t_m6AlkFxh-fJ_tnZvTtxQc5JG3ANiDiQn3bjWX_4f3_3-OkAxDHr32mSqzq7m-MuWL3GUU6lIVOZ85uG1v9EA__fgTHA3iedy_qsWZl79Gek6jv1WZM9seIn6Aj8l20hMeKrjnndSHg996ZbXrzomL_6qAeNk",
    alt: "Corte degradê lateral com barba alinhada",
    label: "Degradê + barba",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAvj4eIv5iKbLv4lmXt3_GNd-sxdYYYN8-RLEcrREoEPwGYBHy5ubgZvOdLxpgVHDfnJohFcyg70ZDIj8AiofHb5_8qIq-RxtEUMmfrGYTkHw8XAbGjq2rJGFb8NxjgCbmi2OdwAsoKZm_8ADJG8Usl-Qt9Wh7jVypHg5dIFL79ptv2MYB_qJOw10tXcZDQtC6OgdSO8EQfMPMr3l8xO_rah6SQepGUBqBsQbGadnlC5XVzOQ7KvK8RPFpIIaU2PS9q38",
    alt: "Perfilamento frontal com acabamento preciso",
    label: "Alinhamento na régua",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJLKBboiujPecY3DRRXUJSaHEtqiCqCvjUtTH00Uo6SB4D_5sX8gf-cuMtNmNhz9pY9adYXJFpSUKM9gzGYFvxRKSTKCjP3Q4JnHEr_JG_puHnuznKA0sJPYZn2CamPn3aptwu6QHFivUJcAj_0p9tattdmgrh1mu7m9nLYufxzTa55YfhaFzvMF_9-_FTi_865jsWLXrcD1gSfHsj4xry1HakZnZ_oYSWaEoDnm8nijWKENKQO8DVZVOj61EL64btuuo",
    alt: "Corte fade lateral com topo longo",
    label: "Fade lateral",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBenffrXRkkG1vqGrAYi7oonR9-SuDDsV-REJgdn3LYLdWGALe9EUUPcFKQHqNRYYCz4fAy0ZbKT4_7_Xu4XoNZDu3jdcuVm4ni3AA7pg7vnNb0fGu0Y6rYNLHERXJzxDzYRjm6irJ9wYgju1KkHKuvZsI24Gj8-Jvjnpzihc6Ng21Y89ZTAzH-7tkggw9ZzAESVW7G1j0lf2nw2Phj_yetI5EVPpvOy0rcfucMfrP926YDZzDmrKfxlf5JmbIkuK5Rb6o",
    alt: "Corte moderno taper fade",
    label: "Taper social",
  },
];

export function GallerySection() {
  return (
    <section className="section" id="trabalhos" aria-labelledby="trabalhos-title">
      <div className="section__heading section__heading--split">
        <div>
          <span className="eyebrow">Trabalhos reais</span>
          <h2 id="trabalhos-title">O detalhe aparece no resultado</h2>
        </div>
        <a
          className="text-link"
          href="https://www.instagram.com/barbeariadodetalhe/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram aria-hidden="true" size={18} />
          Ver Instagram
        </a>
      </div>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <figure className="gallery-card" key={photo.label}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
