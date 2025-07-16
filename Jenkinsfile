pipeline {
    agent any

    environment {
        // Set your Docker image name and registry
        DOCKER_IMAGE = 'gunasagaransureshsg/my-node-app'
        DOCKER_TAG = 'latest'
        // Credentials IDs as configured in Jenkins
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the Git repository
                git branch: 'master', url: 'https://github.com/jasura44/nodejs_minikube.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image and tag as latest
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Use the kubeconfig credentials for kubectl
                    withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG')]) {
                        sh '''
                            export KUBECONFIG=$KUBECONFIG
                            kubectl apply -f deployment.yaml -n backend
                        '''
                    }
                }
            }
        }
    }
}
