import * as React from 'react'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import PitchDeck from './components/PitchDeck'
import Home from './components/Home'
import styles from './App.module.css'

export const App = () => (
  <ChakraProvider theme={theme}>
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pitch-deck/:identifier" element={<PitchDeck />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ChakraProvider>
)
