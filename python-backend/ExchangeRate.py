from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_currency_data(base_currency=None, target_currency=None, date=None):
    api_key = "##################################"  # Use your API key
    url = "https://api.currencyapi.com/v3/"
    url += "historical" if date else "latest"

    params = {"apikey": api_key}
    if base_currency:
        params["base_currency"] = base_currency
    if target_currency:
        params["currencies"] = target_currency
    if date:
        params["date"] = date

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Unable to fetch data (HTTP {response.status_code})"}

@app.route('/currency/<base_currency>', methods=['GET'])
def get_currency_data(base_currency):
    target_currency = request.args.get('target_currency', None)
    date = request.args.get('date', None)  # Accept historical date as a query parameter

    # Fetch currency data
    data = fetch_currency_data(base_currency, target_currency, date)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
