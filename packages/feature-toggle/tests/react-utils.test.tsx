import 'jest'
import * as React from 'react'

import { nameOf, AnonymousFunctionName } from '../src/react-utils'

const displayName = 'IHaveDisplayName'

describe(`nameOf()`, () => {
  describe(`Function Component`, () => {
    test(`return displayName if set`, () => {
      const FunctionComponentWithDisplayName: React.FC = _ => <div />
      FunctionComponentWithDisplayName.displayName = displayName

      expect(nameOf(FunctionComponentWithDisplayName)).toBe(displayName)
    })

    test(`return prototype.name if display name is not set`, () => {
      const FunctionComponentWithoutDisplayName: React.FC = _ => <div />

      expect(nameOf(FunctionComponentWithoutDisplayName)).toBe(FunctionComponentWithoutDisplayName.name)
    })

    test(`return Anonymous for inline function`, () => {
      expect(nameOf(_ => <div />)).toBe(AnonymousFunctionName)
    })
  })

  describe(`Class Component`, () => {
    test(`return displayName if set`, () => {
      const component = class ClassComponentWithDisplayName extends React.Component {
        static displayName = displayName
        render() {
          return <div />
        }
      }

      expect(nameOf(component)).toBe(displayName)
    })

    test(`return prototype.name if display name is not set`, () => {
      const component = class ClassComponentWithoutDisplayName extends React.Component {
        render() {
          return <div />
        }
      }

      expect(nameOf(component)).toBe(component.name)
    })

    test(`return class name for anonymous class`, () => {
      expect(
        nameOf(
          class ClassComponent extends React.Component {
            render() {
              return <div />
            }
          }
        )
      ).toBe('ClassComponent')
    })
  })
})
