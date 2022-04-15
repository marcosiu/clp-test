pipeline {
    agent any
    tools {nodejs "NodeJS"}
    environment {
        registry = "marcosiu/clp-node"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    stages {
        stage('Tests') {
            steps {
                echo 'Building..'
                sh 'npm install'
                echo 'Testing..'
                sh 'npm test'
            }
        }
        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build registry+":$BUILD_NUMBER"
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                    dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "kubectl apply -f ./k8s/mysql.yaml"
                sh "kubectl apply -f ./k8s/node.yaml"
            }
        }
    }
}
