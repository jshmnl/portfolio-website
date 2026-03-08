export interface Certification {
  id: string
  title: string
  issuer: string
  issuerShort: string
  date: string
  dateSort: string   // YYYY-MM for sorting
  category: 'programming' | 'design' | 'computing'
  color: 'gold' | 'silver' | 'bronze'
  description: string
}

export const certifications: Certification[] = [
  {
    id: 'its-java',
    title: 'Information Technology Specialist — Java',
    issuer: 'Certiport / Pearson VUE',
    issuerShort: 'Certiport',
    date: 'May 2024',
    dateSort: '2024-05',
    category: 'programming',
    color: 'gold',
    description:
      'Validates proficiency in Java programming fundamentals, object-oriented design, data structures, and software development best practices.',
  },
  {
    id: 'tesda-nc3',
    title: 'Visual Graphic Design — National Certificate III',
    issuer: 'Technical Education and Skills Development Authority (TESDA)',
    issuerShort: 'TESDA',
    date: 'December 2023',
    dateSort: '2023-12',
    category: 'design',
    color: 'silver',
    description:
      'TESDA NC III certification in visual graphic design, covering digital image composition, layout principles, and production-ready design output.',
  },
  {
    id: 'ic3-gs5',
    title: 'IC3 GS5 — Computing Fundamentals',
    issuer: 'Certiport / IC3',
    issuerShort: 'Certiport',
    date: 'January 2023',
    dateSort: '2023-01',
    category: 'computing',
    color: 'bronze',
    description:
      'Internet and Computing Core Certification (IC3) covering computing hardware, operating systems, software fundamentals, and digital literacy.',
  },
]
