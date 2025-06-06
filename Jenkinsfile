pipeline {
    agent any

    environment {
        VIDEO_DIR = 'artifacts/videos/'
        REPORT_DIR = 'artifacts/reports/'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests in Parallel') {
            parallel {
                stage('Test 1') {
                    steps {
                        bat 'npm run test:google'
                    }
                }
                stage('Test 2') {
                    steps {
                        bat 'npm run test:wikipedia'
                    }
                }
                stage('Test 3') {
                    steps {
                        bat 'npm run test:gpt1'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/*/, artifacts/reports/*/', followSymlinks: false
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    publishHTML(target: [
                        reportName: 'Test Report 1',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'reportTest1.html'
                    ])
                    publishHTML(target: [
                        reportName: 'Test Report 2',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'reportTest2.html'
                    ])
                    publishHTML(target: [
                        reportName: 'Test Report 2',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'reportTest3.html'
                    ])
                  
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/*/, artifacts/reports/*/', followSymlinks: false
        }
    }
}
