import React, { useEffect, useState } from 'react'
import PitchDeckForm from './PitchDeckForm'
import { fetchAllPitchDecks } from '../requests/pitchDecks'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useToast, Link, UnorderedList, ListItem, Flex, Box } from '@chakra-ui/react'
import styles from './Home.module.css'

export default function Home() {
  const [decks, setDecks] = useState<DeckList>({})
  const fetchDecksAndSet = () => {
    fetchAllPitchDecks().then(setDecks)
  }
  const toast = useToast()

  useEffect(fetchDecksAndSet, [])
  const onDeckAdded = () => {
    fetchDecksAndSet()
    toast({
      title: 'Pitch Deck Added.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Flex className={styles.flex}>
      <Box flex={1} pr={8}>
        <PitchDeckForm onDeckAdded={onDeckAdded} />
      </Box>
      {Object.keys(decks).length > 0 && (
        <>
          <Box pt={12}>
            <h3>Current Pitch Decks:</h3>
            <UnorderedList>
              {Object.keys(decks).map(identifier => (
                <ListItem key={identifier}>
                  <Link color="teal.500" href={`/pitch-deck/${identifier}`} isExternal>
                    {identifier.replaceAll(/-/g, ' ')}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </>
      )}
    </Flex>
  )
}
