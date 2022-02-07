import React, { ChangeEvent, useState } from 'react'
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'
import { uploadPitchDeck } from '../requests/pitchDecks'
import styles from './PitchDeckForm.module.css'

type Props = {
  onDeckAdded: Function
}

type ErrorCollection = {
  identifier?: string
  file?: string
  general?: string
}

function PitchDeckForm({ onDeckAdded }: Props) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [identifier, setIdentifier] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorCollection>({})
  const onSubmit = () => {
    setErrors({})

    if (!identifier) {
      setErrors({ identifier: 'Please provide an identifier for your company' })
      return
    }

    if (!pdfFile) {
      setErrors({ file: 'Please provide a file for upload' })
      return
    }

    if (pdfFile.type !== 'application/pdf') {
      setErrors({ file: 'Please provide a file with PDF format!' })
      return
    }

    setIsSubmitting(true)

    uploadPitchDeck(identifier, pdfFile)
      .then(() => {
        setPdfFile(null)
        setIdentifier('')
        onDeckAdded()
      }, error => {
        setErrors({ general: error.message || 'Could not upload file' })
      })
      .finally(() => setIsSubmitting(false))
  }
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => setPdfFile(e.target.files![0])
  const onIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)

  return (
    <>
      <h2 className={styles.heading}>Upload a new pitch deck</h2>
      <Box className={styles.form} p={4}>
        {errors.general && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}
        <FormControl className={styles.formControl} isInvalid={!!errors.identifier}>
          <FormLabel htmlFor="identifier" className={styles.label}>
            Company Identifier:
          </FormLabel>
          <Input
            id="identifier"
            placeholder="Company Name"
            onChange={onIdentifierChange}
            value={identifier}
          />
          <FormErrorMessage>{errors.identifier}</FormErrorMessage>
        </FormControl>
        <FormControl className={styles.formControl} isInvalid={!!errors.file}>
          <FormLabel htmlFor="file" className={styles.label}>
            Pitch Deck Upload (PDF File):
          </FormLabel>
          <Input
            className={styles.inputFile}
            id="file"
            onChange={onFileChange}
            type="file"
            accept=".pdf"
          />
          <FormErrorMessage>{errors.file}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isSubmitting}
          onClick={onSubmit}
          colorScheme="blue"
          loadingText="Submitting"
        >
          Submit
        </Button>
      </Box>
    </>
  )
}

export default PitchDeckForm
