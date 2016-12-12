docker build -t swagger-yaml-to-json  .
docker run -p 8080:8080 -it --rm --name my-running-script swagger-yaml-to-json


curl -X POST http://localhost:8080 --data "{ foo: bar }"
