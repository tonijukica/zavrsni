import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(23,GPIO.IN)
test=GPIO.input(23)
GPIO.setup(23,GPIO.OUT)
if(test==0):
	print("Treba je upalit")
	GPIO.output(23,GPIO.HIGH)
else:
	print("Treba je ugasit")
	GPIO.output(23,GPIO.LOW)
