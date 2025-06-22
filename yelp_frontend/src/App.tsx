import YelpController from "./yelp_search/YelpController";

function App() {
  /*
  Container with:
    -> amount to get + load more
    -> drop down to choose the location
      -> Reset the offset when you change location
    -> Input for the radius, limit 10,000
    -> Show current amount retrieved / total amount

  Table:
    -> Columns + filter
    
  
  */


  return (
    <YelpController/>
  );
}

export default App;
