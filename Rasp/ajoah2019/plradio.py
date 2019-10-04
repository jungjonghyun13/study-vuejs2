from __future__ import print_function
import RPi.GPIO as GPIO
from time import sleep
isTest=True

GPIO.setmode(GPIO.BCM)

pirPin =7 
GPIO.setup(pirPin, GPIO.IN, GPIO.PUD_UP)

timelaps=0.2
timeidx=0
timeInterval=20 #base second is 4 sec. 
threshold=4  #total count 4s/timelaps
detectCnt=0

def testprint(outStr):
    if isTest:
        print(outStr)

while True:
    #1. init
    detectCnt=0
    for i in range(int(timeInterval/timelaps)):
        if isTest:
            print(timeidx*timelaps, end=': ')

        if GPIO.input(pirPin) == True:
            testprint("Motion detected!")
            detectCnt+=1
        else:
            testprint(" ")
        sleep(timelaps)
        timeidx+=1

    #testprint('detectCnt ['+str(detectCnt)+']')
    #testprint('threshold ['+str(threshold)+']')

    if detectCnt > threshold :
        testprint('this is Human')
    else :
        testprint('No')
    
