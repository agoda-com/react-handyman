import * as React from 'react'

import { nameOf, AnonymousFunctionName } from '../src/react-utils'

const displayName = 'IHaveDisplayName'

describe(`nameOf()`, () => {
  describe(`Function Component`, () => {
    test(`return displayName if set`, () => {
      const FunctionComponentWithDisplayName: React.FC = () => <div />
      FunctionComponentWithDisplayName.displayName = displayName

      expect(nameOf(FunctionComponentWithDisplayName)).toBe(displayName)
    })

    test(`return prototype.name if display name is not set`, () => {
      const FunctionComponentWithoutDisplayName: React.FC = () => <div />

      expect(nameOf(FunctionComponentWithoutDisplayName)).toBe(FunctionComponentWithoutDisplayName.name)
    })

    test(`return Anonymous for inline arrow function`, () => {
      expect(nameOf(() => <div />)).toBe(AnonymousFunctionName)
    })
  })

  describe(`Class Component`, () => {
    test(`return displayName if set`, () => {
      // eslint-disable-next-line react/prefer-stateless-function
      const component = class ClassComponentWithDisplayName extends React.Component {
        public static displayName = displayName
        public render() {
          return <div />
        }
      }

      expect(nameOf(component)).toBe(displayName)
    })

    test(`return prototype.name if display name is not set`, () => {
      // eslint-disable-next-line react/prefer-stateless-function
      const component = class ClassComponentWithoutDisplayName extends React.Component {
        public render() {
          return <div />
        }
      }

      expect(nameOf(component)).toBe(component.name)
    })

    test(`return class name for anonymous class`, () => {
      expect(
        nameOf(
          // eslint-disable-next-line react/prefer-stateless-function
          class ClassComponent extends React.Component {
            public render() {
              return <div />
            }
          }
        )
      ).toBe('ClassComponent')
    })
  })
})
