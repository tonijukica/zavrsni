import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(24,GPIO.IN)
test=GPIO.input(24)
GPIO.setup(24,GPIO.OUT)
if(test==0):
	print("Treba je upalit")
	GPIO.output(24,GPIO.HIGH)
else:
	print("Treba je ugasit")
	GPIO.output(24,GPIO.LOW)
