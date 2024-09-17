import { useEffect, useState } from "react"

const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/location/")
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setLocations(data)
                } else {
                    console.error("failed to fetch locations")
                }
            } catch (error) {
                console.error("Error fetching data ", error)
            }
        }

        fetchLocations()
    }, [])
    return(
        <div>
            <h1>Locations</h1>
        </div>
    )
}
export default LocationList
