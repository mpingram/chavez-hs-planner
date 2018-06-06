interface StudentLocation {
  address: string
  tier: string | null
  geo: {
    latitude: number
    longitude: number
  } | null
}

export {StudentLocation};
