export type Platform = 'Spotify' | 'Apple Music' | 'YouTube'

export type Song = {
  id: string
  title: string
  artist: string
  album: string
  status: 'draft' | 'needs_review' | 'approved' | 'published'
  themes: string[]
  passages: string[]
  summary: string
  lyricsUrl: string
  links: Partial<Record<Platform, string>>
  credits: string
  confidence: number
}

export type Verse = {
  passageId: string
  reference: string
  text: string
  themes: string[]
}
