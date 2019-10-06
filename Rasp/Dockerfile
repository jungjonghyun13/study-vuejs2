FROM d3banjan/rasbian-stretch-python

#RUN mkdir -p /var/etc/MyData
RUN apt install -y libffi-dev libbz2-dev liblzma-dev \
    libsqlite3-dev libncurses5-dev libgdbm-dev zlib1g-dev \
    libreadline-dev libssl-dev tk-dev build-essential \
    libncursesw5-dev libc6-dev openssl git
RUN wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz
RUN tar xvf Python-3.6.0.tgz
RUN cd Python-3.6.0
RUN ./configure
RUN make -j 4
RUN make install
RUN wget https://bootstrap.pypa.io/get-pip.py
RUN python3.6 ./get-pip.py 


RUN pip3 install firebase_admin
add ajoah2019 /var/etc/MyData

WORKDIR /var/etc/MyData

CMD python3 ajoah_toilet_monitor.py



