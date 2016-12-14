FROM node

COPY swagger-publisher/ /app/

WORKDIR /app

CMD [ "./bin/www" ]
