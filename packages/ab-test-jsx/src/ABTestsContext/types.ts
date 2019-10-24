export type Variant = 'A' | 'B'

export interface ABTests {
  [key: string]: Variant | undefined
}
