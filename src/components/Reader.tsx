import { useMemo, useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { verses } from '../catalog'
import { useCatalog } from '../hooks/useCatalog'
import { scoreSongs } from '../utils/scoreSongs'
import { AppHeader } from './AppHeader'
import { SongCard } from './SongCard'

function Scripture({ selectedPassageIds, onToggleVerse, onOpenSongs }: { selectedPassageIds: string[]; onToggleVerse: (passageId: string) => void; onOpenSongs?: () => void }) {
  return <Box h="100%" minH={0} overflowY="auto" bg="cream.50" px={{ base: 7, md: 16, xl: 32 }} py={{ base: 10, lg: 12 }}><Box maxW="570px" mx={{ lg: 'auto' }}><Text color="gold.500" fontFamily="mono" fontSize="10px" letterSpacing=".12em">CHRISTIAN STANDARD BIBLE</Text><Flex align="baseline" justify="space-between" borderBottomWidth="1px" borderColor="blackAlpha.200" pb={5} mt={5} mb={9}><Heading fontSize={{ base: '44px', md: '57px' }} color="forest.900">Psalms <Text as="span" color="gold.500" fontSize="25px">23</Text></Heading><Button variant="ghost" aria-label="Change chapter" color="forest.500">⌄</Button></Flex><Box fontFamily="heading" fontSize={{ base: '23px', md: '26px' }} lineHeight="1.78" color="blackAlpha.800">{verses.map((verse) => <Button key={verse.passageId} onClick={() => onToggleVerse(verse.passageId)} variant="unstyled" display="inline" textAlign="left" whiteSpace="normal" color="inherit" borderRadius="md" px={1} mx={-1} bg={selectedPassageIds.includes(verse.passageId) ? '#dce8bd' : 'transparent'} _hover={{ bg: selectedPassageIds.includes(verse.passageId) ? '#dce8bd' : 'forest.50' }}><Text as="sup" color="gold.500" fontFamily="mono" fontSize="10px" pr={1}>{verse.reference.split(':')[1]}</Text>{verse.text}{' '}</Button>)}</Box><Text mt={8} color="blackAlpha.500" fontSize="11px" lineHeight="1.55">Scripture quotation from the Christian Standard Bible®. Used for prototype demonstration; configure licensed YouVersion content before release.</Text>{onOpenSongs && <Button mt={7} w="100%" colorScheme="green" onClick={onOpenSongs}>View songs for these verses</Button>}</Box></Box>
}

function Recommendations({ selectedPassageIds }: { selectedPassageIds: string[] }) {
  const catalog = useCatalog()
  const recommendations = useMemo(() => scoreSongs(selectedPassageIds, catalog), [selectedPassageIds, catalog])
  const selectedLabel = selectedPassageIds.length === 1 ? verses.find((verse) => verse.passageId === selectedPassageIds[0])?.reference : `${selectedPassageIds.length} selected verses`
  return <Box h="100%" minH={0} overflowY="auto" bg="forest.700" color="cream.50" px={{ base: 7, md: 12, xl: 20 }} py={{ base: 10, lg: 12 }}><Box maxW="520px" mx="auto"><Flex justify="space-between" gap={5}><Box><Text color="gold.300" fontFamily="mono" fontSize="10px" letterSpacing=".12em">WORSHIP FOR THIS PASSAGE</Text><Heading mt={5} fontSize={{ base: '42px', md: '51px' }} lineHeight=".98">Songs for<br /><Text as="em" color="gold.300">{selectedLabel}</Text></Heading></Box><Text color="gold.300" fontSize="2xl">✦</Text></Flex><Text color="whiteAlpha.700" fontSize="sm" lineHeight="1.5" maxW="345px" mt={7} mb={8}>Thoughtful worship songs selected for the themes in this Scripture.</Text><Stack spacing={0}>{recommendations.length ? recommendations.map((song) => <SongCard key={song.id} song={song} selectedPassageIds={selectedPassageIds} />) : <VStack borderWidth="1px" borderStyle="dashed" borderColor="whiteAlpha.300" rounded="xl" py={12}><Text color="gold.300" fontSize="2xl">✦</Text><Heading size="md">Choose a verse</Heading><Text color="whiteAlpha.700" fontSize="sm">Select one or more verses to find worship songs.</Text></VStack>}</Stack></Box></Box>
}

export function Reader() {
  const [selectedPassageIds, setSelectedPassageIds] = useState<string[]>(['PSA.23.4'])
  const [isSongsOpen, setSongsOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false
  const toggleVerse = (passageId: string) => setSelectedPassageIds((current) => current.includes(passageId) ? current.filter((id) => id !== passageId) : [...current, passageId])
  return <Box h="100dvh" overflow="hidden"><AppHeader /><Grid h="calc(100dvh - 76px)" minH={0} overflow="hidden" templateColumns={{ base: '1fr', lg: 'minmax(0, 1.05fr) minmax(400px, .95fr)' }}><Scripture selectedPassageIds={selectedPassageIds} onToggleVerse={toggleVerse} onOpenSongs={isMobile ? () => setSongsOpen(true) : undefined} />{!isMobile && <Recommendations selectedPassageIds={selectedPassageIds} />}</Grid><Modal isOpen={isMobile && isSongsOpen} onClose={() => setSongsOpen(false)} motionPreset="slideInBottom"><ModalOverlay /><ModalContent maxW={{ base: 'calc(100% - 24px)', sm: '560px' }} h="78dvh" mt="auto" mb={3} borderRadius="2xl" overflow="hidden"><ModalCloseButton zIndex={1} color="gold.300" /><ModalBody p={0} flex="1" minH={0} overflow="hidden"><Recommendations selectedPassageIds={selectedPassageIds} /></ModalBody></ModalContent></Modal></Box>
}
