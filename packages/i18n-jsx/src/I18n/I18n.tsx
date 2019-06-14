import * as React from 'react'
import useI18n from '../useI18n'

interface Props {
  k: string | number
  args?: (string | number | React.ReactNode)[]
}

const I18n: React.FC<Props> = props => {
  const { children, k, args } = props
  const i18n = useI18n()
  const argsParsed = args ? args! : ([] as (string | number | React.ReactNode)[])

  return <>{i18n(k, children as string, ...argsParsed)}</>
}

export default I18n
