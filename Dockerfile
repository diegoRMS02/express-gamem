FROM httpd

RUN apt  update -y
RUN apt install nano -y

WORKDIR /usr/local/apache2/htdocs

COPY . .