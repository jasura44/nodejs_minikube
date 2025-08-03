pipeline {
    agent {
      kubernetes {
        label 'jenkins-agent'
        defaultContainer 'jnlp'            
      }
    }

    environment {
        // Set your Docker image name and registry
        DOCKER_IMAGE = 'gunasagaransureshsg/nodejs'
        DOCKER_TAG = 'latest'
        // Credentials IDs as configured in Jenkins
        DOCKER_CREDS = credentials('dockerhubid');

        // Kubeconfig crederntials
        KUBECONFIG = credentials('kubeconfig');
    }

    stages {

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
                            withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                                sh '''
                                kubectl version --client
                                kubectl --kubeconfig=$KUBECONFIG get pods
                                kubectl --kubeconfig=$KUBECONFIG apply -f deployment.yaml -n backend
                                '''
                            }
                    }
                }
            }
        }

    }//end stages

}//end file
