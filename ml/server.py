from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import requests

# ===============================
# 🔧 CONFIG
# ===============================
OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
OLLAMA_MODEL = "phi"

# Load ML model
model = joblib.load("ml/model.pkl")

# Initialize Flask
app = Flask(__name__)

# Proper CORS (fixes Failed to fetch)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True,
)

# ===============================
# 🛰 PERFORMANCE ROUTE
# ===============================
@app.route("/performance", methods=["POST", "OPTIONS"])
def performance():
    try:
        data = request.get_json(force=True, silent=True) or {}

        system_kw = float(data.get("systemKW", 0))
        actual_generation = float(data.get("actualGeneration", 0))

        # Expected monthly generation assumption
        expected_generation = system_kw * 160  # more realistic India average

        # Avoid division by zero
        raw_performance = (
            (actual_generation / expected_generation) * 100
            if expected_generation else 0
        )

        performance_percent = round(raw_performance, 1)

        # Surplus or deficit
        surplus_units = max(0, actual_generation - expected_generation)
        loss_units = max(0, expected_generation - actual_generation)

        tariff = 6
        monthly_loss = round(loss_units * tariff, 2)
        surplus_value = round(surplus_units * tariff, 2)

        # Status Logic
        if raw_performance >= 110:
            status = "Overperforming"
        elif raw_performance >= 95:
            status = "Excellent"
        elif raw_performance >= 85:
            status = "Normal"
        elif raw_performance >= 70:
            status = "Needs Inspection"
        else:
            status = "Critical"

        # ===============================
        # 🤖 DYNAMIC AI PERFORMANCE INSIGHT
        # ===============================
        performance_prompt = f"""
You are a solar performance analyst.

STRICT RULES:
- Use ONLY the numbers provided.
- Do NOT assume technical issues.
- Do NOT invent problems.
- If performance is above 100%, describe it as surplus generation.
- If there is no loss, clearly state there is no financial loss.
- Only give improvement suggestions if performance is below 95%.

DATA:
System Size: {system_kw} kW
Expected Generation: {int(expected_generation)} kWh
Actual Generation: {int(actual_generation)} kWh
Performance: {performance_percent}%
Surplus Energy: {int(surplus_units)} kWh
Monthly Financial Loss: ₹{monthly_loss}
Status: {status}

Write 3–4 clear sentences.
Maximum 90 words.
"""
        try:
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": performance_prompt,
                    "stream": False
                },
                timeout=30
            )

            aiInsight = response.json().get("response", "").strip()

            if not aiInsight:
                raise Exception()

        except:
            # Smart fallback
            if surplus_units > 0:
                aiInsight = (
                    f"Your system is generating {performance_percent}% of expected output, "
                    f"producing a surplus of {int(surplus_units)} kWh worth ₹{surplus_value}. "
                    f"This indicates strong solar exposure and efficient system performance."
                )
            else:
                aiInsight = (
                    f"Your system is operating at {performance_percent}% efficiency. "
                    f"There is a shortfall of {int(loss_units)} kWh causing an estimated "
                    f"monthly loss of ₹{monthly_loss}. Consider cleaning panels, "
                    f"checking inverter health, or inspecting for shading issues."
                )

        return jsonify({
            "expectedGeneration": int(expected_generation),
            "performancePercent": performance_percent,
            "monthlyLoss": monthly_loss,
            "surplusUnits": int(surplus_units),
            "surplusValue": surplus_value,
            "status": status,
            "aiInsight": aiInsight
        })

    except Exception as e:
        print("PERFORMANCE ERROR:", e)
        return jsonify({"error": "Performance analysis failed"}), 500

