# Start minikube with docker driver
minikube start --driver=docker

# Enable ingress addon
minikube addons enable ingress

# Create jenkins namespace
kubectl apply -f namespace.yaml

# Change current namespace to jenkins
kubectl config set-context --current --namespace=backend

# Build docker image
docker build -t gunasagaransureshsg/nodejs:latest .

# Create deloyment from docker image
kubectl apply -f .\deployment.yaml

# Create service from deployment
kubectl apply -f .\service.yaml

# Create ingress to expose service to outside cluster
kubectl apply -f .\ingress.yaml

# Add domain into C:\Windows\System32\drivers\etc file
127.0.0.1 mydomain.com

# Run applications
minikube tunnel

# Port forward to test
kubectl port-forward service/nodejs-service 3000:80 -n backend
