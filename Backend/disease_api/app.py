import streamlit as st
import pandas as pd
import joblib
import os
from dotenv import load_dotenv

load_dotenv()

MODEL_FILE = os.getenv("MODEL_FILE", "disease_model.pkl")
TRAINING_CSV = os.getenv("TRAINING_CSV", "Training.csv")

@st.cache_resource
def load_model():
    return joblib.load(MODEL_FILE)

@st.cache_resource
def load_symptoms():
    df = pd.read_csv(TRAINING_CSV)
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    symptoms = list(df.columns)
    symptoms.remove("prognosis")
    return symptoms

def main():
    st.set_page_config(page_title="AI Disease Predictor", page_icon="🩺", layout="centered")
    st.title("🧠 Disease Prediction System")
    st.markdown("Select the symptoms you are experiencing:")

    model = load_model()
    symptoms = load_symptoms()
    selected_symptoms = st.multiselect("Select symptoms:", symptoms)

    if st.button("Predict"):
        if not selected_symptoms:
            st.warning("⚠️ Please select at least one symptom.")
        else:
            input_data = [1 if s in selected_symptoms else 0 for s in symptoms]
            input_df = pd.DataFrame([input_data], columns=symptoms)
            
            try:
                prediction = model.predict(input_df)[0]
                st.success(f"🩺 **Predicted Disease:** {prediction}")
                st.info("💡 This prediction is for informational purposes only. Always consult a doctor for a proper diagnosis.")
            except Exception as e:
                st.error(f"Error during prediction: {e}")

if __name__ == "__main__":
    main()
