### Dependencies
Depending on what you have on your computer, you may need the following dependencies installed:

pip3 install flask-cors
pip3 install flask
pip3 install requests

For the UI:
npm install @cloudscape-design/components

### Instructions to run
1. Clone the repository
2. open two terminals, one for backend, one for frontend.
3. change directory into `yelp_backend`, then execute: `python3 server.py`
4. In second terminal, change directory into `yelp_frontend`, then execute: `npm start`

After step (4) the website should automatically appear. You can also visit http://localhost:3000/.


### Requirements
See a list of boba shops within 6 miles (~10,000 meters) of any of these 3 Netflix offices:
    ○ 121 Albright Wy, Los Gatos, CA 95032
    ○ 888 Broadway, New York, NY 10003
    ○ 5808 Sunset Blvd, Los Angeles, CA 90028


● Filter that list by a selectable office location
- This is satisfied by having them as the three selectable items on the UI

● Sort that list by rating and distance (It’s ok to rely upon the built-in Yelp sort function,
even though the rating search doesn’t strictly sort by numerical rating)
- This is satisfied by using the cloudscape table. You can click on the column and sort. I opted for this
    instead of relying on the API as I wasn't super familiar with it.

● A pagination mechanism (such as “load more”) for the list of boba shops (people love
boba!).
- This is satisfied by allowing a user to click "load more" in the UI.

### Final Thoughts
At AWS I primarily code in Python + Flask for my backend, and React + Typescript for the frontend. I followed the
common patterns that I do at work, including using cloudscape and avoiding CSS which is our teams policy. More information
on cloudscape components used here: https://cloudscape.design/components/

If I had more time on the backend I would likely add some tests to confirm that the `parse_query_output` method is
working. I would also add integration tests if there was a pipeline to confirm the endpoints are working.
    -> By and large, the backend is working as intended and it's good to go. Unlike the front end.. (see below)

If I had more time on the frontend I would .... fix so many things. I ran out of time. 
    -> I can't click on the table rows. Not a huge deal, but it looks really strange to have a box and it do nothing.
    -> The error handling on a failed request is horrendous. I just stuck it in a h2 tag. Normally I would
        use an alert: https://cloudscape.design/components/alert/ or something similar.
    -> I want to use a Grid on the items in the container. Right now they're one after another below eachother.
        -> Grid in cloudscape I would use: https://cloudscape.design/components/grid/
    -> There is a "property filter" in cloudscape which is so much nicer to use, didn't have time to put it in
        -> documentation: https://cloudscape.design/components/property-filter/
    -> "load more" works.... BUT the table keeps growing instead of using pages. I looked up how it's supposed to work with cloudscape 
       and realized I didn't have time to figure it out. 
    -> I didn't have time to implement a spinner when it's loading more data. This is poor user experience, there
       is no indication that it's still loading.
    -> Bug - I realized I am not changing the setTotalLocationsFound when search radius or location change. Fortunately I remembered 
       to set setTotalRetrieved so you can click Load More with out having to reload the page.
    -> There is no UI error checking. Normally I would use something like YUP to prevent the user from clicking "Load More" when there
       is an error... instead I let the user click it and the backend errors.

I focused on the core functionality, the backend went smoothly and the frontend had some issues. This makes sense
with my experience, I plan to study this example and continue to improve it in my free time.

### Tracking Time
    - It took 50 hour for me to create the backend code in python.
    - It took ~1 hour for me to get the headers functioning in the YelpHeaders.tsx file.
    - It took ~45 minutes for me to make the custom hook for querying data, confirm data is being returned.
    - It took me ~1 hour to make the table. This was mostly copy/paste from the documentation in cloudscape, 
        however I also used chatgpt to create the sorting method (I mention this in the comment). 
        -> Asides for the sorting method which chatgpt helped with, I googled some syntax, but wrote the rest myself!!
    - This documentation took ~20 minutes. Some of this time was spent testing what I missed on the UI and documenting it.
    - 5 minutes: I had a really annoying bug which I barely fixed in time, the limit parameter can't be > 50 and my backend
      was not handling that correctly. Good news here is I confirmed my <h2> error tag was working by accident

Total time: Approximately 4 hours, I did my best to stop at 4.