import * as React from 'react'

export type ArgsObj = {
  [key: string]: string | number
}

export type ArgsObjJsx = {
  [key: string]: string | number | React.ReactNode
}

export type FArgsPrimitives = (string | number | ArgsObj)[]

export type FArgs = (string | number | ArgsObj | React.ReactNode | ArgsObjJsx)[]
