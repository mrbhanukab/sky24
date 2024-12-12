import json
import random

# Define base data structure
def generate_sample(id_suffix):
    selected_team = random.choice(["A", "B", "C"])
    school_name = f"School-{id_suffix}"
    return {
        "selectedTeam": selected_team,
        "members": [
            {
                "whatsappNumber": f"07{random.randint(10000000, 99999999)}",
                "name": random.choice(["Sandu Kumara", "Amila Perera", "Anuruddha Jayasena", "Madushan Silva", "Dinushi Fernando"])
            } for _ in range(5)
        ],
        "firstround": {
            "Cosmology1": random.randint(0, 30),
            "AstroPhysics1": random.randint(0, 30),
            "Observation1": random.randint(0, 30),
            "Rocketry2": random.randint(0, 30),
            "GeneralAstronomy2": random.randint(0, 30),
            "Rocketry1": random.randint(0, 30),
            "AstroPhysics2": random.randint(0, 30),
            "GeneralAstronomy1": random.randint(0, 30),
            "Observation2": random.randint(0, 30),
            "Cosmology2": random.randint(0, 30)
        },
        "formData": {
            "schoolAddress": f"{random.randint(1, 999)}, Random Road, City-{random.randint(1, 50)}",
            "language": random.choice(["english", "tamil", "sinhala"]),
            "presidentName": random.choice(["Suresh Chandrasena", "Kumari Perera", "Ruwan Wijesekara"]),
            "schoolName": school_name,
            "teacherInCharge": random.choice(["Nila Menika", "Sanjaya Dissanayake", "Dinesha Kumara"]),
            "presidentContactNumber": f"07{random.randint(10000000, 99999999)}",
            "societyEmail": f"club-{id_suffix}@school.com",
            "ticContactNumber": f"07{random.randint(10000000, 99999999)}"
        },
        "selectedCenter": random.choice(["anuradhapura", "kandy", "colombo", "matara"]),
        "selected": None,
        "final": None,
        "firstCheck": True,
        "finalround": None,
        "id": f"{school_name}-Team {selected_team}"
    }

# Generate 100 samples
data = [generate_sample(i) for i in range(1, 101)]

# Save to a JSON file
output_file = "teams.json"
with open(output_file, "w") as f:
    json.dump(data, f, indent=4)

output_file
