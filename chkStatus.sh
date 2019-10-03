#!/bin/sh
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
        sh ./build.sh
    fi
    
    sleep 2
done

