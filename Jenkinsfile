pipeline {
    agent any
    environment {
        // You can set environment variables here if needed
    }
    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir() // Cleans the workspace
            }
        }
        stage('Checkout') {
            steps {
                checkout scm // Checkout the repository
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Add your commands to install dependencies if needed, e.g., npm install or mvn install
                    sh 'npm install' // Example command for Node.js, replace with your relevant command
                }
            }
        }
        stage('Run Tests') {
            parallel {
                stage('Test Google') {
                    steps {
                        script {
                            // Add your test command here, e.g., running TestCafe tests for Google
                            sh 'npm test -- --testNamePattern=Google'
                        }
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        script {
                            // Add your test command here, e.g., running TestCafe tests for Wikipedia
                            sh 'npm test -- --testNamePattern=Wikipedia'
                        }
                    }
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true // Adjust based on your artifacts
            }
        }
        stage('Publish Test Results') {
            steps {
                junit '**/target/test-*.xml' // Adjust based on where your test results are stored
            }
        }
    }
    post {
        always {
            // Any actions to take after the pipeline finishes, like cleanup
            echo 'Cleaning up after the build.'
        }
        success {
            echo 'Build and tests passed successfully!'
        }
        failure {
            echo 'There was a failure in the pipeline.'
        }
    }
}
