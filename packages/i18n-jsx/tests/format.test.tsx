import 'jest'
import * as React from 'react'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})

import format from '../src/utils/format'

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
    expect(() => format(undefined)).toThrow('[i18n-jsx]: format() method has been called without a template string!')
  })

  it('should throw error when undefined template is passed', () => {
    expect(() => format(null)).toThrow('[i18n-jsx]: format() method has been called without a template string!')
  })

  it('should throw error when undefined template is passed', () => {
    expect(() => format('')).toThrow('[i18n-jsx]: format() method has been called without a template string!')
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
      `[i18n-jsx]: Template 'a template {0}, {1}' contains different number of indexes than passed arguments ([1,2,3]): found 2 placeholders while 3 arguments have been provided.`
    )
  })

  it('should show warning when number of template placeholders is higher than number of passed params', () => {
    format('a template {0}, {1}, {2}', 1, 2)
    expect(consoleWarn).toHaveBeenCalledTimes(2)
    expect(consoleWarn).toHaveBeenNthCalledWith(
      1,
      `[i18n-jsx]: Template 'a template {0}, {1}, {2}' contains different number of indexes than passed arguments ([1,2]): found 3 placeholders while 2 arguments have been provided.`
    )
    expect(consoleWarn).toHaveBeenNthCalledWith(
      2,
      `[i18n-jsx]: Template 'a template {0}, {1}, {2}' doesn't contain matching index '2'`
    )
  })

  it('should not show any warnings when running in production', () => {
    process.env.NODE_ENV = 'production'

    format('a template {0}, {1}, {2}', 1, 2)
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
    expect(format('{0} {1}', '1', <span>text inside</span>)).toBe(
      <React.Fragment>
        <>1 </>
        <span>text inside</span>
      </React.Fragment>
    )
  })
})
