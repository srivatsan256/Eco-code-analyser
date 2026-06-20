import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/eco_analyser")
client = MongoClient(MONGO_URI)
db = client.get_default_database()

def get_db():
    return db

def get_users_collection():
    return db['users']

def get_reports_collection():
    return db['reports']
