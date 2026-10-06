export const BRAND = '#336699';

export const images = {
  hero: '/images/lobby.jpg',
  servicesHero: '/images/treatment-room.jpg',
  physio: '/images/physio-session.jpg',
  teamHero: '/images/team-group.jpg',
  booking: '/images/consultation.jpg',
  primary: '/images/consultation.jpg',
  physioCard: '/images/physio-session.jpg',
  derma: '/images/derma.jpg',
  lobby: '/images/lobby.jpg',
  consultation: '/images/consultation.jpg',
  doctorF: '/images/doctor-f.jpg',
  doctorM: '/images/doctor-m.jpg',
  teamGroup: '/images/team-group.jpg',
  treatment: '/images/treatment-room.jpg',
  wellness: '/images/wellness.jpg',
  mountains: '/images/treatment-room.jpg',
};

export const services = [
  { slug: 'primary-care', image: images.primary, icon: '🩺' },
  { slug: 'physiotherapy', image: images.physioCard, icon: '🏃' },
  { slug: 'dermatology', image: images.derma, icon: '✨' },
  { slug: 'womens-health', image: images.wellness, icon: '💙' },
] as const;

export type ServiceSlug = (typeof services)[number]['slug'];

export const team = [
  {
    id: 'camille',
    name: { en: 'Dr. Camille Roy', fr: 'Dre Camille Roy' },
    role: { en: 'General medicine', fr: 'Médecine générale' },
    image: images.doctorF,
    dept: 'medical',
  },
  {
    id: 'marc',
    name: { en: 'Dr. Marc Lefebvre', fr: 'Dr Marc Lefebvre' },
    role: { en: 'Physiotherapy', fr: 'Physiothérapie' },
    image: images.doctorM,
    dept: 'physio',
  },
  {
    id: 'sophie',
    name: { en: 'Dr. Sophie Nguyen', fr: 'Dre Sophie Nguyen' },
    role: { en: 'Dermatology', fr: 'Dermatologie' },
    image: images.derma,
    dept: 'derma',
  },
  {
    id: 'james',
    name: { en: 'Dr. James Okonkwo', fr: 'Dr James Okonkwo' },
    role: { en: 'Primary care', fr: 'Soins primaires' },
    image: images.doctorM,
    dept: 'medical',
  },
] as const;

/** Demo-only contact details — not a real clinic location. */
export const mockContact = {
  phone: '+1 (555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'hello@clinique-elan.demo',
  address: {
    en: '123 Wellness Avenue, Demo City, QC H0H 0H0',
    fr: '123, avenue du Bien-être, Ville Démo, QC H0H 0H0',
  },
  demoNote: {
    en: 'Sample contact details for demonstration only.',
    fr: 'Coordonnées fictives à des fins de démonstration seulement.',
  },
};

export const timeSlots = [
  '09:00',
  '09:45',
  '10:30',
  '11:15',
  '13:00',
  '14:30',
  '15:15',
  '16:00',
];
