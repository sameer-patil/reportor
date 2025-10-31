from flask import Flask, request
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import os
import time
from datetime import datetime

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://datareciever:YOUR_SECURE_PASSWORD@mongo:27017/broken_sites")

app = Flask(__name__)

def send_to_mongo(dataz):
    retries = 10
    while retries > 0:
        try:
            conn = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
            conn.admin.command('ping')
            print("Connected to MongoDB successfully!")
            break
        except ServerSelectionTimeoutError:
            print("MongoDB not ready yet, retrying in 5 seconds...")
            time.sleep(5)
            retries -= 1
    else:
        print("Failed to connect to MongoDB after retries")
        return

    db = conn.broken_sites
    collection = db.reports
    rec_id1 = collection.insert_one(dataz)
    print("Data inserted with record ids", rec_id1)

@app.route('/', methods=['POST'])
def receive_report():
    data = request.json
    data["date_utc"] = datetime.utcnow().isoformat() + "Z"
    print("Received report:", data)
    send_to_mongo(data)
    return 'Thanks!', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

