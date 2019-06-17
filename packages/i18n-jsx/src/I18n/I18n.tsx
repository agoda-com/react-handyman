import * as React from 'react'
import useI18n from '../useI18n'
import { FArgs } from '../utils/types'

interface Props {
  k: string | number
  args?: FArgs
}

const I18n: React.FC<Props> = props => {
  const { children, k, args } = props
  const i18n = useI18n()
  const argsParsed = args ? args! : ([] as FArgs)

  return <>{i18n(k, children as string, ...argsParsed)}</>
}

export default I18n
