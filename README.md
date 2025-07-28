# Start minikube with docker driver
minikube start --driver=docker

# Enable ingress addon
minikube addons enable ingress

# Create backend namespace
kubectl apply -f namespace.yaml

# Change current namespace to backend
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

------------------------------------------------------------------------------------------------

## Utilities

# To view container logs inside a pod
kubectl logs jenkins-agent-j2lmg -c kubectl -n jenkins

# To see no of cpu cores allocated
minikube ssh -- nproc

# To get memory info
minikube ssh -- cat /proc/meminfo


