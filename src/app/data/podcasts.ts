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
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=amxVvooFQ2Y&t=25s',
    description:
      'The conversation delves into the evolution of the SE role, emphasizing the importance of soft skills and the changing landscape of the storage industry. It also explores the impact of AI on the SE role and concludes with a closing message of turning complexity into clarity.',
    channel: 'Sunfinity Technologies',
    duration: '34:42',
    publishedAt: '2026-06-03',
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=F2EE7G3DXMI',
    description:
      "In this episode, we are talking about a subject which doesn't come naturally to most of the SEs... building and maintaining executive connections. Naresh brings his entire experience to life using real-world examples and personal anecdotes to share the significance of Exec connections and how it helps in technical win.",
    channel: 'Sunfinity Technologies',
    duration: '40:25',
    publishedAt: '2026-06-25',
  },
  
]
