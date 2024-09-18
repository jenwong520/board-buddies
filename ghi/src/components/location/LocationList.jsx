import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

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
        <h1 className="text-bg-dark">Locations</h1>
        {locations.map((location) => (
        <div className="row" key={location.id}>
            <NavLink className="card mb-3" to={"/location/" + location.id}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" alt="" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{location.name}</h2>
                            <p className="card-text">ID check: {location.id}</p>
                            {/* <p className="card-text">{location.city}, {location.state}</p> */}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
        ))}
    </div>
    )
}
export default LocationList
