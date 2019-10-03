FROM python

RUN mkdir -p /var/etc/MyData
RUN pip install firebase_admin

add ajoah2019 /var/etc/MyData
add toiletID.txt /var/etc/MyData/toiletID.txt

WORKDIR /var/etc/MyData

CMD python ajoah_toilet_monitor.py



