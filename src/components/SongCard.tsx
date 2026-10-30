import { useState } from 'react'
import { Box, Flex, Heading, HStack, IconButton, Link, Text } from '@chakra-ui/react'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { verses } from '../catalog'
import { db, ensureAnonymousSession } from '../firebase'
import type { Platform, Song } from '../types'

const platformIcon: Record<Platform, string> = { Spotify: '◉', 'Apple Music': '♪', YouTube: '▶' }

type SongCardProps = { song: Song; selectedPassageIds: string[] }

export function SongCard({ song, selectedPassageIds }: SongCardProps) {
  const [saved, setSaved] = useState(false)
  const matchingVerse = song.passages.find((passage) => selectedPassageIds.includes(passage))
  const selectedThemes = verses
    .filter((verse) => selectedPassageIds.includes(verse.passageId))
    .flatMap((verse) => verse.themes)
  const matchingTheme = song.themes.find((theme) => selectedThemes.includes(theme))

  const save = async () => {
    setSaved(true)
    if (!db) return

    const user = await ensureAnonymousSession()
    if (user) {
      await setDoc(doc(collection(db, 'savedPairs')), {
        ownerId: user.uid,
        songId: song.id,
        passageIds: selectedPassageIds,
        createdAt: serverTimestamp(),
      })
    }
  }

  return (
    <Flex gap={4} pt={4} borderTopWidth="1px" borderColor="whiteAlpha.300">
      <Flex flex="0 0 54px" h="54px" rounded="lg" bgGradient="linear(135deg, #d38b4a, #8c6037 55%, #3f7454)" align="center" justify="center" color="whiteAlpha.900" fontFamily="heading" fontSize="3xl">♫</Flex>
      <Box minW="0" flex="1">
        <Flex justify="space-between" gap={3}>
          <Box><Heading as="h3" size="sm" color="cream.50">{song.title}</Heading><Text fontSize="xs" color="whiteAlpha.700" mt={1}>{song.artist} <Text as="span">·</Text> {song.album}</Text></Box>
          <IconButton aria-label={`Save ${song.title}`} variant="ghost" color="gold.300" icon={<Text fontSize="2xl">{saved ? '♥' : '♡'}</Text>} onClick={save} />
        </Flex>
        <Text fontSize="xs" color="whiteAlpha.700" mt={2} lineHeight="1.45">
          {matchingVerse ? `Directly connects with ${verses.find((verse) => verse.passageId === matchingVerse)?.reference}.` : `A strong thematic fit for ${matchingTheme?.toLowerCase() ?? 'this passage'}.`}
        </Text>
        <HStack spacing={3} mt={3} flexWrap="wrap">
          <Link href={song.lyricsUrl} isExternal color="gold.100" fontFamily="mono" fontSize="10px">Lyrics ↗</Link>
          {(Object.keys(song.links) as Platform[]).map((platform) => <Link key={platform} href={song.links[platform]} isExternal color="gold.100" fontFamily="mono" fontSize="10px">{platformIcon[platform]} {platform}</Link>)}
        </HStack>
        <Text mt={2} color="whiteAlpha.600" fontSize="10px">{song.credits}</Text>
      </Box>
    </Flex>
  )
}
