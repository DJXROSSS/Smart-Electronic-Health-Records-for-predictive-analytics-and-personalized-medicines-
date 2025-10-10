from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model and vectorizer
model = joblib.load("disease_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "symptoms" not in data:
        return jsonify({"error": "No symptoms provided"}), 400

    symptoms = data["symptoms"]  # ✅ list of symptoms from Flutter

    if not isinstance(symptoms, list) or len(symptoms) == 0:
        return jsonify({"error": "Invalid symptom list"}), 400

    # Convert list to a single sentence (same as during training)
    input_text = " ".join(symptoms)

    # Transform input and predict
    features = vectorizer.transform([input_text])
    prediction = model.predict(features)[0]

    return jsonify({"predicted_disease": prediction})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
