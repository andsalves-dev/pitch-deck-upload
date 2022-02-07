import { API_URL } from '../constants'

const PITCH_DECKS_API = `${API_URL}/pitch-decks`

export function uploadPitchDeck(identifier: string, file: Blob) {
  const body = new FormData()
  body.append('file', file)
  body.append('identifier', identifier)

  return fetch(`${PITCH_DECKS_API}/upload`, { method: 'POST', body })
    .then(response => {
      if (response.status < 300) {
        return response.json()
      }
      throw new Error()
    })
}

export function fetchAllPitchDecks() {
  return fetch(PITCH_DECKS_API).then(response => response.json())
}
