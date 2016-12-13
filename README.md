docker build -t swagger-yaml-to-json .
docker build -t swagger-json-to-html .

docker run -p 8080:8080 -it --rm swagger-yaml-to-json
docker run -p 8081:8081 -it --rm swagger-json-to-html

curl -X POST --data-binary @swagger.yaml http://localhost:8080 -o swagger.json
curl -X POST --data-binary @swagger.json http://localhost:8080 -o index.html

