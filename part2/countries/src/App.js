import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({countries}) => {
  if(countries.length >= 10){
    return (
      "Too many matches"
    )
  }else if(countries.length > 1){
    return (
      <div>
          {countries.map((country,index1) => 
          <p key={index1}>{country.name}</p>
      )}
    </div>
    )
  }else if(countries.length === 1){
    return (
      <div>
          {countries.map((country,index1) => 
        <CountryDetails key={index1} country={country}/>
      )}
    </div>
    )
  }else{
    return (
      "No matches"
    )
  }
}

const CountryDetails = ({country}) => {
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
    </div>
  )
}

const App = () => {
  
  const [countries, setCountries] = useState([])
    
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const [newFilter, setNewFilter] = useState('')

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

  console.log('render', countries.length, 'countries')
  console.log(countries)



  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    const filtered = countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(filtered)
  }

  return (
    <div>
        <div>find countries: <input value={newFilter} onChange={handleFilterChange}/></div>

  
      
      <Countries countries={filteredCountries} />

    </div>
  )
}

export default App