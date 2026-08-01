import { getSanityClient, isSanityConfigured } from '../lib/sanity'

export type JobManager = {
  name: string
  email?: string
  title?: string
}

export type JobListing = {
  id: string
  slug: string
  title: string
  location: string
  type: string
  summary: string
  description: string
  requirements: string[]
  hrManager: JobManager
  technicalManager: JobManager
  publishedAt?: string
}

/** Local fallback used until Sanity env vars are configured. */
export const localJobListings: JobListing[] = [
  {
    id: 'SF-2026-014',
    slug: 'senior-data-engineer',
    title: 'Senior Data Engineer',
    location: 'Pune / Hybrid',
    type: 'Full-time',
    summary:
      'Design and operate cloud data pipelines, partner with analytics on modeling, and help clients harden reliability and cost on the modern stack.',
    description: `We're looking for a Senior Data Engineer to design, build, and operate reliable data platforms for our clients.

You will work closely with analytics, consulting, and client engineering teams to deliver pipelines and models that are performant, observable, and cost-aware. This role suits someone who enjoys ownership of production systems and mentoring others on modern data practices.`,
    requirements: [
      '5+ years building and operating data pipelines in production',
      'Strong SQL and experience with at least one cloud data platform (AWS, GCP, or Azure)',
      'Hands-on with orchestration tools (Airflow, Dagster, or similar)',
      'Familiarity with dbt or equivalent transformation frameworks',
      'Comfortable partnering with client stakeholders and explaining trade-offs clearly',
      'Experience with PostgreSQL, Spark, or Kafka is a plus',
    ],
    hrManager: {
      name: 'Rashi Goel',
      email: 'rashi.goel@sunfinity.tech',
      title: 'HR Manager',
    },
    technicalManager: {
      name: 'Ajay Agrawal',
      email: 'sales@sunfinity.tech',
      title: 'Hiring Manager',
    },
    publishedAt: '2026-05-01',
  },
]

const jobFields = `
  "id": jobId,
  "slug": slug.current,
  title,
  location,
  "type": employmentType,
  summary,
  description,
  requirements,
  hrManager,
  technicalManager,
  publishedAt
`

function normalizeJob(raw: JobListing): JobListing {
  return {
    ...raw,
    requirements: raw.requirements ?? [],
    hrManager: raw.hrManager ?? { name: 'HR Team' },
    technicalManager: raw.technicalManager ?? { name: 'Technical Team' },
  }
}

export async function fetchJobListings(): Promise<JobListing[]> {
  const client = getSanityClient()
  if (!client) return localJobListings.map(normalizeJob)

  const jobs = await client.fetch<JobListing[]>(
    `*[_type == "jobListing" && isActive != false] | order(publishedAt desc) { ${jobFields} }`,
  )
  return (jobs ?? []).map(normalizeJob)
}

export async function fetchJobBySlug(slug: string): Promise<JobListing | undefined> {
  const client = getSanityClient()
  if (!client) {
    return localJobListings.map(normalizeJob).find((job) => job.slug === slug)
  }

  const job = await client.fetch<JobListing | null>(
    `*[_type == "jobListing" && slug.current == $slug && isActive != false][0]{ ${jobFields} }`,
    { slug },
  )
  return job ? normalizeJob(job) : undefined
}

export function getCareersSourceLabel(): string {
  return isSanityConfigured ? 'sanity' : 'local'
}

const TO = 'sales@sunfinity.tech'
const CC = 'rashi.goel@sunfinity.tech'

export function buildApplicationMailto(job: JobListing): string {
  const subject = `Job application for ${job.title} for ${job.id}`
  const body = `Dear Hiring Team,

I am applying for the role: ${job.title}
Job ID: ${job.id}

Please complete the details below and attach your resume to this email.

Name:
Current Organisation:
Current Role:

(Upload resume: please attach your CV/resume file to this email before sending.)

Thank you,
`

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(CC)}`
  return `mailto:${TO}?${query}`
}
