export interface FeatureWithConfig {
  items: string[]
}

export interface Features {
  simpleFeature: {}
  featureWithConfig: FeatureWithConfig
  undefinedFeature: undefined
  disabledFeature: {}
  disabledFeatureWithConfig: FeatureWithConfig
}

export const features: Partial<Features> = {
  simpleFeature: {},
  featureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
  undefinedFeature: undefined,
  //disabledFeature: {},
  //disabledFeatureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
}
