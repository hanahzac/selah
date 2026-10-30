import { useState, type ChangeEvent } from 'react'
import { Badge, Box, Button, Divider, Flex, Grid, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { starterSongs } from '../catalog'
import { AppHeader } from './AppHeader'

type ImportResult = { valid: number; invalid: number; message: string }

function ReviewQueue() {
  return <TabPanel p={0}><Text color="gold.500" fontFamily="mono" fontSize="10px" letterSpacing=".12em">NEEDS YOUR EYES</Text><Heading mt={5} fontSize="47px">Review queue</Heading><Text color="blackAlpha.600" mt={4} mb={9}>Drafts are never visible in the reader until a publisher approves them.</Text><Stack divider={<Divider />}>{starterSongs.slice(0, 3).map((song, index) => <Flex key={song.id} py={4} gap={4} align="center"><Text color="gold.500" fontFamily="mono" fontSize="xs">0{index + 1}</Text><Box flex="1"><Heading size="sm">{song.title}</Heading><Text color="blackAlpha.600" fontSize="xs" mt={1}>{song.artist} · Link verification {index === 0 ? 'complete' : 'needed'}</Text></Box><Badge colorScheme={index === 0 ? 'green' : 'orange'}>{index === 0 ? 'Ready' : 'Needs review'}</Badge><Button size="sm" variant="outline" colorScheme="green">Review</Button></Flex>)}</Stack></TabPanel>
}

function SongCatalog() {
  return <TabPanel p={0}><Text color="gold.500" fontFamily="mono" fontSize="10px" letterSpacing=".12em">PUBLISHED LIBRARY</Text><Heading mt={5} fontSize="47px">Song catalog</Heading><Stack mt={8} spacing={0} borderWidth="1px" rounded="lg" overflow="hidden">{starterSongs.map((song) => <Flex key={song.id} p={4} borderBottomWidth="1px" _last={{ borderBottom: 0 }} align="center" gap={4}><Box flex="1"><Heading size="sm">{song.title}</Heading><Text color="blackAlpha.600" fontSize="xs">{song.artist}</Text></Box><Text display={{ base: 'none', md: 'block' }} flex="1" color="blackAlpha.600" fontSize="xs">{song.themes.slice(0, 2).join(', ')}</Text><Badge colorScheme="green">Published</Badge></Flex>)}</Stack></TabPanel>
}

function ImportCsv() {
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const previewImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const rows = (await file.text()).trim().split(/\r?\n/).filter(Boolean)
    const headers = rows.shift()?.split(',').map((header) => header.trim().toLowerCase()) ?? []
    const title = headers.indexOf('title')
    const artist = headers.indexOf('artist')
    if (title < 0 || artist < 0) return setImportResult({ valid: 0, invalid: rows.length, message: 'This file needs “title” and “artist” column headers.' })
    const valid = rows.filter((row) => { const cells = row.split(',').map((cell) => cell.trim()); return Boolean(cells[title] && cells[artist]) }).length
    setImportResult({ valid, invalid: rows.length - valid, message: 'Preview complete. Connect a staff Firebase session to create review drafts.' })
  }
  return <TabPanel p={0}><Text color="gold.500" fontFamily="mono" fontSize="10px" letterSpacing=".12em">NO-STORAGE IMPORT</Text><Heading mt={5} fontSize="47px">Import a CSV</Heading><VStack mt={8} maxW="560px" p={12} borderWidth="1px" borderStyle="dashed" borderColor="blackAlpha.300" rounded="xl" bg="cream.50" textAlign="center"><Flex w={9} h={9} rounded="full" bg="forest.500" color="white" align="center" justify="center" fontSize="xl">↑</Flex><Heading size="md">Validate a song CSV</Heading><Text color="blackAlpha.600" fontSize="sm" lineHeight="1.6">For the no-cost Firebase MVP, this file stays in the browser while it is validated. Nothing is uploaded to Firebase Storage.</Text><Button as="label" colorScheme="green" cursor="pointer">Choose CSV<input type="file" accept=".csv,text/csv" hidden onChange={previewImport} /></Button><Text color="blackAlpha.500" fontSize="xs">Required: title, artist. Optional: album, ISRC, lyrics URL, platform links.</Text>{importResult && <Box bg="forest.50" color="forest.700" rounded="md" p={3} fontSize="xs"><Text fontWeight="bold">{importResult.valid} valid row{importResult.valid === 1 ? '' : 's'} · {importResult.invalid} need attention</Text><Text mt={1}>{importResult.message}</Text></Box>}</VStack></TabPanel>
}

export function Admin() {
  const tabs = ['Review queue', 'Song catalog', 'Import CSV']
  return <Box minH="100vh"><AppHeader admin /><Grid maxW="1280px" mx="auto" px={{ base: 5, md: 10 }} py={11} templateColumns={{ base: '1fr', md: '202px 1fr' }} gap={{ base: 6, md: 16 }}><Tabs variant="unstyled" display="contents" orientation="vertical"><TabList display={{ base: 'flex', md: 'block' }} overflowX="auto">{tabs.map((label, index) => <Tab key={label} justifyContent="space-between" w={{ base: 'auto', md: '100%' }} whiteSpace="nowrap" textAlign="left" borderRadius="md" px={3} py={2.5} color="blackAlpha.600" fontSize="sm" _selected={{ bg: 'forest.100', color: 'forest.900', fontWeight: 'bold' }}>{label}{index === 0 && <Text as="span" color="gold.500" ml={3}>3</Text>}</Tab>)}</TabList><TabPanels><ReviewQueue /><SongCatalog /><ImportCsv /></TabPanels></Tabs></Grid></Box>
}
