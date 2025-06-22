import { searchYelpContent, searchYelpOutput, useSearchProps } from "../../definitions/searchDefinitions";


interface useSearchYelpProps {
    updateYelpItems: (yelpItems: searchYelpOutput) => void;
    setErrorState: (err: string) => void;
}

export function useSearchYelp({
    updateYelpItems, setErrorState
    }: useSearchYelpProps): (args: useSearchProps) => void {
        const search = ({location, amountToGet, radius, totalRetrieved}: useSearchProps) => {
            const API = `http://127.0.0.1:5000/search?office_location=${location}&query_limit=${amountToGet}&radius=${radius}&offset=${totalRetrieved}`
            fetch(API).then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    const errorMsg = data?.error || `HTTP ${response.status}`;
                    setErrorState(errorMsg);
                    throw new Error(errorMsg);
                }
                return data;
            }).then((yelpItems: searchYelpOutput) => {
                updateYelpItems(yelpItems)
            }).catch((err) => {
                console.log("ERROR: ", err)
            })
        }
        return search
}


