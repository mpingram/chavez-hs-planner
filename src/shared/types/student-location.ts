interface StudentLocation {
  address: string | null
  tier: string | null
  geo: {
    latitude: number | null
    longitude: number | null
  }
}

export {StudentLocation};
