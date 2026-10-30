from django.shortcuts import render
import joblib
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "hpp.pkl.xz")

# Fail clearly during startup if the trained model is missing or incompatible.
model = joblib.load(MODEL_PATH)

def index(request):
    context = {}

    if request.method == 'POST':
        med_inc = float(request.POST.get('med_inc', 3.87))
        house_age = float(request.POST.get('house_age', 28.0))
        ave_rooms = float(request.POST.get('ave_rooms', 5.42))
        ave_bedrms = float(request.POST.get('ave_bedrms', 1.09))
        population = float(request.POST.get('population', 1425.0))
        ave_occup = float(request.POST.get('ave_occup', 3.0))
        latitude = float(request.POST.get('latitude', 35.63))
        longitude = float(request.POST.get('longitude', -119.56))

        features = np.array([[med_inc, house_age, ave_rooms, ave_bedrms, population, ave_occup, latitude, longitude]])

        raw_prediction = float(model.predict(features)[0])

        raw_prediction = max(raw_prediction, 0.15)
        price_dollars = round(raw_prediction * 100000)

        tips = []
        if med_inc > 5.0:
            tips.append("High neighborhood median income is driving a premium property valuation.")
        else:
            tips.append("Median income is moderate; price aligns closely with affordable housing segments.")

        if house_age > 35:
            tips.append("Property age is high (>35 yrs); routine structural maintenance can boost equity.")
        else:
            tips.append("Relatively newer construction, providing higher valuation stability.")

        if ave_rooms > 6.0:
            tips.append("Generous room count relative to bedrooms increases square-footage appeal.")

        context = {
            'predicted': True,
            'price_dollars': f"{price_dollars:,}",
            'raw_units': round(raw_prediction, 2),
            'tips': tips,
            'features_data': [
                round(med_inc * 10, 1),
                round(house_age, 1),
                round(ave_rooms * 10, 1),
                round(ave_occup * 15, 1),
                round((population / 3000) * 100, 1)
            ],
            'inputs': {
                'med_inc': med_inc,
                'house_age': house_age,
                'ave_rooms': ave_rooms,
                'ave_bedrms': ave_bedrms,
                'population': population,
                'ave_occup': ave_occup,
                'latitude': latitude,
                'longitude': longitude,
            }
        }

    return render(request, 'index.html', context)