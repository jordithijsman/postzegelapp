# coding=utf-8

import numpy as np
import pandas as pd
import json
import requests as req

data = pd.read_csv("PostJohan.csv", sep=";", encoding='Latin-1')
#pre-processing lege cellen
data['Omschrijving'] = data['Omschrijving'].fillna('')
data['Naam'] = data['Naam'].fillna('')
data['Kleur'] = data['Kleur'].fillna('')
data['Tanding'] = data['Tanding'].fillna('')
data['Waarde postfris'] = data['Waarde postfris'].fillna(0)
data['Waarde gestempeld'] = data['Waarde gestempeld'].fillna(0)
data['Uitgiftedatum'] = data['Uitgiftedatum'].fillna('')

#Gebruik . ipv ,
data['Waarde gestempeld'] = data['Waarde gestempeld'].replace({',': '.'}, regex=True)
data['Waarde postfris'] = data['Waarde postfris'].replace({',': '.'}, regex=True)
data["Opdrukwaarde "] = data["Opdrukwaarde "].replace({',': '.'}, regex=True)

def row_to_json(row):
    dataset = { "id": row.Postzegel_id, 
                "omschrijving": row.Omschrijving, 
                "naam": row.Naam, 
                "kleur": row.Kleur, 
                "tanding": row.Tanding, 
                "waarde_postfris": row["Waarde postfris"], 
                "waarde_gestempeld":row["Waarde gestempeld"],
                "land": "België",
                "prijs":str(row["Opdrukwaarde "])
              }
    if(row['Euro'] =='WAAR'):
        dataset["type"] = "euro"
    elif(row["BEF"] == 'WAAR'):
        dataset["type"] = "frank"
    elif(row["Nummercode"] == 'WAAR'):
        dataset["type"] = "code"
    
    #json_dump = json.dumps(dataset)
    #json_obj = json.loads(json_dump)
    return dataset

#inlezen van postzegels
for index, row in data.iterrows():
    json_obj = row_to_json(row)
    #print(json_obj)
    response = req.post('http://localhost:3000/postzegel', json = json_obj)
    print("index: %d, type: " %(index), json_obj["id"], "& status: ", response)
    
    


