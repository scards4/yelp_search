import { Box, CollectionPreferences, Header, Link, SpaceBetween, Table, TextFilter } from "@cloudscape-design/components";
import { searchYelpContent } from "../definitions/searchDefinitions";
import { useState } from "react";


interface YelpTableProps {
    yelpItems: searchYelpContent[]
}

type SortingColumnType = {
  sortingField?: string;
};

const YelpTable = ({yelpItems}: YelpTableProps) => {
    const [sortingColumn, setSortingColumn] = useState<SortingColumnType | undefined>(undefined);
    const [isDescending, setIsDescending] = useState<boolean>(false);
    const [filteringText, setFilteringText] = useState("");


    // Full disclosure: I copied the table code directly from: https://cloudscape.design/components/table/
    //  -> I then changed the table code to work for my stuff. Normally at my job I have all of this with smart filters as 
    //      boiler plate code, however for this I didn't use any of that and I went right from the documentation
    //  -> the I didn't write this sort code, I had an LLM make it for me. At work we have this working as part of the boiler plate, I 
    //      thought it would be okay to get help here.
    const sortedItems = [...yelpItems].sort((a, b) => {
        if (!sortingColumn) return 0;
        const field = sortingColumn.sortingField;
        const aVal = a[field as keyof searchYelpContent];
        const bVal = b[field as keyof searchYelpContent];

        if (aVal === bVal) return 0;
        if (aVal == null) return isDescending ? 1 : -1;
        if (bVal == null) return isDescending ? -1 : 1;

        if (typeof aVal === "number" && typeof bVal === "number") {
        return isDescending ? bVal - aVal : aVal - bVal;
        }

        return isDescending
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });
    const filteredItems = sortedItems.filter(item =>
    Object.values(item).some(value =>
        String(value).toLowerCase().includes(filteringText.toLowerCase())
    )
    );

    return (
        <Table
        renderAriaLive={({
            firstIndex,
            lastIndex,
            totalItemsCount
        }) =>
            `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        
        
        ariaLabels={{
            selectionGroupLabel: "Items selection",
            allItemsSelectionLabel: () => "select all",
            itemSelectionLabel: ({ selectedItems }, item) =>
            item.name
        }}
        columnDefinitions={[
            {
                id: "name",
                header: "Restaurant Name",
                cell: item => item.name,
                sortingField: "name",
                isRowHeader: true
            },
            {
                id: "displayPhone",
                header: "Phone Number",
                cell: item => item.displayPhone,
            },
            {
                id: "price",
                header: "Price",
                cell: item => item.price,
                sortingField: "price",
            },
            {
                id: "id",
                header: "Identifier",
                cell: item => item.rating
            },
            {
                id: "rating",
                header: "Rating",
                cell: item => item.rating,
                sortingField: "rating",
            },
            {
                id: "reviewCount",
                header: "Review Count",
                cell: item => item.reviewCount,
                sortingField: "reviewCount",
            },
            {
                id: "url",
                header: "Restaurant URL",
                cell: item =>   <Link href={item.url} external>
                                    Website URL
                                </Link>,
                sortingField: "url",
            },
        ]}
        columnDisplay={[
            { id: "name", visible: true },
            { id: "displayPhone", visible: true },
            { id: "price", visible: true },
            { id: "id", visible: false },
            { id: "rating", visible: true },
            { id: "reviewCount", visible: true },
            { id: "url", visible: true },
        ]}
        enableKeyboardNavigation
        items={filteredItems}
        sortingColumn={sortingColumn}
        sortingDescending={isDescending}
        onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setIsDescending(detail.isDescending ?? false);
        }}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="id"
        empty={
            <Box
            margin={{ vertical: "xs" }}
            textAlign="center"
            color="inherit"
            >
            <SpaceBetween size="m">
                <b>No Items</b>
            </SpaceBetween>
            </Box>
        }
        filter={
            <TextFilter
            filteringPlaceholder="Find resources"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
            />
        }
        header={
            <Header
            >
            Yelp Items Table
            </Header>
        }

        preferences={
            <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"

            preferences={{
                pageSize: 10,
                contentDisplay: [
                    { id: "name", visible: true },
                    { id: "displayPhone", visible: true },
                    { id: "price", visible: true },
                    { id: "id", visible: false },
                    { id: "rating", visible: true },
                    { id: "reviewCount", visible: true },
                    { id: "url", visible: true },
                ]
            }}
            pageSizePreference={{
                title: "Page size",
                options: [
                { value: 10, label: "10 resources" },
                { value: 20, label: "20 resources" }
                ]
            }}
            contentDisplayPreference={{
                options: [

                { id: "name", label: "Name" },
                { id: "displayPhone", label: "Display Phone" },
                { id: "price", label: "Price" },
                { id: "id", label: "Identifier" },
                { id: "rating", label: "Rating" },
                { id: "reviewCount", label: "Review Count" },
                { id: "url", label: "URL" },
                ]
            }}
            />
        }
        />
    );
}


export default YelpTable;

