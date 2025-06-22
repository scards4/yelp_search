import { Button, Container, FormField, Input, Select } from "@cloudscape-design/components";
import { SelectProps } from "@cloudscape-design/components";
import { searchYelpContent } from "../definitions/searchDefinitions";

/*
-> amount to get + load more
-> drop down to choose the location
    -> Reset the offset when you change location
-> Input for the radius, limit 10,000
-> Show current amount retrieved / total amount

    ○ 121 Albright Wy, Los Gatos, CA 95032
    ○ 888 Broadway, New York, NY 10003
    ○ 5808 Sunset Blvd, Los Angeles, CA 90028

*/

interface YelpHeadersProps {
    radius: string;
    setRadius: (radius: string) => void;
    location: SelectProps.Option | null;
    setLocation: (location: SelectProps.Option) => void;
    amountToGet: SelectProps.Option | null;
    setAmountToGet: (amount: SelectProps.Option) => void;
    setTotalRetrieved: (amount: number) => void;
    totalRetrieved: number;
    totalLocations: number;
    setYelpItems: (yelpItems: searchYelpContent[]) => void;
    getMoreLocations: () => void;
}

const locationOptions: SelectProps.Option[] = [
    {label: "121 Albright Wy, Los Gatos, CA 95032", value: "121 Albright Wy, Los Gatos, CA 95032"},
    {label: "888 Broadway, New York, NY 10003", value: "888 Broadway, New York, NY 10003"},
    {label: "5808 Sunset Blvd, Los Angeles, CA 90028", value: "5808 Sunset Blvd, Los Angeles, CA 90028"},
]

const amountToGetOptions: SelectProps.Option[] = [
    {label: "10", value: "10"},
    {label: "25", value: "25"},
    {label: "50", value: "50"},
]

const YelpHeaders = ({
    radius, setRadius, location, setLocation, amountToGet, setAmountToGet, setTotalRetrieved, totalRetrieved, totalLocations, setYelpItems, getMoreLocations
    }: YelpHeadersProps) => {
    
    const getLocations = () => {
        getMoreLocations()
    }


    let allowLoad: boolean = radius != null && location != null && amountToGet != null
    let disabledReason = ""
    if(!allowLoad) {
        disabledReason = "you have not entered items in all fields"
    }
    // I kind of hate this because this assumes we always get output back. On a time crunch.
    if(totalLocations > 0) {
        if(totalRetrieved >= totalLocations) {
            disabledReason = "You have loaded as many results as found in the radius"
            allowLoad = false;
        }
    }
    return (
        <Container>
            <FormField label="Select Location">
                <Select
                    selectedOption={location}
                    onChange={({detail}) => {
                        setLocation(detail.selectedOption)
                        setYelpItems([])
                        setTotalRetrieved(0)
                    }}
                    options={locationOptions}
                />
            </FormField>
            <FormField label="Enter Search Radius">
                <Input
                    value={radius}
                    onChange={({detail}) => {
                        setRadius(detail.value)
                        setYelpItems([])
                        setTotalRetrieved(0)
                    }}
                    inputMode="numeric"
                    type="number"
                />
            </FormField>
            <FormField label="Amount To Get">
                <Select
                    selectedOption={amountToGet}
                    onChange={({detail}) => setAmountToGet(detail.selectedOption)}
                    options={amountToGetOptions}
                />            
            </FormField>
            <div>
                Total Retrieved: {totalRetrieved} / {totalLocations}
            </div>
            <Button
                disabled={!allowLoad}
                disabledReason={disabledReason}
                onClick={getLocations}
            >Load More</Button>
        </Container>
    )
}

export default YelpHeaders;

