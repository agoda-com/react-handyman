import * as React from 'react'

import format from '../src/format'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
const consoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {})

describe('format()', () => {
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

  it('should throw error when undefined template is passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => format(undefined as any)).toThrow(
      '[format-to-jsx]: format() method has been called without a template string!'
    )
  })

  it('should throw error when null template is passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => format(null as any)).toThrow(
      '[format-to-jsx]: format() method has been called without a template string!'
    )
  })

  it('should throw error when empty template is passed', () => {
    expect(() => format('')).toThrow('[format-to-jsx]: format() method has been called without a template string!')
  })

  it('should not format when no args are passed', () => {
    expect(format('simple non template with {placeholder}')).toBe('simple non template with {placeholder}')
  })

  it('should not format non-template strings', () => {
    expect(format('simple non template')).toBe('simple non template')
  })

  it('should not format non-template when args are passed', () => {
    expect(format('simple non template', 123)).toBe('simple non template')
  })

  it('should show warning when number of template placeholders is lower than number of passed params', () => {
    format('a template {0}, {1}', 1, 2, 3)
    expect(consoleWarn).toHaveBeenCalledTimes(1)
    expect(consoleWarn).toHaveBeenCalledWith(
      `[format-to-jsx]: Template 'a template {0}, {1}' contains different number of placeholders than passed arguments ([0,1,2]): found 2 placeholders while 3 arguments have been provided.`
    )
  })

  it('should show warning when number of template placeholders is higher than number of passed params', () => {
    format('a template {0}, {1}, {2}', 1, 2)
    expect(consoleWarn).toHaveBeenCalledTimes(2)
    expect(consoleWarn).toHaveBeenNthCalledWith(
      1,
      `[format-to-jsx]: Template 'a template {0}, {1}, {2}' contains different number of placeholders than passed arguments ([0,1]): found 3 placeholders while 2 arguments have been provided.`
    )
    expect(consoleWarn).toHaveBeenNthCalledWith(
      2,
      `[format-to-jsx]: Failed replacing the template 'a template {0}, {1}, {2}' - '2' index wasn't provided!`
    )
  })

  it('should not show any warnings when running in production', () => {
    process.env.NODE_ENV = 'production'

    format('a template {0}, {1}, {2}', 1, 2)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })

  it('should not show any warnings when same placeholder is used more than 1 time', () => {
    format('a template {0}, {0}, {1}', 1, 2)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })

  it('should format correctly regular string', () => {
    expect(format('simple non template {0}', 'inserted')).toBe('simple non template inserted')
  })

  it('should format correctly string with no spaces', () => {
    expect(format('simple non template{0}', 'inserted')).toBe('simple non templateinserted')
  })

  it('should format correctly with placeholder at beginning of template', () => {
    expect(format('{0} simple non template', 'inserted')).toBe('inserted simple non template')
  })

  it('should format correctly with only placeholders template', () => {
    expect(format('{0}{1} {2}  {3}', 1, 2, 3, 4)).toBe('12 3  4')
  })

  it('should replace values in the correct order', () => {
    expect(format('{3}{1}{2}{0}', 1, 2, 3, 4)).toBe('4231')
  })

  it('should replace values for repeating placeholders', () => {
    expect(format('{0}{1}{0}{1}', 1, 2)).toBe('1212')
  })

  it('should return string for number based params', () => {
    expect(typeof format('{0} {1}', 1, 2)).toBe('string')
  })

  it('should return string for string based params', () => {
    expect(typeof format('{0} {1}', '1', '2')).toBe('string')
  })

  it('should return string for string & number based params', () => {
    expect(typeof format('{0} {1}', '1', 2)).toBe('string')
  })

  it('should format with element params', () => {
    expect(format('{0} {1}', '1', <span>text inside</span>)).toMatchSnapshot()
  })

  it('should format with multiple element params', () => {
    expect(format('part of template {0} {1}', <div>some other text</div>, <span>text inside</span>)).toMatchSnapshot()
  })

  it('should not throw console errors when formatting with jsx', () => {
    format('part of template {0} {1}', '1', <span key="key">text inside</span>)
    expect(consoleError).toHaveBeenCalledTimes(0)
  })

  it('should format correctly with with string based indexes and an object param', () => {
    expect(format('{two} {one}', { one: 1, two: 2 })).toBe('2 1')
  })

  it('should format correctly with with number based indexes and an object param', () => {
    expect(format('{1} {0}', { 0: 1, 1: 2 })).toBe('2 1')
  })

  it('should format correctly with with string based indexes and an object param with JSX', () => {
    expect(format('{one} {two}', { one: 1, two: <span>text inside 2</span> })).toMatchSnapshot()
  })
})
