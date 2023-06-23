import pandas as pd
from flask import Flask, request, jsonify
import pickle
from pandas import to_datetime
from pymongo import MongoClient
from prophet import Prophet 


# Create Flask app
app = Flask(__name__)


model = pickle.load(open("model.pkl", "rb"))


# def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
#    CONNECTION_STRING = "mongodb+srv://khanhmtn:1MKgcOPkQM4oeiUY@cluster0.6z8ospb.mongodb.net/?retryWrites=true&w=majority"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
#    client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
    

#    return client['test']
  
  
   # Get the database


@app.route("/predict", methods= ["POST"])
def predict():
    future = list()
    djson = request.json
    datetime = djson["datetime"]
    for i in datetime:
        future.append([i])
    future = pd.DataFrame(future)
    future.columns = ['ds']
    future['ds']= to_datetime(future['ds'])
    prediction = model.predict(future)
    result = prediction[['yhat']].to_json()
    return jsonify({"Prediction": result})
    # return jsonify('Prediction')

# @app.route("/retrain", methods = ["GET"])
# def retrain():
#     dbname = get_database()
#     item_details = dbname["bookings"]
#     cursor = item_details.find()
#     list_cur = list(cursor)
#     df = pd.DataFrame(list_cur)
#     df["fromDate"]= pd.to_datetime(df[ "fromDate"])
#     df['month']=df[ "fromDate"].dt.month
#     df['year']=df[ "fromDate"].dt.year
#     df['day']=df[ "fromDate"].dt.day
#     df['fromDated']= pd.to_datetime(df[['year', 'month', 'day']])
#     time = df['fromDated'].value_counts()
#     volume = pd.DataFrame({'ds':time.index, 'y':time.values})
#     volume['ds'] = pd.to_datetime(volume['ds'])
#     m = Prophet(yearly_seasonality=True)
#     m.fit(volume)
#     pickle.dump(m, open("model1.pkl", "wb"))
#     return jsonify({"Retrain": "successfully"})

if __name__ == "__main__":
    app.run(debug = True, port = 5000)
