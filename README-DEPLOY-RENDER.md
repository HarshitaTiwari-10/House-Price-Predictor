# House Price Predictor — Render deployment

This is a prepared Django project for deployment on Render.

## Deploy using Render Blueprint

1. Create a GitHub repository named `House-Price-Predictor`.
2. Upload/push the **contents of this ZIP's extracted folder** to the repository root. The `manage.py` file must be visible at the top level of the GitHub repository.
3. Sign in at https://render.com/.
4. Choose **New + → Blueprint**.
5. Connect the GitHub repository that contains `render.yaml`.
6. Review the proposed `house-price-predictor` web service and apply the Blueprint.
7. Wait for deployment to finish, then open the `.onrender.com` URL shown in Render.

The Blueprint reads `render.yaml`. It installs dependencies, collects static files, applies migrations,
generates a secure `SECRET_KEY`, and starts the Django app with Gunicorn.

## If using New → Web Service manually

- Runtime: Python
- Root Directory: leave blank (if `manage.py` is at repository root)
- Build Command: `bash build.sh`
- Start Command: `gunicorn house_price_system.wsgi:application --bind 0.0.0.0:$PORT`
- Environment variables: `PYTHON_VERSION=3.12.10`, `DEBUG=False`, and a generated `SECRET_KEY`.

## Local test (Windows PowerShell)

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000/

## Notes

- The saved model reports scikit-learn 1.9.0; the requirements pin that version.
- The model is XZ-compressed as `hpp.pkl.xz` to keep the GitHub file below its ordinary 100 MB per-file limit. `joblib.load()` can read XZ-compressed model files.
- The prediction feature uses the saved model. The SQLite database is only for Django's built-in tables and is not needed for the prediction itself.
- Render free web services may sleep after inactivity, so the first visit after a period of inactivity can take longer.
- Do not commit `.env`, secret keys, virtual environments, `db.sqlite3`, or `staticfiles/`.
