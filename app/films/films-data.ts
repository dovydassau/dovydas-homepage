export type FilmCategory = 'featured' | 'assistant'

export type CreditInput = {
  label: string
  value: string
}

export type Credit = CreditInput & {
  id: string
}

export type ExtraContentInput = {
  title: string
  description?: string
  // Full YouTube or Vimeo watch URL; embedded below the credits.
  videoUrl: string
}

export type ExtraContent = ExtraContentInput & {
  id: string
}

export type Film = {
  id: string
  title: string
  role: string
  type?: string
  // Full date for sorting; UI shows year only via `year`.
  date: Date
  year: string
  production: string
  category: FilmCategory
  gradient: string
  credits: Credit[]
  summary?: string
  videoUrl?: string
  // Optional image shown as a floating preview on list hover.
  previewImg?: string
  // Optional paragraph shown after the credits list.
  description?: string
  // Optional extra videos (behind the scenes, etc.) shown after the description.
  extraContent?: ExtraContent[]
  // Optional label, e.g. 'Upcoming', shown as a pill in the list and detail.
  tag?: string
  inactive?: boolean
}

// Temp: projects before this date without a videoUrl appear muted in the list.
const TEMP_VIDEO_CUTOFF = new Date('2026-08-01')

export function isFilmInactive(film: Film): boolean {
  if (film.inactive) return true
  if (film.videoUrl) return false

  return film.date < TEMP_VIDEO_CUTOFF
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

function credit(label: string, value?: string): CreditInput[] {
  return value && value.trim() ? [{ label, value: value.trim() }] : []
}

function buildCredits(filmId: string, rows: CreditInput[]): Credit[] {
  return rows.map((row, index) => ({
    id: `${filmId}-credit-${index}`,
    ...row,
  }))
}

function buildExtraContent(
  filmId: string,
  rows?: ExtraContentInput[],
): ExtraContent[] {
  return (rows ?? []).map((row, index) => ({
    id: `${filmId}-extra-${index}`,
    ...row,
  }))
}

// Accepts 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD'.
function parseFilmDate(value: string): Date {
  if (/^\d{4}$/.test(value)) {
    return new Date(Number(value), 0, 1)
  }

  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split('-').map(Number)
    return new Date(year, month - 1, 1)
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid film date: ${value}`)
  }

  return parsed
}

function formatFilmYear(date: Date): string {
  return String(date.getFullYear())
}

function byDopEntryDateDesc(a: DopEntry, b: DopEntry) {
  return parseFilmDate(b.date).getTime() - parseFilmDate(a.date).getTime()
}

function byCrewEntryYearDesc(a: CrewEntry, b: CrewEntry) {
  return parseFilmDate(b.year).getTime() - parseFilmDate(a.year).getTime()
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
  // Sort date: 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD'. UI shows year only.
  date: string
  notes?: string
  // Full YouTube or Vimeo watch URL; embedded in the detail view.
  videoUrl?: string
  // Additional credit rows shown in the detail view after the standard fields.
  extraCredits?: CreditInput[]
  // Optional image shown as a floating preview on list hover.
  previewImg?: string
  // Optional paragraph shown after the credits list.
  description?: string
  // Optional extra videos (behind the scenes, etc.) shown after the description.
  extraContent?: ExtraContentInput[]
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
    date: '2026-12',
    notes: 'Upcoming',
  },
  {
    title: 'Kurtis Wells - Higher Self',
    type: 'Music Video',
    role: 'Producer',
    production: 'Iconoclast',
    director: 'I AM HERE c/o Maik Schuster',
    date: '2023-05',
    videoUrl: 'https://vimeo.com/831639896',
    extraCredits: [
      { label: 'PA', value: 'Pauline Cheneau' },
    ],
    previewImg: 'https://firebasestorage.googleapis.com/v0/b/dovydassaudys-da036.firebasestorage.app/o/thumbnails%2F2553D9BC-A9BF-4A4B-8573-F8AAECF8BB27_24.jpg.webp?alt=media&token=be20a30e-bc41-4a8f-9ef8-94488499a1ce',
  },
  {
    title: 'Sissy Smut vol. 3',
    type: 'Live Event',
    role: 'Editor',
    production: 'Vitium',
    director: 'Matt Lambert',
    date: '2024-04',
    videoUrl: 'https://vimeo.com/1114937661',
  },
  {
    title: 'Sissy Smut vol. 2',
    type: 'Live Event',
    role: 'Editor',
    production: 'Vitium',
    director: 'Matt Lambert',
    date: '2023-09', // keep 9
    videoUrl: 'https://vimeo.com/911116118',
  },
  {
    title: 'Sissy Smut vol. 1',
    type: 'Live Event',
    role: 'Editor',
    production: 'Vitium',
    director: 'Matt Lambert',
    date: '2023-03',
    videoUrl: 'https://vimeo.com/803376675',
    previewImg: 'https://firebasestorage.googleapis.com/v0/b/dovydassaudys-da036.firebasestorage.app/o/thumbnails%2F793420E6-79B7-4CB1-9DBD-200A41C168CD.jpg?alt=media&token=67a83b7b-67fb-4f72-a8ad-b7a433ba5b5e',
  },
  {
    title: 'Gristoma',
    type: 'Commercial',
    production: 'Independent',
    director: 'Dovydas Šaudys',
    date: '2022-04',
    videoUrl: 'https://vimeo.com/713731257',
    extraCredits: [
      { label: 'Gaffer', value: 'Kristupas Zmejauskas' },
    ]
  },
  {
    title: 'Humana Vintage SS21',
    type: 'Commercial',
    production: 'Independent',
    director: 'Aneta Makavičiūtė',
    date: '2021-01',
    videoUrl: 'https://vimeo.com/573468907',
    extraCredits: [
      { label: 'Original Soundtrack', value: 'Nikita Šhurmin' },
      { label: '1st AD', value: 'Goda Mikuckytė' },
      { label: '1st AC', value: 'Rimvydas Ardickas' },
      { label: 'Spark', value: 'Gvidas Bindokas' },
      { label: 'Hair & Makeup', value: 'Sidas Martinavičius' },
      { label: 'Color grading', value: 'Rimvydas Ardickas' },
    ],
  },
  {
    title: 'Neoline - Radars',
    type: 'TVC',
    production: 'Ekspromtu',
    director: 'Dovydas Šaudys',
    date: '2021-07',
    videoUrl: 'https://vimeo.com/581535132',
    extraCredits: [ 
      { label: 'DP', value: 'Rimvydas Ardickas' },
      { label: 'Casting', value: 'Aneta Makavičiūtė' },
    ]
  },
  {
    title: 'Konkurencija',
    type: 'Live Stream Event',
    production: 'Ekspromtu',
    director: 'Dovydas Šaudys',
    date: '2021-08',
    videoUrl: 'https://www.youtube.com/watch?v=nK1--FNMRz0',
  },
  {
    title: 'No Concerns festival',
    type: 'Aftermovie',
    production: 'Independent',
    director: 'Dovydas Šaudys',
    date: '2021-06',
    videoUrl: 'https://www.youtube.com/watch?v=ovBwVzriJ3g',
  },
  {
    title: 'Reverie',
    type: 'Short',
    production: 'Independant',
    director: 'Elėja Atkočiūnas',
    date: '2021-07',
    videoUrl: 'https://www.youtube.com/watch?v=VZeg-RVbpts',
    extraCredits: [ 
      { label: 'DP', value: 'Rimvydas Ardickas' },
      { label: 'Casting', value: 'Aneta Makavičiūtė' },
    ]
  },
  {
    title: 'Foxelli - Jacket',
    type: 'Commercial',
    production: 'Ekspromtu',
    director: 'Rimvydas Ardickas',
    date: '2021-04',
    videoUrl: 'https://vimeo.com/541510749',
    extraCredits: [ 
      { label: 'DP', value: 'Dovydas Šaudys' },
    ]
  },
  {
    title: 'Foxelli - Hiking',
    type: 'Commercial',
    production: 'Ekspromtu',
    director: 'Rimvydas Ardickas',
    date: '2020-06',
    videoUrl: 'https://vimeo.com/431261919',
    extraCredits: [ 
      { label: 'DP', value: 'Dovydas Šaudys' },
    ]
  },
  {
    title: 'Abu2 aplink Europą',
    type: 'Documentary',
    production: 'Ekspromtu',
    director: 'Dovydas Šaudys',
    date: '2018-10',
    videoUrl: 'https://www.youtube.com/watch?v=VcS6NJSiCcU',
    extraCredits: [ 
      { label: 'DP', value: 'Dovydas Šaudys' },
    ]
  },
  {
    title: 'Rielle & Kresto - Alive',
    type: 'Music Video',
    production: 'Ekspromtu',
    director: 'Gabrielė Žemaitytė & Klaudijus Rimeikis',
    date: '2021',
    extraCredits: [
      { label: 'Director of photography', value: 'Dovydas Šaudys' },
      { label: 'Ronin operator', value: 'Rimvydas Ardickas' },
      { label: 'Gaffer', value: 'Lukas Načialnik' },
      { label: 'Spark', value: 'Mantas Siniaviškis' },
      { label: 'Choreographer', value: 'Emilija Rakauskaitė' },
      { label: 'Hair & Make up', value: 'Marija Džiaugytė' },
      { label: 'Photographer', value: 'Mindaugas Rybakovas' },
      { label: 'Photographer', value: 'Kornelija Žizaitė' },
      { label: 'PA', value: 'Daiva Trepkutė' },
      { label: 'PA', value: 'Vilius Morkūnas' },
    ],
    videoUrl: 'https://vimeo.com/581525503',
  },
  {
    title: 'jautì - Mamai',
    type: 'Music Video',
    production: 'Independent',
    director: 'Džiugas Šėma',
    date: '2021',
    videoUrl: 'https://www.youtube.com/watch?v=eWOE8c6uq54',
    previewImg: 'https://i.ytimg.com/vi/eWOE8c6uq54/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC7hXMY7S4poy96ECP5c32Qvw3KaA',
    extraCredits: [
      { label: 'DP', value: 'Dovydas Šaudys' },
    ]
  },
  {
    title: 'DiscoverEU',
    type: 'Commercial',
    production: 'Independent',
    director: 'Dovydas Šaudys',
    date: '2023-10',
    videoUrl: '  https://www.youtube.com/watch?v=MI_NM6MmcQ0',
  },
  {
    title: 'Supynės Merch',
    type: 'Commercial',
    production: 'Supynės Festival',
    director: 'Dovilė Cibulskaitė',
    videoUrl: 'https://vimeo.com/350044268',
    date: '2019-09',
  },
  {
    title: 'Neoline - Scooters',
    type: 'Commercial',
    production: 'Ekspromtu',
    director: 'Dovydas Šaudys',
    date: '2021-04',
    videoUrl: 'https://vimeo.com/541514535',
    extraCredits: [ 
      { label: 'DP', value: 'Rimvydas Ardickas' },
    ]
  },
  {
    title: 'Beside the Pool - Strong, but Weak',
    role: 'Director & DP',
    type: 'Music Video',
    production: 'Independent',
    director: 'Dovydas Šaudys',
    date: '2019-02',
    videoUrl: 'https://vimeo.com/332676375',
    extraCredits: [ 
      { label: 'Performed by', value: 'Justinas Jautžemis' },
      { label: 'Camera', value: 'Gvidas Bindokas' },
      { label: 'Camera', value: 'Martynas Lapinskas' },
      { label: 'PA', value: 'Martynas Patianikas' },
      { label: 'PA', value: 'Mindaugas Gargasas' },
      { label: 'Photographer', value: 'Mindaugas Rimavičius' },
    ]
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
  extraCredits?: CreditInput[]
  // Optional image shown as a floating preview on list hover.
  previewImg?: string
  // Optional paragraph shown after the credits list.
  description?: string
  // Optional extra videos (behind the scenes, etc.) shown after the description.
  extraContent?: ExtraContentInput[]
  tag?: string
}

// Camera department, Lights, and Production credits from the CV.
const crewEntries: CrewEntry[] = [
  // Camera department
  {
    title: 'Teddy & Nura im Real Talk',
    type: 'Interview',
    role: 'DIT',
    production: 'Iconoclast',
    director: 'Joscha Bongard',
    dp: 'Jakob Sinsel',
    year: '2023',
    videoUrl: 'https://www.youtube.com/watch?v=7_SRAsngwWE',
  },
  {
    title: 'Serious Klein - Up',
    role: 'PA',
    production: 'Iconoclast',
    director: 'Julius Pfeifer',
    dp: 'Louis Lustermann',
    year: '2023',
    videoUrl: 'https://www.youtube.com/watch?v=oiSpz7rudp4',
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
    extraCredits: [
      { label: 'Producer', value: 'Ellen Pollock' },
      { label: 'Production Coordinator', value: 'Noelle Goetz' },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=Amakg1iXf38',
  },
  {
    title: 'Lufthansa - All it takes is a Yes',
    role: 'PA',
    type: 'Commercial',
    production: 'Iconoclast',
    year: '2024',
    director: 'Niclas Larsson',
    videoUrl: 'https://www.youtube.com/watch?v=42Njr9STs68',
    previewImg: 'https://firebasestorage.googleapis.com/v0/b/dovydassaudys-da036.firebasestorage.app/o/thumbnails%2F3A22C54B-ED45-4066-B0F0-1E8A2E9CB02E_1736869099216.jpeg?alt=media&token=3a19a170-e66b-4ba7-bc90-a287ee26e733',
  },
  {
    title: "Finn Ronsdorf - Let's Say Goodbye",
    role: 'Scout',
    type: 'Music Video',
    production: 'Iconoclast',
    year: '2024',
    director: 'Matt Lambert',
    videoUrl: 'https://www.youtube.com/watch?v=v1RuzLW-CcI',
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
      { label: 'Production Manager', value: 'Darija Vlada Skvarnavičiūtė' },
      { label: '1st AC', value: 'Martynas Šiaučiūnas' },
      { label: '2nd AC', value: 'Laura Aliukonytė' },
    ],
  },
  {
    title: 'Room 1620 (Upcoming)',
    type: 'Short',
    role: '1st AC',
    production: 'Watcher Entertainment',
    director: 'Anthony D. Frederick',
    year: '2026',
    tag: 'Upcoming',
  },
  {
    title: 'Jessica Shy - Žiburiai',
    type: 'Music Video',
    role: '1st AC',
    production: 'OpenPlay',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=97H_NjzX30E',
  },
  {
    title: 'Signal Path',
    type: 'Short',
    role: '2nd AC',
    production: 'Plopsas',
    director: 'Eglė Razumaitė',
    dp: 'Nojus Drąsutis',
    year: '2026-01',
    videoUrl: 'https://vimeo.com/1156986421',
    extraCredits: [
      { label: '1st AC', value: 'Yannick Hasse' },
    ]
  },
  {
    title: 'Lucid Dreams',
    type: 'Short',
    role: '1st AC',
    production: 'Plopsas',
    director: 'Montis Norvaišis',
    dp: 'Matas Juškaitis',
    year: '2026-02',
    videoUrl: 'https://vimeo.com/1206212276',
    extraCredits: [
      { label: '2nd AC', value: 'Milda Juodvalkytė' },
    ],
  },
  {
    title: 'Rimvis - Bailys',
    type: 'Music Video',
    role: '1st AC',
    production: 'Sound Focus',
    director: 'Juozapas Mikulėnas',
    dp: 'Domas Gudaitis',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=SjlV4jSCqp0',
    extraCredits: [
      { label: '2nd AC', value: 'Daniel Jasiukevič' },
    ],
    extraContent: [
      {
        title: 'Behind the scenes',
        videoUrl: 'https://www.youtube.com/watch?v=2p_-BhS82TM',
      },
    ],
  },
  {
    title: 'Come in the form of Milk',
    type: 'Video Installation',
    role: '1st AC',
    production: 'Kaunas 2022',
    director: 'Karin Pisarikova',
    dp: 'Rimvydas Ardickas',
    year: '2021',
    videoUrl: 'https://vimeo.com/576654322',
  },
  {
    title: 'Free Finga - Atlanta',
    type: 'Music Video',
    role: '1st AC',
    production: 'Autostrada',
    director: 'Justinas Vilutis',
    dp: 'Nikolas Verseckas',
    year: '2021',
    videoUrl: 'https://www.youtube.com/watch?v=pvFWMkFPudI',
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
    title: 'Švyturys - Tipit',
    role: '1st AC',
    production: 'Zest',
    director: 'Domas Merkliopas',
    dp: 'Imantas Boiko',
    year: '2021',
    videoUrl: 'https://www.youtube.com/watch?v=OQ5Ne7TrYws',
  },
  {
    title: 'Foto-Shoot',
    type: 'Short',
    role: 'Spark',
    production: 'LMTA',
    director: 'Inesa Marcinkevičiūtė',
    dp: 'Matas Galdikas',
    year: '2024',
    videoUrl: 'https://www.youtube.com/watch?v=9W4SeGNzRJ8',
    extraCredits: [ 
      { label: 'Gaffer', value: 'Darius Juknevičius' },
      { label: 'Spark', value: 'Morta Paunksnytė' },
      { label: 'Spark', value: 'Kasparas Plauška' },
    ]
  },
  {
    title: 'Branginu.lt',
    type: 'TVC',
    role: '1st AC',
    production: 'Pixel Studio',
    director: 'Mantas Norkus',
    dp: 'Laurynas Lukoševičius',
    year: '2021',
    videoUrl: 'https://vimeo.com/523138138',
  },
  {
    title: 'Ikea - New Season',
    type: 'TVC',
    role: 'PA',
    director: 'Ignas Jonynas',
    dp: 'Ramūnas Greičius',
    year: '2021',
    production: 'Dansu',
    videoUrl: 'https://www.youtube.com/watch?v=Ab4S9F7KEzA',
  },
  {
    title: 'Orai - Tavo Stogas Toks Trapus',
    type: 'Music Video',
    role: '2nd AC',
    production: 'Independent',
    director: 'Simon Soveičik',
    dp: 'Darius Juknevičius',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=-731G6X_vO8',
  },
  // Lights
  {
    title: 'Flowers, So Many Flowers',
    role: 'Gaffer',
    production: 'Independent',
    director: 'Monika Navickaitė',
    dp: 'Chester Briscall-Harvey',
    year: '2022',
    videoUrl: 'https://vimeo.com/776246740',
  },
  {
    title: 'Juoda Juoda Naktis',
    role: 'Spark',
    production: 'LMTA',
    director: 'Laura Udrė',
    dp: 'Nikolas Verseckas',
    year: '2022',
    notes: 'CamerImage 2022',
    videoUrl: 'https://vimeo.com/780457248',
  },
  {
    title: 'Atgal į laisvę / -15',
    role: 'Spark',
    type: 'Short Film',
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
    title: 'Pats brangiausias serialas',
    role: 'Spark',
    production: 'Idée Fixe',
    director: 'Emilis Vėlyvis',
    dp: 'Petras Škukauskas',
    year: '2021',
    videoUrl: 'https://www.youtube.com/watch?v=viDvA03BDe4',
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
  // Production
  {
    title: 'Young Fathers - I Saw',
    type: 'Music Video',
    role: 'PA',
    production: 'Iconoclast',
    director: 'David Uzochukwu',
    dp: 'Christopher Aoun',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=uPyC0JUfZrU',
  },
  {
    title: 'Telekom - The Teacher',
    role: 'PA',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Jonathan Alric',
    dp: 'Paul Özgür',
    year: '2022',
    videoUrl: 'https://www.youtube.com/watch?v=G4ylegvL9ms',
  },
  {
    title: 'Coca Cola - That Moment When',
    role: 'PA',
    production: 'Birth',
    service: 'The Magic',
    director: 'Valentin Guiod',
    dp: 'Olan Collardy',
    year: '2022',
    videoUrl: 'https://vimeo.com/708735284',
    previewImg: 'https://firebasestorage.googleapis.com/v0/b/dovydassaudys-da036.firebasestorage.app/o/thumbnails%2Fcocacola.jpg?alt=media&token=d53b343a-69eb-4d79-a3dd-f877253f1c3b',
  },
  {
    title: 'Vinted - The Difference',
    role: 'PA',
    production: 'Karuselė',
    director: 'Thor Saevarsson',
    dp: 'David Wright',
    year: '2022',
    videoUrl: 'https://vimeo.com/704095010',
  },
  {
    title: 'Panzani - Les Meilleures Pâtes',
    role: 'PA',
    production: 'Mirror Mirror',
    service: 'The Magic',
    director: 'Gregoris Rentis',
    dp: 'Ioannis Georgiou',
    year: '2022',
    videoUrl: 'https://vimeo.com/698559367',
  },
  {
    title: 'apo.com',
    role: 'PA',
    production: 'Sterntag',
    service: 'The Magic',
    director: 'Nicolina Knapp',
    dp: 'Anna Smoroňová',
    year: '2022',
    videoUrl: 'https://vimeo.com/846861630',
  },
  {
    title: 'Under Armour - The Only Way Is Through',
    role: 'PA',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Amara Abbas',
    dp: 'Jacob Møller',
    year: '2021',
    videoUrl: 'https://vimeo.com/642252968',
  },
  {
    title: 'Celio - Be Normal',
    role: 'PA',
    production: 'Caviar',
    service: 'The Magic',
    director: 'Cloé Bailly',
    dp: 'Lucas Casanovas',
    year: '2021',
    videoUrl: 'https://vimeo.com/586728523',
    previewImg: 'https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.oneclub.org%2Fawards%2Ftheoneshow%2F-award%2F53525%2Fthe-most-normal-shoot%2F&ved=0CBYQjRxqGAoTCOiA2LvauZUDFQAAAAAdAAAAABDCAg&opi=89978449',
  },
  {
    title: 'Telia - Rollover',
    role: 'Runner',
    production: 'Somefilms',
    director: 'Titas Sūdžius',
    dp: 'Audrius Budrys',
    year: '2020',
    videoUrl: 'https://vimeo.com/413644519',
    previewImg: 'https://firebasestorage.googleapis.com/v0/b/dovydassaudys-da036.firebasestorage.app/o/thumbnails%2Ftelia_rollover.jpg?alt=media&token=9a2ebf0e-37bb-4ae2-a3cd-ed7de520b141',
  },
  {
    title: 'Vinski and the Invisibility Powder',
    type: 'Feature',
    role: 'PA & SFX',
    production: 'Snapper Films',
    service: 'Ahil',
    director: 'Juha Wuolijoki',
    dp: 'Mika Orasmaa',
    year: '2019',
    videoUrl: 'https://www.youtube.com/watch?v=ZuiiwcI_5Wg',
    extraCredits: [ 
      { label: 'SFX Supervisor', value: 'Darius Cicėnas' },
      { label: '1st AD', value: 'Lukas Kudapčenka' },
    ]
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
    title: 'Young Wallander - Season 1',
    role: 'PA',
    production: 'Netflix',
    service: 'Ahil',
    director: 'Ole Endresen',
    dp: 'Gaute Gunnari',
    year: '2019',
    videoUrl: 'https://www.youtube.com/watch?v=t9rYPlh18Uo',
  },
  {
    title: 'Nivea Body Milk',
    role: 'PA',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Matt Lambert',
    dp: 'Cezary Zacharewicz',
    year: '2019',
    videoUrl: 'https://vimeo.com/710304268',
    previewImg: 'https://as2.ftcdn.net/v2/jpg/02/17/00/79/1000_F_217007945_kSszXIfoAqBdZhBbOQATmGaoMHTeS6W2.jpg',
  },
  {
    title: 'SSENSE x Gucci - Balztanz',
    role: 'PA',
    production: 'Iconoclast',
    service: 'The Magic',
    director: 'Matt Lambert',
    dp: 'Cezary Zacharewicz',
    year: '2019',
    videoUrl: 'https://www.youtube.com/watch?v=XD2eMcXjF9A',
    previewImg: 'https://i.ytimg.com/vi/XD2eMcXjF9A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAAOSdT_9O0XOqQpDFJiSy8aulrtA'
  },
]

const featuredFilms: Film[] = [...dopEntries]
  .sort(byDopEntryDateDesc)
  .map((entry, index) => {
    const role = entry.role ?? 'DP'
    const type = entry.type ?? 'Film'
    const date = parseFilmDate(entry.date)
    const filmId = slugify(entry.title)
    return {
      id: filmId,
      title: entry.title,
      role,
      type,
      date,
      year: formatFilmYear(date),
      production: entry.production,
      category: 'featured' as const,
      gradient: gradients[index % gradients.length],
      videoUrl: entry.videoUrl,
      tag: entry.tag,
      previewImg: entry.previewImg,
      description: entry.description,
      extraContent: buildExtraContent(filmId, entry.extraContent),
      credits: buildCredits(filmId, [
        ...credit('Role', role),
        ...credit('Type', type),
        ...credit('Director', entry.director),
        ...credit('Production', entry.production),
        ...credit('Service', entry.service),
        ...credit('Notes', entry.notes),
        ...(entry.extraCredits ?? []),
      ]),
    }
  })

const assistantFilms: Film[] = [...crewEntries]
  .sort(byCrewEntryYearDesc)
  .map((entry, index) => {
    const date = parseFilmDate(entry.year)
    const filmId = slugify(entry.title)
    return {
    id: filmId,
    title: entry.title,
    role: entry.role,
    type: entry.type,
    date,
    year: formatFilmYear(date),
    production: entry.production,
    category: 'assistant' as const,
    gradient: gradients[index % gradients.length],
    videoUrl: entry.videoUrl,
    tag: entry.tag,
    previewImg: entry.previewImg,
    description: entry.description,
    extraContent: buildExtraContent(filmId, entry.extraContent),
    credits: buildCredits(filmId, [
      ...credit('Role', entry.role),
      ...credit('Type', entry.type),
      ...credit('Director', entry.director),
      ...credit('DP', entry.dp),
      ...credit('Production', entry.production),
      ...credit('Service', entry.service),
      ...credit('Notes', entry.notes),
      ...(entry.extraCredits ?? []),
    ]),
    }
  })

export const films: Film[] = [...featuredFilms, ...assistantFilms]

export function getFilmBySlug(slug: string): Film | undefined {
  return films.find((film) => film.id === slug)
}

export function getFilmSlugs(): string[] {
  return films.map((film) => film.id)
}

export { toEmbedUrl } from 'app/lib/to-embed-url'

export function formatFilmNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}
