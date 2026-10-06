export type Lang = 'en' | 'fr';

type Dict = Record<string, { en: string; fr: string }>;

const dict: Dict = {
  brand: { en: 'Clinique Élan', fr: 'Clinique Élan' },
  navHome: { en: 'Home', fr: 'Accueil' },
  navServices: { en: 'Services', fr: 'Services' },
  navTeam: { en: 'Our team', fr: 'Notre équipe' },
  navContact: { en: 'Contact', fr: 'Contact' },
  navBook: { en: 'Book a visit', fr: 'Prendre rendez-vous' },
  navStudio: { en: 'Visual studio', fr: 'Studio visuel' },

  heroEyebrow: { en: 'Your health, our priority', fr: 'Votre santé, notre priorité' },
  heroTitle: { en: 'Care that feels personal.', fr: 'Des soins qui vous ressemblent.' },
  heroLead: {
    en: 'A multidisciplinary clinic for every chapter of life — warm spaces, expert clinicians, and appointments that fit your schedule.',
    fr: 'Une clinique multidisciplinaire pour chaque étape de la vie — espaces chaleureux, experts à l’écoute et rendez-vous adaptés à votre rythme.',
  },
  heroCta: { en: 'Book an appointment', fr: 'Réserver un rendez-vous' },
  heroFeature1: { en: 'Whole-person approach', fr: 'Approche globale' },
  heroFeature2: { en: 'Modern facilities', fr: 'Installations modernes' },
  heroFeature3: { en: 'Same-week availability', fr: 'Disponibilités rapides' },

  ticker1: { en: 'Primary care', fr: 'Médecine générale' },
  ticker2: { en: 'Physiotherapy', fr: 'Physiothérapie' },
  ticker3: { en: 'Dermatology', fr: 'Dermatologie' },
  ticker4: { en: "Women's health", fr: 'Santé des femmes' },
  ticker5: { en: 'Mental wellness', fr: 'Bien-être mental' },
  ticker6: { en: 'Nutrition', fr: 'Nutrition' },

  servicesEyebrow: { en: 'Our services', fr: 'Nos services' },
  servicesTitle: { en: 'A healthier you starts here.', fr: 'Une vie plus saine commence ici.' },
  servicesExplore: { en: 'Explore all services', fr: 'Voir tous les services' },

  approachEyebrow: { en: 'Our approach', fr: 'Notre approche' },
  approachTitle: { en: 'Expert care. Human connection.', fr: 'Expertise clinique. Lien humain.' },
  approachLead: {
    en: 'We combine evidence-based medicine with time to listen — so every visit feels calm, clear, and genuinely yours.',
    fr: 'Nous allions médecine fondée sur les preuves et temps d’écoute — pour des visites calmes, claires et vraiment personnalisées.',
  },
  approachCta: { en: 'Meet our team', fr: 'Rencontrer l’équipe' },

  ctaTitle: { en: 'Book your visit today', fr: 'Réservez votre visite' },

  footerTagline: {
    en: 'Healthier tomorrows, for brighter lives.',
    fr: 'Des lendemains plus sains, pour des vies plus lumineuses.',
  },
  footerRights: { en: 'All rights reserved.', fr: 'Tous droits réservés.' },
  privacy: { en: 'Privacy', fr: 'Confidentialité' },
  terms: { en: 'Terms', fr: 'Conditions' },

  bookEyebrow: { en: 'Book an appointment', fr: 'Prendre rendez-vous' },
  bookTitle: { en: 'Make time for your health.', fr: 'Prenez soin de votre santé.' },
  stepService: { en: 'Service', fr: 'Service' },
  stepSpecialist: { en: 'Specialist', fr: 'Spécialiste' },
  stepDate: { en: 'Date & time', fr: 'Date et heure' },
  stepDetails: { en: 'Your details', fr: 'Vos informations' },
  continue: { en: 'Continue', fr: 'Continuer' },
  confirm: { en: 'Confirm booking', fr: 'Confirmer' },
  success: {
    en: 'Your appointment request has been saved. We will confirm by email shortly.',
    fr: 'Votre demande de rendez-vous a été enregistrée. Nous vous confirmerons par courriel sous peu.',
  },

  contactTitle: { en: 'Need a hand booking?', fr: 'Besoin d’aide pour réserver?' },
  contactLead: {
    en: 'Our care coordinators are happy to help you choose the right service and time.',
    fr: 'Nos coordonnatrices sont là pour vous aider à choisir le bon service et le bon moment.',
  },
  callUs: { en: 'Call us', fr: 'Téléphone' },
  emailUs: { en: 'Email us', fr: 'Courriel' },

  studioTitle: { en: 'Clinic visual studio', fr: 'Studio visuel clinique' },
  studioLead: {
    en: 'Generate branded imagery with a #336699 tint — upload a photo or use clinic presets.',
    fr: 'Générez des visuels de marque avec une teinte #336699 — téléversez une photo ou utilisez nos préréglages.',
  },
  upload: { en: 'Upload image', fr: 'Téléverser une image' },
  download: { en: 'Download', fr: 'Télécharger' },
  overlay: { en: 'Brand overlay', fr: 'Superposition de marque' },
};

