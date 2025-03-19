from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Inisialisasi Flask
app = Flask(__name__)
CORS(app)  # Agar bisa diakses dari frontend

# Muat model yang sudah dilatih
model = joblib.load("model_prediksi_harga_rumah.pkl")

@app.route("/", methods=["GET"])
def home():
    return "API Prediksi Harga Rumah Flask Berjalan"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Ambil data dari request frontend
        data = request.json
        lb = data["lb"]
        lt = data["lt"]
        kt = data["kt"]
        km = data["km"]
        grs = data["grs"]

        # Buat array input untuk model
        features = np.array([[lb, lt, kt, km, grs]])

        # Lakukan prediksi
        prediction = model.predict(features)[0]

        # Kembalikan hasil prediksi dalam format JSON
        return jsonify({"predicted_price": round(prediction, 2)})
    
    except Exception as e:
        return jsonify({"error": str(e)})

# Jalankan server
if __name__ == "__main__":
    app.run(debug=True)
