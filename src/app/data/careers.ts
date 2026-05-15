export type JobListing = {
  id: string
  title: string
  location: string
  type: string
  summary: string
}

export const jobListings: JobListing[] = [
  // {
  //   id: 'SF-2026-014',
  //   title: 'Senior Data Engineer',
  //   location: 'Pune / Hybrid',
  //   type: 'Full-time',
  //   summary:
  //     'Design and operate cloud data pipelines, partner with analytics on modeling, and help clients harden reliability and cost on the modern stack.',
  // },
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
