import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { convertSpaces } from "../../utils"

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
    const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCdG1XCUBYkXysiPi1E8cc6UqCR8OvRW5M&q=${convertedName},${convertedCity}+${locations.state}`

    return (
        <>
            <div className="card mse-5">
                <h1 className="card-title">{locations.name}</h1>
                <p className="card-text">{locations.address}, {locations.city}, {locations.state}</p>

                <iframe
                width="800"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsUrl}
                className="m-3"
                ></iframe>
                <p>Business  Type : {locations.store_type}</p>
            </div>
        </>
    )
}
export default LocationDetail
