import * as React from 'react'

export type ArgsObjPrimitives = {
  [key: string]: string | number
}

export type ArgsObjJsx = {
  [key: string]: string | number | React.ReactNode
}

export type FArgsPrimitives = (string | number | ArgsObjPrimitives)[]

export type FArgsJsx = (React.ReactNode | ArgsObjJsx)[]

export type FArgs = (string | number | ArgsObjPrimitives | React.ReactNode | ArgsObjJsx)[]
