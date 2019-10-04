from __future__ import print_function
import RPi.GPIO as GPIO
from time import sleep
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime

isTest=True

GPIO.setmode(GPIO.BCM)
pirPin =7 
GPIO.setup(pirPin, GPIO.IN, GPIO.PUD_UP)

timelaps=0.2
timeidx=0
timeInterval=20 #base second is 4 sec. 
threshold=4  #total count 4s/timelaps
detectCnt=0


#Firebase database 인증 및 앱 초기화
cred = credentials.Certificate('ajoah_key.json')
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://ajoah-2121f.firebaseio.com/'
})

# 함수 정의
def testprint(outStr):
    if isTest:
        print(outStr)
        
def getSysDt():
    return datetime.fromtimestamp(datetime.now().timestamp()).strftime('%Y-%m-%d %H:%M:%S')
def useSpace(toiletID):
    # 사용하는 데이터 전송
    ref = db.reference('current/'+toiletID)
    ref.update({
        'using' : True,
        'using_from':getSysDt(),
        'last_update' : getSysDt()
    })
    # 전송 후 결과값 저장 
    toilet_status=ref.get()

    # 결과값 히스토리 저장 
    ref = db.reference('history/'+toiletID)
    ref.update({
            getSysDt() :toilet_status
    })
def notUseSpace(toiletID):
    # 사용하는 데이터 전송
    ref = db.reference('current/'+toiletID)
    ref.update({
        'using' : False,
        'free_from':getSysDt(),
        'last_update' : getSysDt()
    })
    # 전송 후 결과값 저장 
    toilet_status=ref.get()

    # 결과값 히스토리 저장 
    ref = db.reference('history/'+toiletID)
    ref.update({
            getSysDt() :toilet_status
    })


# Main

# 1. 화장실 ID 가져오기 
toiletID=''
testIDX=0  #Test var
with open("toiletID.txt", "r") as f:
    data = f.read()    
    toiletID=data.split('=')[1]

# 2. 실행
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
        testprint('UseSpace')
        useSpace(toiletID)
    else :
        print('notUseSpace')
        notUseSpace(toiletID)


