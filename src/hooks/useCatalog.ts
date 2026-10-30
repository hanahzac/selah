import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { starterSongs } from '../catalog'
import { db } from '../firebase'
import type { Song } from '../types'

export function useCatalog() {
  const [catalog, setCatalog] = useState<Song[]>(starterSongs)

  useEffect(() => {
    if (!db) return

    return onSnapshot(query(collection(db, 'songs'), where('status', '==', 'published')), (snapshot) => {
      const liveSongs = snapshot.docs.map((song) => ({ id: song.id, ...song.data() }) as Song)
      if (liveSongs.length) setCatalog(liveSongs)
    })
  }, [])

  return catalog
}
