from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_currency_data(base_currency=None, target_currency=None):
    api_key = "cur_live_iALw06wQZCeHQuBiCaCz9JKaSnM3H3tkvlNk3sTF"  # Use your key directly
    url = "https://api.currencyapi.com/v3/latest"
    params = {"apikey": api_key}

    if base_currency:
        params["base_currency"] = base_currency
    if target_currency:
        params["currencies"] = target_currency

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Unable to fetch data (HTTP {response.status_code})"}

@app.route('/currency/<base_currency>', methods=['GET'])
def get_currency_data(base_currency):
    target_currency = request.args.get('target_currency', None)

    # Fetch currency data
    data = fetch_currency_data(base_currency, target_currency)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
