from django.db import connection
import uuid


class AddressFuncs:
    def __init__(self):
        return
    def getAddressByUserId(userId):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM address WHERE userId = %s ALLOW FILTERING;" % userId
        return list(cursor.execute(CQLstring))[0]

    def getAddressesByCity(city):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM address WHERE city = %s ALLOW FILTERING;" % city
        return list(cursor.execute(CQLstring))

    def getAddressesByState(state):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM address WHERE state = %s ALLOW FILTERING;" % state
        return list(cursor.execute(CQLstring))

    def getAddressesByZip(zip_code):
        cursor = connection.cursor()
        CQLstring = "SELECT * FROM address WHERE zip = %s ALLOW FILTERING;" % zip_code
        return list(cursor.execute(CQLstring))