export function t(key: keyof typeof dict, lang: Lang): string {
  return dict[key][lang];
}

export function getServiceCopy(slug: string, lang: Lang) {
  const services = getServiceTranslations(lang);
  return services[slug] ?? services['primary-care'];
}

function getServiceTranslations(lang: Lang): Record<
  string,
  { title: string; short: string; long: string; process: string[] }
> {
  if (lang === 'fr') {
    return {
      'primary-care': {
        title: 'Médecine générale',
        short: 'Soins préventifs et suivi personnalisé pour toute la famille.',
        long:
          'Consultations, bilans de santé et gestion des conditions chroniques dans un environnement moderne et rassurant.',
        process: ['Évaluation', 'Plan de soins', 'Suivi'],
      },
      physiotherapy: {
        title: 'Physiothérapie',
        short: 'Retrouvez votre liberté de mouvement avec un plan sur mesure.',
        long:
          'Rééducation, prévention des blessures et thérapies manuelles adaptées à vos objectifs.',
        process: ['Évaluation', 'Plan personnalisé', 'Suivi'],
      },
      dermatology: {
        title: 'Dermatologie',
        short: 'Peau saine, confiance retrouvée — diagnostics et traitements experts.',
        long:
          'Acné, eczéma, dépistage et soins esthétiques médicaux avec technologies douces.',
        process: ['Consultation', 'Traitement', 'Entretien'],
      },
      'womens-health': {
        title: 'Santé des femmes',
        short: 'Accompagnement respectueux à chaque étape de la vie.',
        long: 'Suivi gynécologique, fertilité, ménopause et bien-être holistique.',
        process: ['Écoute', 'Plan', 'Suivi'],
      },
    };
  }
  return {
    'primary-care': {
      title: 'Primary care',
      short: 'Preventive care and personalized follow-up for the whole family.',
      long:
        'Check-ups, chronic condition management, and clear guidance in a calm, modern setting.',
      process: ['Assessment', 'Care plan', 'Follow-up'],
    },
    physiotherapy: {
      title: 'Physiotherapy',
      short: 'Restore movement with hands-on therapy tailored to you.',
      long:
        'Rehabilitation, injury prevention, and manual therapy aligned with your goals.',
      process: ['Assessment', 'Personal plan', 'Progress'],
    },
    dermatology: {
      title: 'Dermatology',
      short: 'Healthy skin and confident care — expert diagnosis and treatment.',
      long:
        'Medical and aesthetic dermatology with gentle, evidence-based protocols.',
      process: ['Consultation', 'Treatment', 'Maintenance'],
    },
    'womens-health': {
      title: "Women's health",
      short: 'Compassionate support through every stage of life.',
      long: 'Gynecology, fertility, menopause, and holistic wellness planning.',
      process: ['Listen', 'Plan', 'Support'],
    },
  };
}
