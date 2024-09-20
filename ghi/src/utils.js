/** This helper function wraps itself around fetch
 *  And converts thrown errors into returned errors.
 */
export async function tryFetch(url, options) {
    // Wrap everything in a try catch
    try {
        const response = await fetch(url, options)
        // Check for non-200 response codes and throw an error about the response
        if (!response.ok) {
            // We can throw here because our catch will return it
            throw new Error(
                `Fetch Error - ${response.status} - ${response.statusText}`
            )
        }
        const data = await response.json()
        // If everything went well, we return the JSON parsed Data here
        return data
    } catch (e) {
        if (e instanceof Error) {
            // This is where we return any errors instead of throwing them
            return e
        }
        return new Error('Unknown error while fetching')
    }
}

export async function convertSpaces(string) {
    return string.split(' ').join('+')
}

export function mapsApiCall(name, city, state) {
        try {
            const apiHeader = ('https://www.google.com/maps/embed/v1/place?key=AIzaSyCdG1XCUBYkXysiPi1E8cc6UqCR8OvRW5M&q=')
            const concatedApi = apiHeader + name + "," + city + "+" + state
            const foramtedApi = convertSpaces(concatedApi)
            return foramtedApi
        } catch (error) {
            console.error("error creating google api call: ", error)
        }
    }
