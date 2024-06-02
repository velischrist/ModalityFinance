from pymongo import MongoClient

# Connect to the MongoDB server
# client = MongoClient('mongodb://localhost:27017/')
client = MongoClient('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6')

# Access the database
db = client.modalitymongo

# Access a collection
financial_statements = db.financial_statements