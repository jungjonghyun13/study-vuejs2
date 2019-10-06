FROM d3banjan/rasbian-stretch-python

#RUN mkdir -p /var/etc/MyData
RUN pip3 install RPi.GPIO
RUN pip3 install firebase_admin
add ajoah2019 /var/etc/MyData

WORKDIR /var/etc/MyData

CMD python3 ajoah_toilet_monitor.py



