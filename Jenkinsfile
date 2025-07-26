pipeline {
    agent any

    environment {
        // Set your Docker image name and registry
        DOCKER_IMAGE = 'gunasagaransureshsg/nodejs'
        DOCKER_TAG = 'latest'
        // Credentials IDs as configured in Jenkins
        DOCKER_CREDS = credentials('dockerid');
        //KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
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
                container('docker') {
                    script {
                        // Build the Docker image and tag as latest
                        docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    }
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                container('docker') {
                    script {
                        def imageTag = "${DOCKER_IMAGE}:${DOCKER_TAG}"
                        sh """
                            docker build -t ${imageTag} .
                            echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                            docker push ${imageTag}
                            docker logout
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    script {
                        try {
                            withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                            sh '''
                                kubectl config set-context --current --namespace=jenkins
                                export KUBECONFIG=$(echo $KUBECONFIG | tr -d '[:space:]')
                                kubectl apply -f deployment.yaml
                            '''
                        }
                        } catch (err) {
                            echo "Script failed with ${err}"
                        }                        
                    }
                }
            }
        }

    }//end stages

}//end file
