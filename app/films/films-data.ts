export type FilmCategory = 'featured' | 'assistant'

export type Credit = {
  label: string
  value: string
}

export type Film = {
  id: string
  title: string
  role: string
  type?: string
  year: string
  production: string
  category: FilmCategory
  gradient: string
  credits: Credit[]
  summary?: string
  videoUrl?: string
  // Optional label, e.g. 'Upcoming', shown as a pill in the list and detail.
  tag?: string
  inactive?: boolean
}

// Temp: projects before this date without a videoUrl appear muted in the list.
const TEMP_VIDEO_CUTOFF = new Date('2026-08-01')

export function isFilmInactive(film: Film): boolean {
  if (film.inactive) return true
  if (film.videoUrl) return false

  const year = Number(film.year)
  if (Number.isNaN(year)) return false

  // Year-only entries: treat as 1 Jan of that year for the cutoff check.
  return new Date(year, 0, 1) < TEMP_VIDEO_CUTOFF
}

const gradients = [
  'linear-gradient(135deg, #8fb4d6 0%, #c9a86f 55%, #6d7a52 100%)',
  'linear-gradient(135deg, #2b3a55 0%, #4a6d8c 60%, #a7c5d8 100%)',
  'linear-gradient(135deg, #d68f8f 0%, #b06a94 55%, #574066 100%)',
  'linear-gradient(135deg, #f0c04a 0%, #e0863f 55%, #a5461f 100%)',
  'linear-gradient(135deg, #7a8b6f 0%, #4f6d5c 55%, #2c3b34 100%)',
  'linear-gradient(135deg, #b7b2a6 0%, #8a8578 55%, #55514a 100%)',
  'linear-gradient(135deg, #3a3f47 0%, #6b7784 55%, #c3ccd4 100%)',
  'linear-gradient(135deg, #e7b7c8 0%, #c78fae 55%, #6f4f74 100%)',
  'linear-gradient(135deg, #5a7d8c 0%, #8fb0bb 55%, #d8e4e7 100%)',
  'linear-gradient(135deg, #4b3f6b 0%, #7a6aa8 55%, #c2b6e0 100%)',
  'linear-gradient(135deg, #c86b5a 0%, #d99f6c 55%, #efd9a6 100%)',
  'linear-gradient(135deg, #3f5e57 0%, #6f9488 55%, #b9d2c7 100%)',
]

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function credit(label: string, value?: string): Credit[] {
  return value && value.trim() ? [{ label, value: value.trim() }] : []
}

function byYearDesc<T extends { year: string }>(a: T, b: T) {
  return Number(b.year) - Number(a.year)
}

type DopEntry = {
  title: string
  // Your role on the film. Defaults to 'DP'; override per-entry
  // with e.g. 'Director', 'Director / DP', 'Editor'.
  role?: string
  // Kind of project, e.g. 'Music Video', 'Commercial', 'Short'.
  type?: string
  production: string
  service?: string
  director: string
  year: string
  notes?: string
  // Full YouTube or Vimeo watch URL; embedded in the detail view.
  videoUrl?: string
  // Additional credit rows shown in the detail view after the standard fields.
  extraCredits?: Credit[]
  tag?: string
}

