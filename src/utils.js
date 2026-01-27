export const FUEL_MAP = {
  Petrol: 1,
  Diesel: 2,
  Cng: 3,
  Lpg: 4,
  Electric: 5,
  Hybrid: 6
};

export const SORT_TYPE = {
  BEST_MATCH: { so: -1, sc: -1 },
  PRICE_LOW_TO_HIGH: { so: 0, sc: 2 },
  PRICE_HIGH_TO_LOW: { so: 1, sc: 2 },
  YEAR_NEWEST_TO_OLDEST: { so: 1, sc: 0 },
  KMS_LOW_TO_HIGH: { so: 0, sc: 3 },
  DISTANCE_NEAREST_FIRST: { so: 0, sc: 10 },
};

export const MAKE_MAP = {
  "AstonMartin": 49,
  "Audi": 18,
  "Bentley": 22,
  "BMW": 1,
  "Bugatti": 47,
  "Ford": 5,
  "Honda": 7,
  "Hyundai": 8,
};

export function getCityOptions(search , CITY_MAP) {
  return Object.entries(CITY_MAP)
    .filter(([cityName]) =>
      cityName.toLowerCase().includes(search.toLowerCase())
    )
    .map(([cityName, cityId]) => ({
      cityName,
      cityId
    }))
}

export const POPUlAR_CITY_MAP = {
  "Mumbai": 1,
  "Delhi": 10,
  "Bangalore": 2,
  "Chennai": 176,
  "Hyderabad": 105,
  "Kolkata": 198,
  "Pune": 12,
  "Ahmedabad": 128,
  "Coimbatore": 177,
}
