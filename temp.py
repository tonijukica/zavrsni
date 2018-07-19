import Adafruit_DHT
import time
sensor=Adafruit_DHT.DHT11
gpio=17
hum,temp=Adafruit_DHT.read(sensor,gpio)
if temp is not None:
	print(temp)
	
else:
	print("Nije uspjelo ocitavanje temperature. Pokusaj ponovo")
