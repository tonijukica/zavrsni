import RPi.GPIO as GPIO
import sys
pin=int(sys.argv[1])
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(pin,GPIO.IN)
test=GPIO.input(pin)
GPIO.setup(pin,GPIO.OUT)
if GPIO.input(pin):
	print("off")
	GPIO.output(pin,GPIO.LOW)
else:
	print("on")
	GPIO.output(pin,GPIO.HIGH)
