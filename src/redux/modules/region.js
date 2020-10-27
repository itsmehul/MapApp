import axios from "axios"
import { createActions, handleActions, combineActions } from "redux-actions"

const defaultState = {
  selected: "USA",
  regions: {
    USA: {
      name: "United States of America",
      topLevelDomain: [".us"],
      alpha2Code: "US",
      alpha3Code: "USA",
      callingCodes: ["1"],
      capital: "Washington, D.C.",
      altSpellings: ["US", "USA", "United States of America"],
      region: "Americas",
      subregion: "Northern America",
      population: 323947000,
      latlng: [38.0, -97.0],
      demonym: "American",
      area: 9629091.0,
      gini: 48.0,
      timezones: [
        "UTC-12:00",
        "UTC-11:00",
        "UTC-10:00",
        "UTC-09:00",
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00",
        "UTC-05:00",
        "UTC-04:00",
        "UTC+10:00",
        "UTC+12:00",
      ],
      borders: ["CAN", "MEX"],
      nativeName: "United States",
      numericCode: "840",
      currencies: [{ code: "USD", name: "United States dollar", symbol: "$" }],
      languages: [
        {
          iso639_1: "en",
          iso639_2: "eng",
          name: "English",
          nativeName: "English",
        },
      ],
      translations: {
        de: "Vereinigte Staaten von Amerika",
        es: "Estados Unidos",
        fr: "États-Unis",
        ja: "アメリカ合衆国",
        it: "Stati Uniti D'America",
        br: "Estados Unidos",
        pt: "Estados Unidos",
        nl: "Verenigde Staten",
        hr: "Sjedinjene Američke Države",
        fa: "ایالات متحده آمریکا",
      },
      flag: "https://restcountries.eu/data/usa.svg",
      regionalBlocs: [
        {
          acronym: "NAFTA",
          name: "North American Free Trade Agreement",
          otherAcronyms: [],
          otherNames: [
            "Tratado de Libre Comercio de América del Norte",
            "Accord de Libre-échange Nord-Américain",
          ],
        },
      ],
      cioc: "USA",
    },
  },
}

export const COUNTRIES = {
  India: "IND",
  "United States": "USA",
  "United Kingdom": "GBR",
}

export const { addRegion, removeregion } = createActions({
  ADD_REGION: (region) => ({ region }),
})

export function getRegionDataAsync(region) {
  return (dispatch) =>
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${region}`)
      .then(({ data }) => dispatch(addRegion(data)))
}

const regionReducer = handleActions(
  {
    ADD_REGION: (state, { payload: { region } }) => ({
      ...state,
      selected: region.alpha3Code,
      regions: { [region.alpha3Code]: region },
    }),
  },
  defaultState
)

export default regionReducer