const dopEntries: DopEntry[] = [
  {
    title: 'The Glass That Cuts Between',
    tag: 'Upcoming',
    type: 'Short film',
    role: 'DP',
    production: 'Independent',
    director: 'Raya van der Laan',
    year: '2026',
    notes: 'Upcoming',
  },
  {
    title: 'Sissy Smut vol. 1-3',
    type: 'Live Event',
    role: 'Editor',
    production: 'Vitium',
    director: 'Matt Lambert',
    year: '2024',
    videoUrl: 'https://vimeo.com/1114937661',
  },
  {
    title: 'Gristoma',
    type: 'Short',
    production: 'Independent',
    director: 'Raya van der Laan',
    year: '2022',
    notes: 'Upcoming',
  },
  {
    title: 'Humana Vintage SS21',
    type: 'Fashion',
    production: 'Ekspromtu',
    director: 'Aneta Makavičiūtė',
    year: '2021',
  },
  {
    title: 'Neoline Scooters - TVC',
    type: 'Commercial',
    production: 'Ekspromtu',
    director: 'Rimvydas Ardickas',
    year: '2021',
  },
  {
    title: 'Rielle & Kresto - Alive',
    type: 'Music Video',
    production: 'Ekspromtu',
    director: 'Gabrielė Žemaitytė',
    year: '2021',
  },
  {
    title: 'jautì - Mamai',
    type: 'Music Video',
    production: 'Independent',
    director: 'Džiugas Šėma',
    year: '2021',
  },
  {
    title: 'Sudužo (Short)',
    type: 'Short',
    production: 'Skalvija',
    director: 'Benas Paliukas',
    year: '2020',
  },
  {
    title: 'Ugnės Karvelis gimnazija (Short)',
    type: 'Documentary',
    production: 'Independent',
    director: 'Dovydas Šaudys',
    year: '2018',
    notes: 'Best Documentary Gold & Best Festival Film Bronze, Stop Frame 2015',
  },
]

type CrewEntry = {
  title: string
  role: string
  // Kind of project, e.g. 'Music Video', 'Commercial', 'TVC'.
  type?: string
  production: string
  service?: string
  director: string
  dp?: string
  year: string
  notes?: string
  // Full YouTube or Vimeo watch URL; embedded in the detail view.
  videoUrl?: string
  // Additional credit rows shown in the detail view after the standard fields.
  extraCredits?: Credit[]
  tag?: string
}

