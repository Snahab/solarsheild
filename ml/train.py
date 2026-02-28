import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

print("Current folder:", os.getcwd())

data = pd.read_csv("ml/dataset.csv")

print("Dataset loaded successfully")

X = data[["bill","roof"]]

y = data[[
    "system_kw",
    "payback",
    "savings",
    "coverage"
]]

model = RandomForestRegressor(n_estimators=100)

model.fit(X,y)

joblib.dump(model,"model.pkl")

print("✅ MODEL.PKL CREATED")