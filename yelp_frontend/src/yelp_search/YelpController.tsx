import { SelectProps, SpaceBetween } from "@cloudscape-design/components";
import YelpHeaders from "./YelpHeaders";
import YelpTable from "./YelpTable";
import { useState } from "react";
import { searchYelpContent, searchYelpOutput, useSearchProps } from "../definitions/searchDefinitions";
import { useSearchYelp } from "./api_calls/useSearchYelp";

/*
Basic functionality I need to support: 
CONTAINER:
--
-> amount to get + load more
-> drop down to choose the location
    -> Reset the offset when you change location
-> Input for the radius, limit 10,000
-> Show current amount retrieved / total amount
TABLE:
--
-> get the data and put it in the table

*/

const YelpController = () => {
    const [radius, setRadius] = useState<string>("")
    const [location, setLocation] = useState<SelectProps.Option | null>(null)
    const [totalRetrived, setTotalRetrieved] = useState<number>(0)
    const [amountToGet, setAmountToGet] = useState<SelectProps.Option | null>(null)
    const [totalLocationsFound, setTotalLocationsFound] = useState<number>(0)
    const [yelpItems, setYelpItems] = useState<searchYelpContent[]>([])
    const [errorState, setErrorState] = useState<string>("")

    const updateYelpItems = (queryOutput: searchYelpOutput) => {
        let newYelpItems = [...queryOutput.content]
        if(yelpItems != null) {
            newYelpItems = [...yelpItems, ...newYelpItems]
        }
        if(newYelpItems.length == 0){
            setErrorState("No Items Returned")
        }
        setYelpItems(newYelpItems)
        setTotalRetrieved(newYelpItems.length)
        setTotalLocationsFound(queryOutput.totalItems)
    }

    const search = useSearchYelp({updateYelpItems, setErrorState})

    const getMoreLocations = () => {
        setErrorState("")
        const givenLocation = location?.value || ""
        const givenAmountToGet = amountToGet?.value || ""
        const searchArguments: useSearchProps = {
            location: givenLocation,
            amountToGet: givenAmountToGet,
            radius: radius,
            totalRetrieved: totalRetrived
        }
        search(searchArguments)
    }

    return (
        <SpaceBetween size="m">
            {errorState.length > 0 && <div><h2>ERROR: {errorState}</h2></div>}
            <YelpHeaders
                radius={radius}
                setRadius={setRadius}
                location={location}
                setLocation={setLocation}
                amountToGet={amountToGet}
                setAmountToGet={setAmountToGet}
                setTotalRetrieved={setTotalRetrieved}
                totalRetrieved={totalRetrived}
                totalLocations={totalLocationsFound}
                getMoreLocations={getMoreLocations}
                setYelpItems={setYelpItems}
            />
            <YelpTable yelpItems={yelpItems}/>
        </SpaceBetween>
    )
}

export default YelpController;

