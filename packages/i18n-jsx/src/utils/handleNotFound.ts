const handleNotFound = (k: string | number, notFound: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[i18n-jsx]: '${k}' key was not found in the translations object, falling back to notFound value.`)
  }

  return notFound
}

export default handleNotFound
