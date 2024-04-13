import { useState, useEffect } from "react"
import "./content.css"
import weatherService from "./services/weather"

const Content = ({ countries }) => {

    const [visibleText, setVisibleText] = useState([])
    const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(() => {
        
        if(countries.length < 10 && countries.length >= 1){
            
            const weaters = countries.map(element => {
            return  weatherService.getWeather(element.latlng[0], element.latlng[1])
            });
            
            Promise.all(weaters).then(result => {
                setWeatherInfo(result)
            })
        }
       

    }, [countries])



    const toggleVisibility = (index) => {
        setVisibleText(prevState => {
            const newState = [...prevState]
            newState[index] = !newState[index]
            return newState
        })
    }

    const displayCountry = (index, toggle) => {
        const country = countries[index]
        const capitalWeather = weatherInfo[index]        
        
        if(capitalWeather){
            return (
                <div className={toggle}>
                    <h1>{country.name.common}</h1>
                    <div>
                        <p>capital: {country.capital}
                            <br />
                            area: {country.area}
                        </p>
    
                    </div>
                    <h3>languages:</h3>
                    <ul>
                        {
                            Object.values(country.languages).map(l => <li key={l}>{l}</li>)
                        }
                    </ul>
                    <img src={country.flags.png} alt={country.flags.alt} />
                    <div>
                        <h3>Weather in {country.capital}</h3>
                        <img src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} alt="" />
                        <p>Temperature {(capitalWeather.main.temp - 272.15).toFixed(2)} Celsius</p>
                    </div>
                </div>
            )
        }

        
    }

    const handleReturn = () => {
        if (countries.length === 1) {
            return displayCountry(0, "show")
        }
        else if (countries.length < 10) {
            return (
                <>
                    {countries.map((c, i) => {
                        return (
                            <div key={c.name.common + "-div"} className="row">
                                <p key={c.name.common}>{c.name.common} <button onClick={() => toggleVisibility(i)} key={c.name.common + "-button"}>{visibleText[i] ? "hide" : "show"}</button></p>
                                {visibleText[i] ? displayCountry(i, "show") : displayCountry(i, "hidden")}
                            </div>
                        )
                    })}
                </>
            )
        }
        else if (countries.length > 10) {
            return (
                <>
                    <p>Too many matches, specify another filter</p>
                </>
            )
        }
    }

    return (
        <>
            {handleReturn()}
        </>
    )
}

export default Content