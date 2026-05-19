/**
 * Podcast registry — order here defines listing order on /podcasts.
 *
 * To add an episode, append an object with:
 * - youtubeUrl (title + thumbnail are fetched automatically)
 * - description, channel, duration, publishedAt (you provide these)
 */

export type PodcastEpisodeInput = {
  youtubeUrl: string
  description: string
  channel?: string
  duration?: string
  publishedAt?: string
}

export const podcastEpisodes: PodcastEpisodeInput[] = [
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=fbbNl1Gx9_4&t=1967s',
    description:
      'The podcast episode features Abhijit Portnis, a seasoned pre-sales leader, discussing his journey, the evolution of pre-sales, and the challenges faced in software and infrastructure pre-sales. He also shares insights on the role of SEs and the key aspects that make an SE successful. The conversation with Abhijit covers the essential qualities of a successful Associate Consultant (AC) and the importance of soft skills in pre-sales. It also delves into the impact of AI on pre-sales, the future of pre-sales roles, and the significance of customer relationships.',
    channel: 'Sunfinity Technologies',
    duration: '36:43',
    publishedAt: '2026-05-20',
  },
  
]
