import { useState, useEffect } from 'react'
import axios from 'axios'



const CountryData = (props) => {
  let filteredCountriesData = props.filteredCountries

  const searchCountryData = (event, root, suffixes) => {
    console.log("root", root, suffixes)
    filteredCountriesData = props.countries.filter(country=>(country.idd.root === root && country.idd.suffixes === suffixes))
    props.setCountry(filteredCountriesData[0])
    props.status = true
    console.log("search country data", props.country)
  }

  console.log("masuk country data", )
  if (filteredCountriesData.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (filteredCountriesData.length > 1 && filteredCountriesData.length < 10) {
      return (
        <div>
          <ul>
          {filteredCountriesData.map(country => 
            <li key={country.idd.root + country.idd.suffixes}>
              {country.name.common}
              <button onClick={(event)=>searchCountryData(event, country.idd.root, country.idd.suffixes)}>Show</button>
            </li>
          )}
          </ul>
        </div>
      )
    }
}

const CountryInfo = (props) => {
  console.log("masuk country info", props.country)
  
  const visit = (obj, fn) => {
    const values = Object.values(obj)
  
    values.forEach(val => 
        val && typeof val === "object" ? visit(val, fn) : fn(val))
  }

  if (props.filteredCountries.length === 1 || props.status === true){
    props.setCountry(props.filteredCountries[0])
    console.log("country info", props.country)
    let languagesData= []

    visit(props.country.languages, (val) => {
      languagesData.push(val)  
    })

    console.log("language data", languagesData)

    return (
      <div> 
          <h2>{props.country.name.common}</h2>
          <div>Capital {props.country.capital[0]}</div>
          <div>Area {props.country.area}</div>
          <h3>Languages</h3>
          <ul>
            {languagesData.map(data => 
              <li key={data}>
                {data}
              </li>
            )}
          </ul>
          <div><img src={props.country.flags.png} alt="new"/></div>    
      </div>
    )
  }
  else{
    return(<p>masuk ke p, ini isi filteredCountries</p>)
  }
}

const App = () => {

  const [countries, setCountries] = useState([]) 
  const [searchText, setSearchText] = useState('')
  const [country, setCountry] = useState({})
  let status = false
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  let filter = ""
  let filteredCountries = []

  if (searchText !== "" ){
      filter = searchText.toLowerCase()
      filteredCountries = countries.filter(country=>(country.name.common).toLowerCase().includes(filter))      
  }
  
  return (
    <div>
      <h2>Data for countries</h2>
      <div>
            find countries <input onChange={handleSearchChange}/>
      </div>
      <CountryData countries={countries} setCountries={setCountries} filteredCountries={filteredCountries}></CountryData>
      <CountryInfo country={country} setCountry={setCountry} filteredCountries={filteredCountries} status={status}></CountryInfo>
      
    </div>
  );
}

export default App;
