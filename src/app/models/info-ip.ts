export interface IResultIP {
  ip: string,
  location: {
    city: string,
    country: string,
    region: string,
    timezone: string,
    lat: number,
    lng: number,
    postalCode: string
    geonameId: number
  },
  domains: string[],
  as: {
    asn: number,
    name: string,
    route: string,
    domain: string,
    type: string,
  },
  isp: string
}

export interface ILocalIP {
  ip: string
}
