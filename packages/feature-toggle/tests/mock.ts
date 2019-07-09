export interface Features {
  simpleFeature: {}
  featureWithConfig: { items: string[] }
  undefinedFeature: undefined
  disabledFeature: {}
  disabledFeatureWithConfig: { items: number[] }
}

export const features: Partial<Features> = {
  simpleFeature: {},
  featureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
  undefinedFeature: undefined,
  //disabledFeature: {},
  //disabledFeatureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
}
