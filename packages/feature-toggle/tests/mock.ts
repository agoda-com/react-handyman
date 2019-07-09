export interface Features {
  simpleFeature: {}
  featureWithConfig: { items: string[] }
  disabledFeature: {}
  disabledFeatureWithConfig: { items: number[] }
}

export const features: Partial<Features> = {
  simpleFeature: {},
  featureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
  //disabledFeature: {},
  //disabledFeatureWithConfig: { items: ['these', 'are', 'my', 'config', 'items'] },
}
