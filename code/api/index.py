# api/index.py - Vercel Serverless Function Entry Point
from mangum import Mangum
import sys
import os

# Add backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

# Import the FastAPI app
from main import app

# Wrap FastAPI app with Mangum for Vercel compatibility
handler = Mangum(app, lifespan="off")
