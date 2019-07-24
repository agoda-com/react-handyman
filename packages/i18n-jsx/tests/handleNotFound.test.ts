import handleNotFound from '../src/utils/handleNotFound'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})

describe('handleNotFound()', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    jest.clearAllMocks()
    process.env = OLD_ENV
  })

  it('should print console warning when node env is not production', () => {
    process.env.NODE_ENV = 'dev'

    handleNotFound(1, 'not found message')

    expect(consoleWarn).toHaveBeenCalledTimes(1)
    expect(consoleWarn).toHaveBeenCalledWith(
      "[i18n-jsx]: '1' key was not found in the translations object, falling back to notFound value."
    )
  })

  it('should not print console warning when node env is production', () => {
    process.env.NODE_ENV = 'production'

    handleNotFound(1, 'not found message')

    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })

  it('should not print console warning when node env is test', () => {
    process.env.NODE_ENV = 'test'

    handleNotFound(1, 'not found message')

    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })
})
