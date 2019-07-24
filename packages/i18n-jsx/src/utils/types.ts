import * as React from 'react'

export interface ArgsObj {
  [key: string]: string | number
}

export interface ArgsObjJsx {
  [key: string]: string | number | React.ReactNode
}

export type FArgsPrimitives = (string | number | ArgsObj)[]

export type FArgs = (string | number | ArgsObj | React.ReactNode | ArgsObjJsx)[]
