import React, {useState,useEffect} from "react";
import States from "../../assets/states"

const CreateLocation = () => {
    const [getState, setGetState] = useState([])
    const getStates = async () => {
        const listStates = States()
        setGetState(listStates.state)
    }

    useEffect(() => {
        getStates()
    }, [])


    const [name, setName] = useState('')
    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const [address, setAddress] = useState('')
    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const [city, setCity] = useState('')
    const handleCityChange = (event) => {
        const value = event.target.value
        setCity(value)
    }

    const [state, setState] = useState('')
    const handleStateChange = (event) => {
        const value = event.target.value
        setState(value)
    }

    const [storeType, setStoreType] = useState('')
    const handleStoreTypeChange = (event) => {
        const value = event.target.value
        setStoreType(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.name = name
        data.city = city
        data.state = state
        data.store_type = storeType

        const url = 'http://localhost:8000/api/location/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const response =  await fetch(url,fetchConfig)
            if (response.ok) {
                const newLocation = await response.json()
                console.log(newLocation)
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error("Fetch error", error)
        }
    }

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange}
                            placeholder="Name"
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAddressChange}
                            placeholder="Address"
                            type="text"
                            name="address"
                            id="address"
                            className="form-control"
                             />
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCityChange}
                            placeholder="City"
                            type="text"
                            name="city"
                            id="city"
                            className="form-control"
                             />
                        </div>
                        <div className="form-floating mb-3">
                            <select
                            name="state"
                            id="state"
                            value={getState.state}
                            onChange={handleStateChange}
                            className="form-select"
                            >
                                <option value="">State</option>
                                {getState.map((states) => (
                                    <option key={states.name} value={states.abbreviation}>
                                        {states.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStoreTypeChange}
                            placeholder="Store Type"
                            type="text"
                            name="storeType"
                            id="storeType"
                            className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateLocation
