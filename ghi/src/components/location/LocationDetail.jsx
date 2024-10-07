import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_KEY } from "../../assets/ApiKeys.js"

function LocationDetail() {
    const { id } = useParams()
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchLocationDetails = async () =>{
            try {
                const url = `http://localhost:8000/api/location/${id}`
                const response = await fetch(url)
                if (response.ok) {
                    const data = await response.json()
                    setLocations(data)
                    console.log(data)
                } else {
                    console.error("failed to fetch location details")
                }
            } catch (error) {
                console.error('Error fetching data ', error)
            }
        }


        fetchLocationDetails()
    }, [])

    const name = String(locations.name)
    const city = String(locations.city)
    const convertedName = name.split(' ').join('+')
    const convertedCity = city.split(' ').join('+')
    const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${convertedName},${convertedCity}+${locations.state}`

    return (
        <>
            <div className="container row">
                <header className="text-white">
                    <h1>{locations.name}</h1>
                    <h2>
                        {locations.address}, {locations.city}, {locations.state}
                    </h2>
                    <h2>Venue type: {locations.store_type}</h2>
                </header>
                <div className="details-container">
                    <iframe
                        width="450"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapsUrl}
                    ></iframe>
                </div>
            </div>
        </>
    )
}
export default LocationDetail
