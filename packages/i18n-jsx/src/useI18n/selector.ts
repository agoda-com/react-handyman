import { FArgs, FArgsPrimitives } from '../utils/types'

export type I18nSelector = <TArgs extends FArgs>(
  k: string | number,
  notFound: string,
  ...args: TArgs
) => TArgs extends FArgsPrimitives ? string : React.ReactNode
