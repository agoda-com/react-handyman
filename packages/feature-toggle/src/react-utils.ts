import * as React from 'react'

export const AnonymousFunctionName = 'Anonymous'

// taken from https://github.com/bvaughn/react-devtools-experimental/blob/39a811debee5a520d3a6034b429e8877e11331aa/src/utils.js#L43-L49
export const nameOf = (component: React.ComponentType<any>) =>
  // displayName will be undefined when `Component` is a functional component
  component.displayName || component.name || AnonymousFunctionName
