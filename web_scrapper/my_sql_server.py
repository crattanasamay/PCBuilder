# -*- coding: utf-8 -*-
"""
Created on Thu Nov  5 14:45:24 2020

@author: Chris
"""

import mysql.connector as mysql
from mysql.connector import errorcode
import os
import pandas as pd

#Import CSV

data = pd.read_csv(r'C:/Users/God King Chris/Desktop/web_scrapper/microcenter_stock.csv')
df = pd.DataFrame(data,columns=['Hardware','Name','Price','SKU','Info','Image'])

conn = mysql.connect(
    user='root',
    password='root123',
    host='127.0.0.1',
    database='mydatabase'
    )

cur = conn.cursor()
# cur.execute("CREATE DATABASE mydatabase")
cur.execute('DROP TABLE IF EXISTS Stock;')
cur.execute('CREATE TABLE Stock (ID int,Hardware nvarchar(50),Name nvarchar(200),Price double,SKU int,Info nvarchar(45),Image nvarchar(200))')


for row in df.itertuples():
    cur.execute('INSERT INTO mydatabase.Stock(ID,Hardware,Name,Price,SKU,Info,Image) VALUES(%s,%s,%s,%s,%s,%s,%s)',row)
    
conn.commit()

# TABLES = {}

# TABLES['Stock'] = (
#     "CREATE TABLE 'Stock' ("
#     "'ID' int(10) NOT NULL,"
#     "'Hardware varchar(45) NOT NULL,"
#     "'Name' varchar(100) NOT NULL,"
#     "'Price' int(10) NOT NULL,"
#     "'SKU' int(10) NOT NULL"
#     "'Info' varchar(45) NOT NULL"
#     "'Image' varchar(150) NOT NULL"
#     "PRIMARY KEY ('ID)"
#     ") ENGINE=InnoDB"
#     )


# table_description = TABLES['Stock']

      