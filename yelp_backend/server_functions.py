import requests

# This queries the API with the given inputs and returns the raw data
def query_yelp(API_KEY, location, radius, query_limit, offset):
    try:
        url = f"https://api.yelp.com/v3/businesses/search?location={location}&radius={radius}&limit={query_limit}&offset={offset}"
        headers = {
            "accept": "application/json",
            "authorization": f"Bearer {API_KEY}"
        }
        response = requests.get(url, headers=headers)
        response = response.json()
        if "error" in response:
            print("Failed on url: " + str(url))
            print(response)
            error = response["error"]["description"]
            return None, f"Error when querying for data. Error: {error}"
        return response, None
    except Exception as e:
        # Security at AWS frowns on returning errors to the UI. This is how we normally do it.
        print("ERROR: " + str(e))
        return None, f"Error when querying for data. See backend for more information"


"""
I decided on the following keys as being "relevant" for the user. 
    - name
    - display_phone
    - id (needed for uniqueness on UI)
    - price
    - rating
    - review_count
    - url

This method loops through all of the output and returns a simple list of dictionaries with the keys.

Note - I normally keep this method separate because multiple queries will utilize a method like this.
"""

def parse_query_output(query_output):
    output = []
    for item in query_output["businesses"]:
        output.append({
            "name": item["name"],
            "displayPhone": item["display_phone"],
            "id": item["id"],
            "price": item.get("price", "N/A"),
            "rating": item["rating"],
            "reviewCount": item["review_count"],
            "url": item["url"]
        })
    total_items = query_output["total"]
    return output, total_items
