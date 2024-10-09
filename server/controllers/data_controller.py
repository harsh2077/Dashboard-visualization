from flask import request, jsonify
from pymongo import MongoClient
import os


client = MongoClient(os.getenv("MONGODB_URI"))
db = client['test']  
print("Connected to MongoDB:", client.server_info())  

def get_data():
    try:

        end_year = request.args.get('end_year') 
        country = request.args.get('country')
        source = request.args.get('source')
        pestle = request.args.get('pestle')
        
  
        filter = {}
        print("end_year value:", end_year)
        
        if end_year:
            end_year_int = int(end_year)
            filter['end_year'] = {'$gte': 2000, '$lte': end_year_int}  

        if country:
            filter['country'] = country
        if source:
            filter['source'] = source
        if pestle:
            filter['pestle'] = pestle
        
        
        filter['end_year'] = { '$ne': None }  
        if filter:
            print("Filter before querying:", filter)
            data = list(db.datas.find(filter)) if filter else list(db.datas.find())
            # print("Data fetched:", data) 
        else:
            data = list(db.datas.find())  


   
        for item in data:
            item['_id'] = str(item['_id'])

        return jsonify(data)

    except Exception as e:
        print("Error in get_data:", e)  
        return jsonify({"message": "Server error"}), 500

def add_data():
    try:
        received_data = request.json 
        print("Received data:", received_data)  

        saved_data = db.datas.insert_many(received_data)  
        
        return jsonify({"message": "Data added successfully", "data": str(saved_data.inserted_ids)}), 201

    except Exception as e:
        print("Error in add_data:", e) 
        return jsonify({"message": "Server error"}), 500
