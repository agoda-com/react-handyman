import * as React from 'react'

export interface Translations {
  [key: string]: string
}

const TranslationsContext = React.createContext<Translations>({})

export default TranslationsContext
