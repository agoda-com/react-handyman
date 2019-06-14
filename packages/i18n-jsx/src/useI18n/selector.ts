export type I18nSelector = <TArgs extends (string | number | React.ReactNode)[]>(
  k: string | number,
  notFound: string,
  ...args: TArgs
) => TArgs extends (string | number)[] ? string : React.ReactNode
