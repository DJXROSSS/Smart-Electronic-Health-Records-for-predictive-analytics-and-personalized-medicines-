import streamlit as st
import joblib

# -----------------------------
# 🎯 Load Model and Vectorizer
# -----------------------------
@st.cache_resource
def load_model():
    model = joblib.load("disease_model.pkl")
    vectorizer = joblib.load("vectorizer.pkl")
    return model, vectorizer

model, vectorizer = load_model()

# -----------------------------
# 🧩 Streamlit Page Config
# -----------------------------
st.set_page_config(
    page_title="AI Disease Predictor",
    page_icon="🩺",
    layout="centered"
)

# -----------------------------
# 💬 App Header
# -----------------------------
st.title("🩺 AI Disease Predictor")
st.write("""
Enter your symptoms below to get a possible disease prediction.  
*(This tool is for educational/demo purposes — not a medical diagnosis.)*
""")

# -----------------------------
# 🧾 Input Section
# -----------------------------
symptom_input = st.text_area(
    "Enter symptoms (comma-separated):",
    placeholder="e.g. cough, fever, headache, sore throat"
)

# -----------------------------
# 🔍 Predict Button
# -----------------------------
if st.button("Predict Disease"):
    if not symptom_input.strip():
        st.warning("⚠️ Please enter at least one symptom.")
    else:
        try:
            # Convert symptoms to list & process
            symptoms = [s.strip() for s in symptom_input.split(",") if s.strip()]
            input_text = " ".join(symptoms)

            # Vectorize & predict
            features = vectorizer.transform([input_text])
            prediction = model.predict(features)[0]

            # 🎯 Display result
            st.success(f"**Predicted Disease:** {prediction}")
            st.write("💡 _Tip: Always consult a doctor for accurate medical evaluation._")

        except Exception as e:
            st.error(f"Error while predicting: {e}")

# -----------------------------
# 🧠 Footer
# -----------------------------
st.markdown("""
---
Made with ❤️ using **Streamlit** and **Machine Learning**
""")
