const handleNotFound = (k: string | number, notFound: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[i18n-jsx]: '${k}' key was not found in the translations object, falling back to notFound value.`)
  }

  if (Array.isArray(notFound)) {
    return notFound.reduce((acc, e) => {
      if (Number.isInteger(e) || typeof e === 'string') return acc + `{${e}}`
      return acc + e
    }, '')
  }

  return notFound
}

export default handleNotFound
