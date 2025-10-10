import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib


# Read CSV and skip lines with too many/few columns
df = pd.read_csv("dataset.csv", on_bad_lines='skip')
print(f"✅ Loaded {len(df)} rows successfully!")

# Features and labels

# Features and labels
X = df['symptoms']
y = df['disease']

# Convert text to numeric
vectorizer = TfidfVectorizer()
X_vect = vectorizer.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_vect, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and vectorizer
joblib.dump(model, "disease_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model and vectorizer saved successfully!")
