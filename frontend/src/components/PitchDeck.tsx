import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchAllPitchDecks } from '../requests/pitchDecks'
import { API_URL } from '../constants'
import styles from './PitchDeck.module.css'

function PitchDeck() {
  const { identifier } = useParams()
  const [decks, setDecks] = useState<DeckList>({})

  useEffect(() => {
    fetchAllPitchDecks().then(setDecks)
  }, [])

  if (!identifier || !decks[identifier]) return null

  return (
    <>
      <h1 className={styles.title}>
        {identifier.replaceAll(/-/g, ' ')}
      </h1>
      <ul className={styles.list}>
        {decks[identifier].map((image, key) => (
          <li key={image}>
            <img src={`${API_URL}${image}`} alt={`${identifier}-${key}`} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PitchDeck
