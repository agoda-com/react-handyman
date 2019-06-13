export type I18nSelector = (
  k: string | number,
  notFound: string,
  ...args: (number | React.ReactNode)[]
) => string | React.ReactNode