# ===============================
# 🔮 PREDICT ROUTE
# ===============================
@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    try:
        data = request.get_json(force=True, silent=True) or {}

        bill = float(data.get("bill", 0))
        roof = float(data.get("roof", 0))

        # ML Prediction
        pred = model.predict([[bill, roof]])[0]

        systemKW = round(pred[0], 1)
        totalSavings = int(pred[2])
        coverage = int(pred[3])

        # Financial Calculations
        COST_PER_KW = 55000
        CENTRAL_SUBSIDY_PER_KW = 18000
        STATE_SUBSIDY_PER_KW = 6000

        centralSubsidy = int(min(systemKW, 3) * CENTRAL_SUBSIDY_PER_KW)
        stateSubsidy = int(systemKW * STATE_SUBSIDY_PER_KW)

        totalSystemCost = int(systemKW * COST_PER_KW)
        netInvestment = int(totalSystemCost - centralSubsidy - stateSubsidy)

        yearlySavings = int(totalSavings / 25)
        monthlySavings = int(yearlySavings / 12)

        payback = round(netInvestment / yearlySavings, 1) if yearlySavings else 0
        roiPercent = round((totalSavings / netInvestment) * 100, 1) if netInvestment else 0

        # Environmental
        yearlyEnergyKwh = int(yearlySavings / 6) if yearlySavings else 0
        yearlyCO2 = int(yearlyEnergyKwh * 0.82)
        lifetimeCO2 = int(yearlyCO2 * 25)

        # ===============================
        # 🤖 PLANNER INSIGHT (AI)
        # ===============================
        planner_prompt = f"""
You are a solar advisor.

Use ONLY the numbers provided.
Do NOT calculate anything.
Do NOT modify values.

System Size: {systemKW} kW
Coverage: {coverage}%
Net Investment: ₹{netInvestment}
Payback: {payback} years
25-Year Savings: ₹{totalSavings}

Write exactly 3 simple sentences.
Maximum 80 words.
"""

        try:
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": planner_prompt,
                    "stream": False
                },
                timeout=30
            )
            plannerInsight = response.json().get("response", "").strip()
            if not plannerInsight:
                raise Exception()

        except:
            plannerInsight = (
                f"Your {systemKW} kW system can cover about {coverage}% of your electricity needs. "
                f"With a net investment of ₹{netInvestment:,}, your payback period is approximately {payback} years. "
                f"Over 25 years, you can save around ₹{totalSavings:,}."
            )

        savingsInsight = (
            f"Government subsidies reduce your investment to ₹{netInvestment:,}. "
            f"You save approximately ₹{monthlySavings:,} per month and ₹{yearlySavings:,} per year. "
            f"This positions solar as a stable long-term financial asset."
        )

        return jsonify({
            "systemKW": systemKW,
            "coverage": coverage,
            "totalSavings": totalSavings,

            "totalSystemCost": totalSystemCost,
            "centralSubsidy": centralSubsidy,
            "stateSubsidy": stateSubsidy,
            "netInvestment": netInvestment,

            "monthlySavings": monthlySavings,
            "yearlySavings": yearlySavings,
            "payback": payback,
            "roiPercent": roiPercent,

            "yearlyCO2": yearlyCO2,
            "lifetimeCO2": lifetimeCO2,

            "plannerInsight": plannerInsight,
            "savingsInsight": savingsInsight
        })

    except Exception as e:
        print("PREDICT ERROR:", e)
        return jsonify({"error": "Prediction failed"}), 500


@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    try:
        data = request.get_json(force=True, silent=True) or {}

        message = data.get("message", "")
        solar_data = data.get("solarData") or {}

        context = f"""
You are a solar financial advisor.

Use ONLY the numbers provided.
Do NOT invent new values.

System Size: {solar_data.get("systemKW", "N/A")} kW
Net Investment: ₹{solar_data.get("netInvestment", "N/A")}
Payback: {solar_data.get("payback", "N/A")} years
ROI: {solar_data.get("roiPercent", "N/A")}%

User Question:
{message}

Answer clearly in under 120 words.
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": OLLAMA_MODEL,
                "prompt": context,
                "stream": False
            },
            timeout=30
        )

        result = response.json()
        reply = result.get("response", "").strip()

        if not reply:
            raise Exception("Empty AI response")

        return jsonify({"reply": reply})

    except Exception as e:
        print("CHAT ERROR:", e)
        return jsonify({"reply": "AI service unavailable. Check if Ollama is running."})
# ===============================
# 🚀 RUN SERVER
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)