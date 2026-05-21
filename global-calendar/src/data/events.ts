// Données de démonstration utilisées uniquement pour amorcer SQLite
// (cf. `src/lib/db.ts`). Trois comptes (Amaury, Goulven, Loris) sont
// créés avec le mot de passe "000000", puis chaque évènement ci-dessous
// est inséré dans la table correspondante :
//
//   - "private"            -> private_events, lié à `owner`
//   - "shared-public"      -> shared_events (visibility='public')
//   - "shared-restricted"  -> shared_events (visibility='private')
//                             + shared_event_participants pour chaque
//                               nom dans `participants`

export type SeedUser = { name: string; password: string };

type BaseSeedEvent = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
};

type PrivateSeedEvent = BaseSeedEvent & {
  kind: "private";
  owner: string;
};

type SharedPublicSeedEvent = BaseSeedEvent & {
  kind: "shared-public";
  creator: string;
};

type SharedRestrictedSeedEvent = BaseSeedEvent & {
  kind: "shared-restricted";
  creator: string;
  participants: string[];
};

export type SeedEvent =
  | PrivateSeedEvent
  | SharedPublicSeedEvent
  | SharedRestrictedSeedEvent;

export const seedUsers: SeedUser[] = [
  { name: "Amaury", password: "000000" },
  { name: "Goulven", password: "000000" },
  { name: "Loris", password: "000000" },
];

export const seedEvents: SeedEvent[] = [
  // --- Évènements privés (6) : 2 par utilisateur ----------------------
  {
    id: 1,
    kind: "private",
    owner: "Amaury",
    title: "Sport matinal",
    date: "2026-05-18",
    startTime: "07:00",
    endTime: "08:00",
    description: "Footing au parc avant la journée.",
  },
  {
    id: 2,
    kind: "private",
    owner: "Amaury",
    title: "Lecture du soir",
    date: "2026-05-23",
    startTime: "21:00",
    endTime: "22:00",
    description: "Chapitre du roman en cours.",
  },
  {
    id: 3,
    kind: "private",
    owner: "Goulven",
    title: "Rendez-vous médecin",
    date: "2026-05-19",
    startTime: "14:00",
    endTime: "15:00",
    description: "Consultation annuelle.",
  },
  {
    id: 4,
    kind: "private",
    owner: "Goulven",
    title: "Cours de guitare",
    date: "2026-05-21",
    startTime: "18:00",
    endTime: "19:00",
    description: "Répétition hebdomadaire.",
  },
  {
    id: 5,
    kind: "private",
    owner: "Loris",
    title: "Révision examens",
    date: "2026-05-20",
    startTime: "20:00",
    endTime: "22:00",
    description: "Préparation du partiel de mathématiques.",
  },
  {
    id: 6,
    kind: "private",
    owner: "Loris",
    title: "Cuisine du dimanche",
    date: "2026-05-24",
    startTime: "11:00",
    endTime: "13:00",
    description: "Batch cooking pour toute la semaine.",
  },

  // --- Évènements partagés publics (4) --------------------------------
  {
    id: 7,
    kind: "shared-public",
    creator: "Amaury",
    title: "Pause café ouverte",
    date: "2026-05-18",
    startTime: "10:00",
    endTime: "10:30",
    description: "Pause café ouverte à tout le monde.",
  },
  {
    id: 8,
    kind: "shared-public",
    creator: "Goulven",
    title: "Démo produit v2",
    date: "2026-05-22",
    startTime: "14:00",
    endTime: "15:00",
    description: "Démonstration publique des nouveautés de la v2.",
  },
  {
    id: 9,
    kind: "shared-public",
    creator: "Loris",
    title: "Conférence LLM",
    date: "2026-05-26",
    startTime: "13:00",
    endTime: "14:00",
    description: "Présentation sur les modèles de langage, ouverte à tous.",
  },
  {
    id: 10,
    kind: "shared-public",
    creator: "Amaury",
    title: "Apéro de fin de sprint",
    date: "2026-05-29",
    startTime: "18:00",
    endTime: "20:00",
    description: "Tout le monde est le bienvenu pour clôturer le sprint.",
  },

  // --- Partagés avec un seul participant (6) --------------------------
  {
    id: 11,
    kind: "shared-restricted",
    creator: "Amaury",
    participants: ["Goulven"],
    title: "Point projet calendrier",
    date: "2026-05-19",
    startTime: "10:00",
    endTime: "11:00",
    description: "Synchronisation hebdomadaire sur le projet.",
  },
  {
    id: 12,
    kind: "shared-restricted",
    creator: "Goulven",
    participants: ["Amaury"],
    title: "Revue de code auth",
    date: "2026-05-20",
    startTime: "09:00",
    endTime: "10:00",
    description: "Relecture de la PR sur l'authentification.",
  },
  {
    id: 13,
    kind: "shared-restricted",
    creator: "Loris",
    participants: ["Amaury"],
    title: "Onboarding outils",
    date: "2026-05-21",
    startTime: "11:00",
    endTime: "12:00",
    description: "Tour d'horizon des outils internes.",
  },
  {
    id: 14,
    kind: "shared-restricted",
    creator: "Goulven",
    participants: ["Loris"],
    title: "Atelier design UI",
    date: "2026-05-25",
    startTime: "15:00",
    endTime: "17:00",
    description: "Maquettes pour la prochaine fonctionnalité.",
  },
  {
    id: 15,
    kind: "shared-restricted",
    creator: "Amaury",
    participants: ["Loris"],
    title: "Coaching TypeScript",
    date: "2026-05-27",
    startTime: "16:00",
    endTime: "17:00",
    description: "Bonnes pratiques et patterns avancés.",
  },
  {
    id: 16,
    kind: "shared-restricted",
    creator: "Loris",
    participants: ["Goulven"],
    title: "Préparation soutenance",
    date: "2026-05-30",
    startTime: "14:00",
    endTime: "16:00",
    description: "Répétition complète de la présentation.",
  },

  // --- Partagés avec deux participants (4) ----------------------------
  {
    id: 17,
    kind: "shared-restricted",
    creator: "Amaury",
    participants: ["Goulven", "Loris"],
    title: "Réunion d'équipe",
    date: "2026-05-18",
    startTime: "14:00",
    endTime: "15:00",
    description: "Kickoff de la semaine, tous les sujets en cours.",
  },
  {
    id: 18,
    kind: "shared-restricted",
    creator: "Goulven",
    participants: ["Amaury", "Loris"],
    title: "Brainstorming roadmap",
    date: "2026-05-22",
    startTime: "10:00",
    endTime: "12:00",
    description: "Idées à explorer pour le prochain trimestre.",
  },
  {
    id: 19,
    kind: "shared-restricted",
    creator: "Loris",
    participants: ["Amaury", "Goulven"],
    title: "Déjeuner d'équipe",
    date: "2026-05-28",
    startTime: "12:30",
    endTime: "14:00",
    description: "Restaurant à côté du bureau, sur réservation.",
  },
  {
    id: 20,
    kind: "shared-restricted",
    creator: "Amaury",
    participants: ["Goulven", "Loris"],
    title: "Rétrospective de sprint",
    date: "2026-05-31",
    startTime: "11:00",
    endTime: "12:00",
    description: "Bilan, points positifs et axes d'amélioration.",
  },
];
