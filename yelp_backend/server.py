import sys
import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from server_functions import query_yelp, parse_query_output


app = Flask(__name__)
CORS(app)

# Recommended to put this in your ~/.bashrc file, but you can hard code it also.
API_KEY = os.getenv("YELP_API_KEY", "")
if API_KEY == "":
    raise "NO API KEY PROVIDED! Either put it in your ~/.bashrc (or similar) file or put it in the empty string above."
"""
Required parameters:
    - office_location: This is one of three values: 
        ○ 121 Albright Wy, Los Gatos, CA 95032
        ○ 888 Broadway, New York, NY 10003
        ○ 5808 Sunset Blvd, Los Angeles, CA 90028
    - query_limit: The max number of items to return
    - radius: The distance from the office location provided
    - offset: This is basically a pagination token which let's me skip previous results.
"""
@app.route('/search', methods=['GET'])
def search():
    location = request.args.get("office_location")
    try:
        query_limit = int(request.args.get("query_limit"))
        radius = int(request.args.get("radius"))
        offset = int(request.args.get("offset"))
    except Exception as e:
        print("Exception: " + str(e))
        return jsonify(error="Failed converting input params to integers"), 400
    # Basic error handling to confirm they're all set. At work I use smithy to handle these required params for me.
    # More info on smithy: https://smithy.io/
    if any(v is None for v in [location, query_limit, radius, offset]):
        print("params were not all correct: " + str(request.args))
        return jsonify(error="Missing one or more required query parameters"), 400
    if radius > 10000:
        print("Radius is too large")
        return jsonify(error=f"Radius {radius} is greater than 10,000."), 400
    if query_limit > 50:
        print("query limit is too large")
        return jsonify(error=f"Query Limit can not be greater than 50"), 400
    query_output, error = query_yelp(API_KEY, location, radius, query_limit, offset)
    if error:
        print("Error: " + str(error))
        return jsonify(error=error), 400
    parsed_output, total_items = parse_query_output(query_output)
    output = {"content": parsed_output, "totalItems": total_items}
    return jsonify(output), 200

if __name__ == '__main__':
    app.run(debug=True)









