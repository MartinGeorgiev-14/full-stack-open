import { useState, useEffect } from 'react'
import service from "./services/countries"
import weatherService from "./services/weather"
import { all } from 'axios'
import Content from './Content'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    service.getAll()
    .then(response => setAllCountries(response))
  },[])

  const handleFindCountries = (event) => {
    const searched = event.target.value.toLowerCase()
    
    if(searched){
      const filtered = allCountries.filter(country => {
        const lowerCountry = country.name.common.toLowerCase()
        
        return lowerCountry.includes(searched)
      })

      setFilteredCountries(filtered)
    }
    else{
      setFilteredCountries([])
    }

   
  }

  // console.log(weatherInfo)
  return (
    <>
     <form>
      <label>find countries: </label>
      <input type='text'onChange={handleFindCountries}/>
     </form>
     <Content countries={filteredCountries} />
    </>
  )
}

export default App
