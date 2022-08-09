import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const Countries = ({countries,handleCountryClick, weather}) => {
  if(countries.length >= 10){
    return (
      "Too many matches"
    )
  }else if(countries.length > 1){
    return (
      <div>
          {countries.map((country,index1) => 
          <p key={index1}>{country.name}<button onClick={() => handleCountryClick(country.name)}>show</button></p>
      )}
    </div>
    )
  }else if(countries.length === 1){
    return (
      <div>
          {countries.map((country,index1) => 
        <CountryDetails key={index1} country={country} weather={weather}/>
      )}
    </div>
    )
  }else{
    return (
      "No matches"
    )
  }
}

const CountryDetails = ({country,weather}) => {
  return (
    <div>
      <h2> {country.name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p>population {country.population}</p>
      <h3>languages:</h3>
      {country.languages.map((language) => 

        <p key={language.name}>{language.name}</p>
  )}
  <img src={country.flags.svg} alt={`Flag for $country.name`} width="200em" />
      <Weather  weather={weather}/>
    </div>
  )
}

const Weather = ({weather}) => {
  console.log(weather)
  return (
    <div>
      <h2>Weather in {weather?.name}</h2>
      <p>Weather {weather?.weather[0]?.description} {weather?.main.temp}&#176; Celcius</p>
      <p>wind deg {weather?.wind.deg}</p>
      <img src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} width="200em" />
    </div>
  )
}


const App = () => {
  
  const [countries, setCountries] = useState([])
    
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const [newFilter, setNewFilter] = useState('')

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  


  useEffect(() => {
    console.log('effect2')
    if(filteredCountries.length==1){
      let lat = filteredCountries[0].latlng[0]
      let lon = filteredCountries[0].latlng[1]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
      })
    }
  }, [filteredCountries])
  const handleCountryClick = countryName => {
    setNewFilter(countryName)
    const filtered = countries.filter((country) => country.name.toLowerCase().includes(countryName.toLowerCase()))
    setFilteredCountries(filtered)
  }

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    const filtered = countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(filtered)
  }

  return (
    <div>
        <div>find countries: <input value={newFilter} onChange={handleFilterChange}/></div>

  
      
      <Countries countries={filteredCountries} handleCountryClick={handleCountryClick} weather={weather} />

    </div>
  )
}

export default App