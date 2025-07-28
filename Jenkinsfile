pipeline {
agent {
        kubernetes {
            label 'jenkins-agent'
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: jenkins-agent
spec:
  serviceAccountName: jenkins-service-account   # Use your ServiceAccount here
  containers:
    - name: jnlp
      image: jenkins/inbound-agent:latest
      args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
    - name: kubectl
      image: bitnami/kubectl:latest
      command:
        - cat
      tty: true
    - name: docker
      image: docker:stable-dind
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-sock
          mountPath: /var/run/docker.sock
  volumes:
    - name: docker-sock
      hostPath:
        path: /var/run/docker.sock
        type: Socket
"""
        }
    }

    environment {
        // Set your Docker image name and registry
        DOCKER_IMAGE = 'gunasagaransureshsg/nodejs'
        DOCKER_TAG = 'latest'
        // Credentials IDs as configured in Jenkins
        DOCKER_CREDS = credentials('dockerid');
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
                        sh '''
                        echo "Creating/updating deployment in namespace backend..."
                        kubectl apply -f deployment.yaml -n backend
                        '''                    
                    }
                }
            }
        }

    }//end stages

}//end file
