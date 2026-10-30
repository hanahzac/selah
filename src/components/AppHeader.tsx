import { Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react'

function Wordmark() {
  return (
    <Link href="#/" _hover={{ textDecoration: 'none' }} fontFamily="heading" fontSize="31px" fontWeight="600" letterSpacing="-.07em" color="forest.700">
      selah<Text as="span" color="gold.500" ml="2px">·</Text>
    </Link>
  )
}

type AppHeaderProps = { admin?: boolean }

export function AppHeader({ admin = false }: AppHeaderProps) {
  return (
    <Flex h="76px" px={{ base: 6, md: 12, xl: 20 }} align="center" borderBottomWidth="1px" borderColor="blackAlpha.100" bg="cream.50">
      <Wordmark />
      {admin ? (
        <Text ml={6} pl={5} borderLeftWidth="1px" borderColor="blackAlpha.200" color="blackAlpha.600" fontSize="sm">Catalog studio</Text>
      ) : (
        <HStack spacing={7} ml={{ base: 8, md: 16 }} fontSize="sm">
          <Link href="#/" color="forest.700" fontWeight="700">Read</Link>
          <Link href="#/admin" color="blackAlpha.600">Admin</Link>
        </HStack>
      )}
      {admin ? (
        <Link ml="auto" href="#/" color="forest.500" fontSize="sm">← Reader</Link>
      ) : (
        <IconButton ml="auto" aria-label="Open profile" icon={<Text fontSize="xs" fontWeight="bold">H</Text>} size="sm" isRound bg="#d9b58a" color="#51391d" _hover={{ bg: '#d0a873' }} />
      )}
    </Flex>
  )
}
