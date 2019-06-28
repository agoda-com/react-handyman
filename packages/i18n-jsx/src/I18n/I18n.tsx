import * as React from 'react'
import useI18n from '../useI18n'
import { FArgs, ArgsObj, ArgsObjJsx } from '../utils/types'

interface Props {
  k: string | number
  args?: FArgs | ArgsObj | ArgsObjJsx
}

const I18n: React.FC<Props> = React.memo(props => {
  const { children, k, args } = props
  const childrenArray = React.Children.toArray(children)
  const i18n = useI18n()

  if (childrenArray.length === 1 && (typeof childrenArray[0] === 'string' || typeof childrenArray[0] === 'number')) {
    const argsParsed = args ? (Array.isArray(args) ? args : [args]) : ([] as FArgs)

    return <>{i18n(k, children as string, ...(argsParsed as FArgs))}</>
  }
  console.error(
    `[i18n-jsx]: I18n component for key '${k}' doesn't contain a valid default value. A default value must be provided as a single only child of the <I18n> component, and it must be a string value.`
  )
  return null
})

I18n.displayName = 'I18n'

export default I18n
