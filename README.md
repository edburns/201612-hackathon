Building the Docker Images
==========================

docker build -t swagger-yaml-to-json .

docker build -t swagger-json-to-html .

Running the Docker Images Locally
=================================

docker run -p 8080:8080 -it --rm swagger-yaml-to-json

docker run -p 8081:8081 -it --rm swagger-json-to-html

Interacting with the Running Local Docker Images
================================================

curl -X POST --data-binary @swagger.yaml http://localhost:8080 -o swagger.json

curl -X POST --data-binary @swagger.json http://localhost:8081 -o index.html

Uploading the Images to Google Cloud Storage Repository
=======================================================

https://cloud.google.com/container-registry/docs/pushing

docker tag swagger-yaml-to-json gcr.io/hackathon-201612/swagger-yaml-to-json

docker tag swagger-json-to-html gcr.io/hackathon-201612/swagger-json-to-html

./gcloud docker -- push gcr.io/hackathon-201612/swagger-yaml-to-json

./gcloud docker -- push gcr.io/hackathon-201612/swagger-json-to-html

Interacting with Kubernetes
===========================

kubectl run --image=<image_name> <application_name> --port=<port_number> --env="DOMAIN=cluster"
kubectl expose deployment <application_name> --port=<port_number> --name=<service_name>

