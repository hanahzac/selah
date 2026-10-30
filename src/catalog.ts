import type { Song, Verse } from './types'

export const verses: Verse[] = [
  { passageId: 'PSA.23.1', reference: 'Psalm 23:1', text: 'The Lord is my shepherd; I have what I need.', themes: ['trust', 'God’s character', 'comfort'] },
  { passageId: 'PSA.23.2', reference: 'Psalm 23:2', text: 'He lets me lie down in green pastures; he leads me beside quiet waters.', themes: ['peace', 'comfort', 'trust'] },
  { passageId: 'PSA.23.3', reference: 'Psalm 23:3', text: 'He renews my life; he leads me along the right paths for his name’s sake.', themes: ['restoration', 'guidance', 'God’s character'] },
  { passageId: 'PSA.23.4', reference: 'Psalm 23:4', text: 'Even when I go through the darkest valley, I fear no danger, for you are with me.', themes: ['comfort', 'hope', 'God’s presence'] },
  { passageId: 'PSA.23.5', reference: 'Psalm 23:5', text: 'You prepare a table before me in the presence of my enemies.', themes: ['victory', 'provision', 'praise'] },
  { passageId: 'PSA.23.6', reference: 'Psalm 23:6', text: 'Only goodness and faithful love will pursue me all the days of my life.', themes: ['God’s faithfulness', 'hope', 'praise'] },
]

export const starterSongs: Song[] = [
  {
    id: 'goodness-of-god', title: 'Goodness of God', artist: 'CeCe Winans', album: 'Believe For It', status: 'published',
    themes: ['God’s faithfulness', 'praise', 'God’s character'], passages: ['PSA.23.6'],
    summary: 'A testimony of God’s faithful care through every season.', lyricsUrl: 'https://www.azlyrics.com/lyrics/cecewinans/goodnessofgod.html',
    links: {
      Spotify: 'https://open.spotify.com/track/6vXOAkNQQ1KLmnC7vGYA0c',
      'Apple Music': 'https://music.apple.com/us/song/goodness-of-god-live/1553401297',
      YouTube: 'https://www.youtube.com/watch?v=9sE5kEnitqE',
    },
    credits: 'Songwriters and publishers: see official release credits.', confidence: 98,
  },
  {
    id: 'i-speak-jesus', title: 'I Speak Jesus', artist: 'Charity Gayle', album: 'Endless Praise', status: 'published',
    themes: ['hope', 'comfort', 'God’s presence'], passages: ['PSA.23.4'],
    summary: 'A declaration of Jesus’ presence and peace in fear and darkness.', lyricsUrl: 'https://www.azlyrics.com/lyrics/charitygayle/ispeakjesus.html',
    links: {
      Spotify: 'https://open.spotify.com/track/7lbaZnegIyWdbzwtEV8Tnu',
      'Apple Music': 'https://music.apple.com/us/song/i-speak-jesus-feat-steven-musso/1716928769',
      YouTube: 'https://www.youtube.com/watch?v=tR_vaQ6rA5M',
    },
    credits: 'Songwriters and publishers: see official release credits.', confidence: 91,
  },
  {
    id: 'yet-not-i-but-through-christ', title: 'Yet Not I But Through Christ In Me', artist: 'CityAlight', album: 'Yet Not I But Through Christ In Me', status: 'published',
    themes: ['trust', 'hope', 'grace'], passages: ['PSA.23.4', 'PSA.23.6'],
    summary: 'A confession of dependence on Christ through every trial and promise.', lyricsUrl: 'https://cityalight.com/lyrics/yet-not-i-but-through-christ-in-me/',
    links: {
      Spotify: 'https://open.spotify.com/track/439tGS9rVbyTjj5SmneD56',
      'Apple Music': 'https://music.apple.com/us/song/yet-not-i-but-through-christ-in-me/1770524169',
      YouTube: 'https://www.youtube.com/watch?v=hwc2d1Xt8gM',
    },
    credits: 'Songwriters and publishers: see official release credits.', confidence: 89,
  },
]
