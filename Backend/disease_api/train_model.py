import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# -------------------------------
# 1️⃣ Load and Clean Data
# -------------------------------
train_df = pd.read_csv("Training.csv")
test_df = pd.read_csv("Testing.csv")

# Drop unnamed column if it exists
train_df = train_df.loc[:, ~train_df.columns.str.contains('^Unnamed')]
test_df = test_df.loc[:, ~test_df.columns.str.contains('^Unnamed')]

print(f"✅ Loaded training data: {train_df.shape[0]} rows, {train_df.shape[1]} columns")
print(f"✅ Loaded testing data: {test_df.shape[0]} rows, {test_df.shape[1]} columns")

# -------------------------------
# 2️⃣ Split Features and Labels
# -------------------------------
X_train = train_df.drop(columns=['prognosis'])
y_train = train_df['prognosis']

X_test = test_df.drop(columns=['prognosis'])
y_test = test_df['prognosis']

# -------------------------------
# 3️⃣ Train Model
# -------------------------------
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# -------------------------------
# 4️⃣ Evaluate Model
# -------------------------------
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"🎯 Model Accuracy: {acc*100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# -------------------------------
# 5️⃣ Save Model
# -------------------------------
joblib.dump(model, "disease_model.pkl")
print("✅ Model saved successfully as 'disease_model.pkl'")
