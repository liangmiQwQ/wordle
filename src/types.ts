interface ConfirmedLetter {
  value: string
  status: 'WRONG' | 'EXIST' | 'CORRECT'
}

export type LetterStatus = 'WRONG' | 'EXIST' | 'CORRECT'

export type Letter = ConfirmedLetter | string | undefined
