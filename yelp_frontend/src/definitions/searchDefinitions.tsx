// This is the output from the API.
export interface searchYelpContent {
    name: string;
    displayPhone: string;
    id: string;
    price: string;
    rating: number;
    reviewCount: number;
    url: string;
}

export interface searchYelpOutput {
    content: searchYelpContent[]
    totalItems: number
}

export interface useSearchProps {
    location: string;
    amountToGet: string;
    radius: string;
    totalRetrieved: number;
}