from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ClaimRequest(BaseModel):
    marketingClaim: str
    manufacturingEmission: float   
    emissionPerKm: float           
    annualMileage: float
    years: int



def analyze_text_risk(claim: str):
    suspicious_words = [
        "zero emission",
        "carbon free",
        "eco friendly",
        "100% green",
        "sustainable",
        "climate neutral",
        "net zero",
        "no harmful emissions"
    ]

    exaggeration_words = [
        "100%",
        "completely",
        "totally",
        "guaranteed",
        "fully sustainable"
    ]

    claim_lower = claim.lower()
    detected = []
    score = 0

    for word in suspicious_words:
        if word in claim_lower:
            detected.append(word)
            score += 25

    for word in exaggeration_words:
        if word in claim_lower:
            detected.append(word)
            score += 15

    return score, detected



def analyze_lifecycle_risk(data: ClaimRequest):
    total_usage_emission = (
        data.annualMileage *
        data.years *
        data.emissionPerKm
    ) / 1000  # convert kg → tons

    total_lifecycle = data.manufacturingEmission + total_usage_emission

    contradiction_score = 0
    lifecycle_note = ""

    if "zero emission" in data.marketingClaim.lower():
        if total_lifecycle > 5:
            contradiction_score += 30
            lifecycle_note = (
                "Claim states zero emission, but lifecycle emissions "
                f"are approximately {round(total_lifecycle,2)} tons CO₂."
            )

    return contradiction_score, total_lifecycle, lifecycle_note



def generate_explanation(score, detected, lifecycle_note):
    if score >= 70:
        level = "High risk of greenwashing."
    elif score >= 40:
        level = "Moderate risk of misleading sustainability claims."
    else:
        level = "Low risk of greenwashing detected."

    explanation = f"""
{level}

Detected sustainability phrases: {', '.join(detected) if detected else 'None'}.

{lifecycle_note if lifecycle_note else ''}
""".strip()

    return explanation



@app.post("/api/ai")
async def analyze(data: ClaimRequest):

   
    text_score, detected = analyze_text_risk(data.marketingClaim)

    
    lifecycle_score, total_lifecycle, lifecycle_note = analyze_lifecycle_risk(data)

    final_score = min(text_score + lifecycle_score, 100)
    warning = final_score >= 40

    explanation = generate_explanation(final_score, detected, lifecycle_note)

    return {
        "confidenceScore": final_score,
        "warning": warning,
        "explanation": explanation,
        "detectedKeywords": detected,
        "totalLifecycleEmission": round(total_lifecycle, 2)
    }