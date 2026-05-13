export type JobListing = {
  id: string
  title: string
  location: string
  type: string
  summary: string
}

export const jobListings: JobListing[] = [
  {
    id: 'SF-2026-014',
    title: 'Senior Data Engineer',
    location: 'Pune / Hybrid',
    type: 'Full-time',
    summary:
      'Design and operate cloud data pipelines, partner with analytics on modeling, and help clients harden reliability and cost on the modern stack.',
  },
  {
    id: 'SF-2026-015',
    title: 'Analytics Consultant (Tableau / BI)',
    location: 'Mumbai · Remote-friendly',
    type: 'Full-time',
    summary:
      'Lead dashboard design sessions, translate business questions into metrics, and deliver governed self-service analytics for enterprise teams.',
  },
  {
    id: 'SF-2026-016',
    title: 'Solutions Engineer — Data Platforms',
    location: 'Pune',
    type: 'Full-time',
    summary:
      'Support technical sales cycles, build proofs of concept, and articulate architecture for Postgres, Elastic, and adjacent ecosystem tools.',
  },
  {
    id: 'SF-2026-017',
    title: 'Learning & Enablement Specialist',
    location: 'Remote (India)',
    type: 'Full-time',
    summary:
      'Curriculum design and delivery for data and analytics upskilling programs; collaborate with SMEs to keep content current and measurable.',
  },
]

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

  // encodeURIComponent uses %20 for spaces; URLSearchParams.toString() uses + which many mail clients show literally.
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(CC)}`

  return `mailto:${TO}?${query}`
}
