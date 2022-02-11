import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fetchData = async (url) => {
    const response = await axios.get(url)
    return response
  }

  useEffect(async () => {
    const data = await fetchData(
      `https://restcountries.com/v2/name/${name}?fullText=true`
    )
    console.log(data)
    setCountry(data)
  }, [name])

  return country
}
