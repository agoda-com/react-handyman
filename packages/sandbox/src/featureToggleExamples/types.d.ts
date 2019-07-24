interface Config {
  items: string[]
}

// eslint-disable-next-line import/prefer-default-export
export interface Features {
  myFeature: {}
  myOtherFeature: {}
  myFeatureWithConfig: Config
}
