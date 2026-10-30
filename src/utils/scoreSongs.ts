import { verses } from '../catalog'
import type { Song } from '../types'

export function scoreSongs(selectedPassageIds: string[], catalog: Song[]) {
  const selectedVerses = verses.filter((verse) => selectedPassageIds.includes(verse.passageId))
  const selectedThemes = new Set(selectedVerses.flatMap((verse) => verse.themes))

  return catalog
    .map((song) => ({
      song,
      score: song.passages.filter((id) => selectedPassageIds.includes(id)).length * 10
        + song.themes.filter((theme) => selectedThemes.has(theme)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.song.confidence - a.song.confidence)
    .slice(0, 3)
    .map(({ song }) => song)
}
