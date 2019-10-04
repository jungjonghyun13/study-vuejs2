#!/bin/bash

echo 'chkStatus.sh start'

#RUNFILE=ajoah_toilet_monitor.py
RUNFILE=Mockup.py
APPNAME=ajoah
APP_DIR=/var/etc/MyData
REVISION=$(expr substr $(git rev-parse HEAD) 1 7)

# 0. delete all python cmd 
RUN_PID=`ps -a | grep python3 | awk '{print $1 }'`
for pid in $RUN_PID
do
    echo "kill -8 $pid"
    kill -8 $pid
    sleep 3
done

# 0.1 Run base program
python3 ajoah2019/$RUNFILE &
RUN_PID=`ps -a | grep python3 | awk '{print $1 }'`
echo "[$RUN_PID]"

# chk src
while [ 0 = 0 ]
do 
    # 1. Get server data for update
    git fetch

    # 2. Get Heads each client & server 
    myHEAD=`/usr/bin/git rev-parse HEAD`
    serHEAD=`/usr/bin/git rev-parse @{u}`

    # 3. log HEADs
    echo "$myHEAD"
    echo "$serHEAD"

    # 4. if client is not latest version, pull server version 
    if [ $myHEAD = $serHEAD ] 
    then
        echo "  HEAD Latest [$myHEAD]"
    else
        echo "  myHEAD [$myHEAD] \n serHEAD [$serHEAD]"
        # 5. rebuild 
        git pull
        REVISION=$(expr substr $(git rev-parse HEAD) 1 7)

        echo "kill -8 $RUN_PID"
        kill -8 $RUN_PID
        sleep 5

        python3 ajoah2019/$RUNFILE &
        RUN_PID=`ps -a | grep python3 | awk '{print $1 }'`
        echo "[$RUN_PID"]
        
    fi
    
    sleep 3
done

