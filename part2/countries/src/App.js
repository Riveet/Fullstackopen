import axios from 'axios'
import { useState, useEffect } from 'react'

const url = 'https://restcountries.com/v3.1/all'
const apiKey = process.env.REACT_APP_API_KEY
const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=`

function App() {
  const [countries, setCountries] = useState()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [weatherData, setWeatherData] = useState([])
  const [weatherQuery, setWeatherQuery] = useState('Norway')

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url)
      const data = await response.data
      setCountries(data)
      // setFilter(data.slice(0, 10))
      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }

  const fetchWeatherData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${weatherUrl}${weatherQuery}`)
      const data = await response.data
      console.log(data)
      setWeatherData(data)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
    fetchWeatherData()
  }, [weatherQuery])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const findCountry = (e) => {
    e.preventDefault()
    const countryFilter = countries.filter((country) => {
      const name = country.name.common.toLowerCase()
      return name.startsWith(search.toLowerCase())
    })
    setFilter(countryFilter)
    if (countryFilter.length === 1) {
      setWeatherQuery(countryFilter[0].name.common)
    }
  }

  const showMore = (name) => {
    const countryArr = countries.find((country) => country.name.common === name)
    setFilter([countryArr])
    setWeatherQuery(name)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h2>Something went wrong</h2>
  }

  // if (filter.length === 0) {
  //   return <p>No country matched your search</p>
  // }

  return (
    <>
      <form onSubmit={findCountry}>
        <label>Find countries</label>
        <input value={search} onChange={handleChange} />
      </form>
      <div>
        {filter && filter.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filter.length === 1 ? (
          <div>
            <h1>{filter[0].name.common}</h1>
            <p>Capital: {filter[0].capital}</p>
            <p>Population: {filter[0].population}</p>
            <h2>Languages</h2>
            {Object.values(filter[0].languages).map((lang, index) => {
              return <li key={index}>{lang}</li>
            })}
            <img
              src={filter[0].flags.png}
              alt='flag'
              style={{ marginTop: '10px' }}
            />
            <h2>Weather in {filter[0].capital}</h2>
            <p>
              <strong>Temperature:</strong> {weatherData.current.temperature}{' '}
              celcius
            </p>
            <img
              src={weatherData.current.weather_icons[0]}
              alt='weather icon'
            />
            <p>
              <strong>Wind:</strong> {weatherData.current.wind_speed} mph
              direction {weatherData.current.wind_dir}
            </p>
          </div>
        ) : (
          filter.map((country, index) => {
            return (
              <div key={index}>
                <p>
                  {country.name.common}{' '}
                  <button onClick={() => showMore(country.name.common)}>
                    show
                  </button>
                </p>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default App
