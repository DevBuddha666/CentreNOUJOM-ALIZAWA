import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FiEdit3,
  FiEye,
  FiFilm,
  FiGlobe,
  FiMic,
  FiMusic,
  FiRadio
} from 'react-icons/fi';
import HeroCarousel from '../components/hero/HeroCarousel';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroCarousel />

      {/* Introduction Section */}
      <section className="intro-section" id="intro">
        <div className="container">
          <h2 className="section-title">Qui sommes-nous?</h2>
          <p className="intro-text">
            Le Centre culturel Les Étoiles du Souss, porté par la Fondation Ali Zaoua, a pour mission de favoriser l'accès aux arts et à la culture auprès des jeunes issus de milieux défavorisés. En offrant un espace structurant, inclusif et créatif, le centre vise à contribuer à leur insertion identitaire, sociale et professionnelle, tout en révélant les talents émergents dans les domaines artistiques et culturels.
          </p>

          <div className="mission-vision-values">
            <div className="info-card card-corner-fill">
              <h3>Notre mission</h3>
              <p>Le Centre culturel Les Étoiles du Souss, porté par la Fondation Ali Zaoua, a pour mission de favoriser l'accès aux arts et à la culture auprès des jeunes issus de milieux défavorisés. En offrant un espace structurant, inclusif et créatif, le centre vise à contribuer à leur insertion identitaire, sociale et professionnelle, tout en révélant les talents émergents dans les domaines artistiques et culturels.</p>
            </div>

            <div className="info-card card-corner-fill">
              <h3>Notre vision</h3>
              <p>Nous portons l'ambition de développer un réseau national de centres culturels de proximité, appuyé par une plateforme numérique de formation. Cette vision s'inscrit dans la volonté de faire émerger une nouvelle génération d'acteurs culturels, en faisant du centre un outil d'apprentissage, d'émancipation et d'innovation sociale.</p>
            </div>

            <div className="info-card card-corner-fill">
              <h3>Nos valeurs</h3>
              <ul>
                <li><strong>Mixité :</strong> en encourageant la diversité sociale, de genre et générationnelle dans tous les projets.</li>
                <li><strong>Proximité :</strong> en assurant une présence dans les quartiers, au plus proche des populations, avec une offre culturelle ancrée dans les réalités locales.</li>
                <li><strong>Professionnalisme :</strong> en garantissant la qualité des contenus, des intervenants, et de l'encadrement pédagogique.</li>
              </ul>
            </div>
          </div>

          <div className="partnership-section">
            <div className="partnership-section__head">
              <h3 className="partnership-title">Une dynamique de partenariat avec l&apos;INDH</h3>
            </div>
            <p className="partnership-text">
              Le Centre Les Étoiles du Souss, inauguré en 2019 dans le quartier Hay El Farah à Agadir, est le fruit d'un partenariat stratégique entre la Fondation Ali Zaoua, la Wilaya d'Agadir et l'Initiative Nationale pour le Développement Humain (INDH). Ce partenariat exemplaire entre secteur associatif, institutionnel et privé a permis la création et la pérennisation d'un espace culturel de référence dans la région du Souss-Massa.
            </p>
            <p className="partnership-text">
              L'INDH joue un rôle essentiel dans la réalisation des objectifs sociaux et éducatifs du centre, en soutenant son fonctionnement à travers des subventions structurantes. Ce soutien permet de garantir l'accessibilité financière des activités, de mobiliser des intervenants qualifiés, et de déployer une programmation continue, malgré les contraintes budgétaires ou conjoncturelles.
            </p>
          </div>

          <div className="services-grid">
            <ServiceCard
              icon={<FiFilm size={32} className="service-card__icon-svg" aria-hidden />}
              title="Arts & Scène"
              description="Ateliers de théâtre, danse, musique et arts plastiques dispensés par des professionnels"
            />
            <ServiceCard
              icon={<FiGlobe size={32} className="service-card__icon-svg" aria-hidden />}
              title="Langues étrangères"
              description="Cours d'anglais, français, espagnol et autres langues pour tous les niveaux"
            />
            <ServiceCard
              icon={<FiRadio size={32} className="service-card__icon-svg" aria-hidden />}
              title="Diffusion artistique"
              description="Spectacles, concerts, expositions et événements culturels tout au long de l'année"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Notre histoire</h2>
          <div className="timeline">
            <TimelineItem 
              year="2014"
              title="Les Étoiles de Sidi Moumen"
              description="Ouverture du centre à Casablanca"
            />
            <TimelineItem 
              year="2017"
              title="Les Étoiles du Détroit"
              description="Inauguration du centre à Tanger dans le quartier de Béni Makada"
            />
            <TimelineItem 
              year="2019"
              title="Les Étoiles du Souss"
              description="Ouverture du centre à Agadir dans le quartier de Hay El Farah"
            />
            <TimelineItem 
              year="2020"
              title="Les Étoiles de la Médina"
              description="Création du centre à Fès"
            />
            <TimelineItem 
              year="2021"
              title="Les Étoiles de Jamaâ El Fna"
              description="Lancement du centre à Marrakech"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Galerie d'images</h2>
          <div className="gallery-grid">
            <GalleryItem image="https://artmap.ma/wp-content/uploads/2026/03/Centre-Culturel-Les-Etoiles-6.webp" alt="Classe d'arts" />
            <GalleryItem image="https://artmap.ma/wp-content/uploads/2026/03/Centre-Culturel-Les-Etoiles-3.webp" alt="Concert" />
            <GalleryItem image="https://artmap.ma/wp-content/uploads/2026/03/Centre-Culturel-Les-Etoiles-2.webp" alt="Réunion" />
            <GalleryItem image="https://imgs.search.brave.com/5u-IQ4lnmUK5_OeXG0_8ZnCh4khpKdqPOhoXdoo8tew/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXRoZXF1ZXMuYm9y/ZGVhdXgtbWV0cm9w/b2xlLmZyL3NpdGVz/L3BvcnRhaWwtYmli/bGlvdGhlcXVlL2Zp/bGVzL3N0eWxlcy9i/aWJsaW8vcHVibGlj/L2ltYWdlcy9jYXJv/dXNlbC9lc3BhY2Ut/YmQuanBnP2l0b2s9/eHpJd0pmV2M" alt="Atelier" />
            <GalleryItem image="https://imgs.search.brave.com/QJXob12PuqfuW0eoz8py2FwVMQrkBJ7Eh7_HwHnnEos/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY3Rp/dml0eXoubWEvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDQv/bGVzZXRvaWxlc21h/cm9jXzE3MzQzNTMy/MzFfMzUyNDMzMjc5/NTE0MzM2ODQxNl8x/MzA1NjE0NTIwLndl/YnA" alt="Performance" />
            <GalleryItem image="https://imgs.search.brave.com/s_KYNAXgAfYJuiOPzglZI_mDYrfwE1ToBFLttIyER88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY3Rp/dml0eXoubWEvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDQv/bGVzZXRvaWxlc21h/cm9jXzE3NDQxMjU1/ODBfMzYwNjMwOTIx/MDE3NTIzMTMyNl8x/MzA1NjE0NTIwLndl/YnA" alt="Étudiant" />
            <GalleryItem image="https://imgs.search.brave.com/AcFy0_GKakVexRAwOxmzrMfecahHttx28LPYlM5kGMY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY3Rp/dml0eXoubWEvd3At/Y29udGVudC91cGxv/YWRzLzIwMjUvMDQv/bGVzZXRvaWxlc21h/cm9jXzE3NDM3Njc1/MTJfMzYwMzMwNTUx/Nzc3NTE1MjAwOV8x/MzA1NjE0NTIwLndl/YnA" alt="Étudiant" />
            <GalleryItem image="https://activityz.ma/wp-content/uploads/2025/04/lesetoilesmaroc_1734518514_3525719297994823314_1305614520-1024x683.webp" alt="Les arts" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Témoignages d'artistes</h2>
          <div className="testimonials-carousel">
            <TestimonialItem
              name="Salima Moumni"
              discipline="Danseuse contemporaine"
              quote="Le centre m'a offert une plateforme pour exprimer ma créativité et rencontrer d'autres passionnés."
              avatar={<FiMic size={36} className="testimonial-avatar__icon" aria-hidden />}
            />
            <TestimonialItem
              name="Khalil Mokhlis"
              discipline="Acteur de théâtre"
              quote="Les cours ici ont transformé ma compréhension du jeu d'acteur et ma confiance sur scène."
              avatar={<FiFilm size={36} className="testimonial-avatar__icon" aria-hidden />}
            />
            <TestimonialItem
              name="Saïd Chraibi"
              discipline="Musicienne (Oud)"
              quote="Transmettre la musique traditionnelle aux jeunes générations est un privilège offert par ce centre."
              avatar={<FiMusic size={36} className="testimonial-avatar__icon" aria-hidden />}
            />
            <TestimonialItem
              name="Mohamed Hamidi"
              discipline="Artiste plasticien"
              quote="L'environnement créatif et les mentors expérimentés font toute la différence."
              avatar={<FiEdit3 size={36} className="testimonial-avatar__icon" aria-hidden />}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className={`service-card card-corner-fill ${inView ? 'in-view' : ''}`}>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const TimelineItem = ({ year, title, description }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className={`timeline-item ${inView ? 'in-view' : ''}`}>
      <div className="timeline-marker">
        <div className="timeline-dot"></div>
      </div>
      <div className="timeline-content">
        <span className="timeline-year">{year}</span>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

const GalleryItem = ({ image, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="gallery-item card-corner-fill" onClick={() => setIsOpen(true)}>
        <img src={image} alt={alt} />
        <div className="gallery-overlay">
          <FiEye size={22} aria-hidden />
        </div>
      </div>
      {isOpen && (
        <div className="lightbox" onClick={() => setIsOpen(false)}>
          <img src={image} alt={alt} />
        </div>
      )}
    </>
  );
};

const TestimonialItem = ({ name, discipline, quote, avatar }) => {
  return (
    <div className="testimonial-item card-corner-fill">
      <div className="testimonial-avatar">{avatar}</div>
      <p className="testimonial-quote">"{quote}"</p>
      <h4 className="testimonial-name">{name}</h4>
      <p className="testimonial-discipline">{discipline}</p>
    </div>
  );
};

export default HomePage;