// Camera department, Lights, and Production credits from the CV.
const crewEntries: CrewEntry[] = [
  // Camera department
  {
    title: 'Teddy & Nura im Real Talk',
    role: 'DIT',
    production: 'Iconoclast',
    director: 'Joscha Bongard',
    dp: 'Jakob Sinsel',
    year: '2023',
  },
  {
    title: 'Serious Klein - Up',
    role: 'DIT',
    production: 'Iconoclast',
    director: 'Julius Pfeifer',
    dp: 'Louis Lustermann',
    year: '2023',
  },
  {
    title: 'Ennio - Haifischbecken',
    role: 'Spark',
    type: 'Music Video',
    production: 'Orgel',
    director: 'Franck Trozzo Kauagui',
    dp: 'Аnton Beliæv',
    year: '2025',
    extraCredits: [
      { label: 'Gaffer', value: 'Žilvinas Garnelis' },
      { label: 'Spark', value: 'Linus Bart' },
      { label: 'Spark', value: 'Kostiantyn Rohov' },
      { label: 'Spark', value: 'Nestor Dan Carranza' },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=VZFof5yYfAY',
  },
  {
    title: 'BCG - The Future of Business',
    role: 'PA',
    type: 'Commercial',
    production: 'A.F Studio',
    director: 'Anton Tammi',
    dp: 'Pat Aldinger',
    year: '2025',
    videoUrl: 'https://www.youtube.com/watch?v=Amakg1iXf38',
  },
  {
    title: 'Rūpintojėlis',
    type: 'Feature Film',
    role: 'Cam Trainee',
    production: 'Cometos',
    director: 'Jonas Trukanas',
    dp: 'Rokas Šydeikis',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=iBYYUt7xs00',
    extraCredits: [
      { label: 'Production Manager', value: 'Darija Skvarnaviciute' },
      { label: '1st AC', value: 'Martynas Siauciunas' },
      { label: '2nd AC', value: 'Laura Aliukonyte' },
    ],
  },
  {
    title: 'Room 16 (Short)',
    role: '1st AC',
    production: 'Watcher Entertainment',
    director: 'Anthony D. Frederick',
    year: '2022',
  },
  {
    title: 'Jessica Shy',
    role: '1st AC',
    production: 'OpenPlay',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2022',
  },
  {
    title: 'Lucid Dreams (Short)',
    role: '1st AC',
    production: 'Indie',
    director: 'Montis Norvaišis',
    dp: 'Matas Juškaitis',
    year: '2022',
  },
  {
    title: 'Paveikslas (Short)',
    role: '1st AC',
    production: 'LMTA',
    director: 'Viktoras Gineitis',
    dp: 'Jaunius Sarapinas',
    year: '2022',
  },
  {
    title: 'Pasiaiškinimas (Short)',
    role: '1st AC',
    production: 'LMTA',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2021',
  },
  {
    title: 'Rimvis - Bailys',
    role: '1st AC',
    production: 'Sound Focus',
    director: 'Juozapas Mikulėnas',
    dp: 'Domas Gudaitis',
    year: '2022',
  },
  {
    title: 'Come in the form of Milk',
    type: 'Video Installation',
    role: '1st AC',
    production: 'Kaunas 2022',
    director: 'Karin Pisarikova',
    dp: 'Rimvydas Ardickas',
    year: '2021',
  },
  {
    title: 'Free Finga - Atlanta',
    role: '1st AC',
    production: 'Autostrada',
    director: 'Justinas Vilutis',
    dp: 'Nikolas Verseckas',
    year: '2021',
  },
  {
    title: 'Free Finga - Vien Tik Tu',
    type: 'Music Video',
    role: '1st AC',
    production: 'Autostrada',
    director: 'V.V',
    dp: 'Nikolas Verseckas',
    year: '2021',
    videoUrl: 'https://youtu.be/52uKTkdKac0?si=6osvpBMrJ00hWQco',
    extraCredits: [
      { label: 'Spark', value: 'Unė Kormilcevaitė' },
      { label: 'Grip', value: 'Ignas Stankus' },
    ],
  },
  {
    title: 'Aš esu (Short)',
    role: '1st AC',
    production: 'LMTA',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2021',
  },
  {
    title: 'Švyturys - Tipit',
    role: '1st AC',
    production: 'Zest',
    director: 'Domas Merkliopas',
    dp: 'Imantas Boiko',
    year: '2021',
  },
  {
    title: 'Dviguba Ekspozicija (Short)',
    role: '1st AC',
    production: 'LMTA',
    director: 'Inesa Marcinkevičiūtė',
    dp: 'Matas Galdikas',
    year: '2021',
  },
  {
    title: 'Hysteria (Short)',
    role: '1st AC',
    production: 'Van Banff Entertainment',
    director: 'Peter Urcheon',
    dp: 'Peter Urcheon',
    year: '2021',
  },
  {
    title: 'Branginu.lt - TVC',
    role: '1st AC',
    production: 'Pixel Studio',
    director: 'Mantas Norkus',
    dp: 'Laurynas Lukoševičius',
    year: '2021',
  },
  {
    title: 'LIDL - Gruziniška virtuvė',
    role: '1st AC',
    production: 'Pixel Studio',
    director: 'Mantas Norkus',
    dp: 'Laurynas Lukoševičius',
    year: '2021',
  },
  {
    title: 'The Hidden Self (Short)',
    role: '1st AC',
    production: 'Independent',
    director: 'Sina Zare',
    dp: 'Rimvydas Ardickas',
    year: '2020',
  },
  {
    title: 'Tai sukelia karą (Short)',
    role: '1st AC',
    production: 'Skalvija',
    director: 'Benas Paliukas',
    dp: 'Oskaras Abramavičius',
    year: '2020',
  },
  {
    title: 'Pogonia (Short)',
    role: '2nd AC',
    production: 'Independent',
    director: 'Simon Soveičik',
    dp: 'Darius Juknevičius',
    year: '2022',
  },
  // Lights
  {
    title: 'Flowers, so many Flowers',
    role: 'Gaffer',
    production: 'Independent',
    director: 'Monika Navickaitė',
    dp: 'Chester Briscall-Harvey',
    year: '2022',
  },
  {
    title: 'lt72 - Branduolinė sauga',
    role: 'Spark',
    production: 'Pick a Story',
    director: 'Emilija Petkūnaitė',
    dp: 'Petras Škukauskas',
    year: '2022',
  },
  {
    title: 'Juoda Juoda Naktis',
    role: 'Spark',
    production: 'LMTA',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2022',
    notes: 'CamerImage 2022',
  },
  {
    title: 'Atgal į laisvę / -15',
    role: 'Spark',
    production: 'Plopsas',
    director: 'Rinaldas Tomaševičius',
    dp: 'Nojus Drąsutis',
    year: '2023',
    videoUrl: 'https://vimeo.com/820251260?fl=pl&fe=vl',
    extraCredits: [
      { label: 'Producer', value: 'Lineta Lasiauskaitė' },
    ],
  },
  {
    title: 'Dviguba Ekspozicija',
    role: 'Spark',
    production: 'LMTA',
    director: 'Inesa Marcinkevičiūtė',
    dp: 'Matas Galdikas',
    year: '2022',
  },
  {
    title: 'Pats brangiausias serialas',
    role: 'Spark',
    production: 'Idée Fixe',
    director: 'Emilis Vėlyvis',
    dp: 'Petras Škukauskas',
    year: '2021',
  },
  {
    title: 'Pasaulis be stiklo',
    type: 'TVC',
    role: 'Spark',
    production: 'Pixel Studio',
    director: 'Mantas Norkus',
    dp: 'Lukas Šalna',
    year: '2021',
    videoUrl: 'https://www.youtube.com/watch?v=DOpOqYzS7hY',
  },
  {
    title: 'Vamzdis (Short)',
    role: 'Spark',
    production: 'LMTA',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2020',
  },
  // Production
  {
    title: 'Kurtis Wells - Higher Self',
    role: 'Producer',
    production: 'Iconoclast',
    director: 'I AM HERE c/o Maik Schuster',
    dp: 'Leander Ott',
    year: '2023',
  },
  {
    title: 'Young Fathers - I Saw',
    role: 'PA',
    production: 'Iconoclast',
    director: 'David Uzochukwu',
    dp: 'Christopher Aoun',
    year: '2022',
  },
  {
    title: 'T-Mobile - The Teacher',
    role: 'PA',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Jonathan Alric',
    dp: 'Paul Özgür',
    year: '2022',
  },
  {
    title: 'Coca Cola - That Moment When',
    role: 'PA',
    production: 'Birth',
    service: 'The Magic',
    director: 'Valentin Guiod',
    dp: 'Olan Collardy',
    year: '2022',
  },
  {
    title: 'Vinted - The Difference',
    role: 'Runner',
    production: 'Karuselė',
    director: 'Thor Saevarsson',
    dp: 'David Wright',
    year: '2022',
  },
  {
    title: 'Panzani - Les meilleures pâtes',
    role: 'PA',
    production: 'Ogilvy Paris',
    service: 'The Magic',
    director: 'Gregoris Rentis',
    dp: 'Ioannis Georgiou',
    year: '2022',
  },
  {
    title: 'apo.com',
    role: 'PA',
    production: 'Sterntag',
    service: 'The Magic',
    director: 'Nicolina Knapp',
    dp: 'Anna Smoroňová',
    year: '2022',
  },
  {
    title: 'Under Armour - The Only Way Is Through',
    role: 'Runner',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Amara Abbas',
    dp: 'Jacob Møller',
    year: '2021',
  },
  {
    title: 'Celio - Be Normal',
    role: 'PA',
    production: 'Caviar',
    service: 'The Magic',
    director: 'Cloé Bailly',
    dp: 'Lucas Casanovas',
    year: '2021',
  },
  {
    title: 'Telia - Rollover',
    role: 'Runner',
    production: 'Somefilms',
    director: 'Titas Sūdžius',
    dp: 'Audrius Budrys',
    year: '2020',
  },
  {
    title: 'Vinski and the Invisibility Powder (Feature)',
    role: 'Runner',
    production: 'Snapper Films',
    service: 'Ahil',
    director: 'Juha Wuolijoki',
    dp: 'Mika Orasmaa',
    year: '2019',
  },
  {
    title: 'Adidas Originals - Athletes of Change',
    type: 'Commercial',
    role: 'PA',
    production: 'Prettybird',
    service: 'The Magic',
    director: 'Matt Lambert',
    dp: 'Nico Niermann',
    year: '2019',
    videoUrl: 'https://vimeo.com/485702429?fl=pl&fe=sh',
    extraCredits: [
      { label: 'Agency', value: 'Johannes Leonardo' },
      { label: 'Creative Directors', value: 'Jeph Burton & Hunter Hampton' },
      { label: 'Copywriter', value: 'Adam Van Dusen' },
      { label: 'Art Director', value: 'Benson Rong' },
      { label: 'Producer', value: 'Alex Olivo' },
    ],
  },
  {
    title: 'Young Wallander - Netflix',
    role: 'Runner',
    production: 'Yellowbird',
    service: 'Ahil',
    director: 'Ole Endresen',
    dp: 'Gaute Gunnari',
    year: '2019',
  },
  {
    title: 'Nivea Body Milk',
    role: 'Runner',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Matt Lambert',
    dp: 'Cezary Zacharewicz',
    year: '2019',
  },
  {
    title: 'SSENSE x Gucci - Balztanz',
    role: 'Runner',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Matt Lambert',
    dp: 'Cezary Zacharewicz',
    year: '2019',
  },
]

const featuredFilms: Film[] = [...dopEntries]
  .sort(byYearDesc)
  .map((entry, index) => {
    const role = entry.role ?? 'DP'
    const type = entry.type ?? 'Film'
    return {
      id: slugify(entry.title),
      title: entry.title,
      role,
      type,
      year: entry.year,
      production: entry.production,
      category: 'featured' as const,
      gradient: gradients[index % gradients.length],
      videoUrl: entry.videoUrl,
      tag: entry.tag,
      credits: [
        ...credit('Role', role),
        ...credit('Type', type),
        ...credit('Director', entry.director),
        ...credit('Production', entry.production),
        ...credit('Service', entry.service),
        ...credit('Notes', entry.notes),
        ...(entry.extraCredits ?? []),
      ],
    }
  })

const assistantFilms: Film[] = [...crewEntries]
  .sort(byYearDesc)
  .map((entry, index) => ({
    id: slugify(entry.title),
    title: entry.title,
    role: entry.role,
    type: entry.type,
    year: entry.year,
    production: entry.production,
    category: 'assistant' as const,
    gradient: gradients[index % gradients.length],
    videoUrl: entry.videoUrl,
    tag: entry.tag,
    credits: [
      ...credit('Role', entry.role),
      ...credit('Type', entry.type),
      ...credit('Director', entry.director),
      ...credit('DP', entry.dp),
      ...credit('Production', entry.production),
      ...credit('Service', entry.service),
      ...credit('Notes', entry.notes),
      ...(entry.extraCredits ?? []),
    ],
  }))

export const films: Film[] = [...featuredFilms, ...assistantFilms]

export function getFilmBySlug(slug: string): Film | undefined {
  return films.find((film) => film.id === slug)
}

export function getFilmSlugs(): string[] {
  return films.map((film) => film.id)
}

export function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) return url
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${id}` : null
    }

    if (host === 'player.vimeo.com') {
      return url
    }

    return null
  } catch {
    return null
  }
}

export function formatFilmNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}
