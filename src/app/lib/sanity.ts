import { createClient, type SanityClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const apiVersion = '2024-01-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id')

let client: SanityClient | null = null

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null
  if (!client) {
    client = createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  }
  return client
}
