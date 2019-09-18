export interface Feature {
  isEnabled: boolean
}

export interface FeatureConfig {
  [key: string]: Feature
}
