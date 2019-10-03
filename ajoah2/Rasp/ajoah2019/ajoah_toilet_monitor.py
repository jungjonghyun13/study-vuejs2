from time import sleep
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#Firebase database 인증 및 앱 초기화
cred = credentials.Certificate('ajoah_key.json')
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://ajoah-2121f.firebaseio.com/'
})

from datetime import datetime
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
    
toiletID=''
testIDX=0  #Test var
with open("toiletID.txt", "r") as f:
    data = f.read()    
    toiletID=data.split('=')[1]

while(1):
    print('HI Im Python ')

    ##Test var start
    testIDX+=1
    if testIDX %2 == 0:
        print('notUseSpace')
        notUseSpace(toiletID)
    else :
        print('UseSpace')
        useSpace(toiletID)
    ##Test var end
    sleep(1)

