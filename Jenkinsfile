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
                stage('Test Google') {
                    steps {
                        bat 'npm run test:google'
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        bat 'npm run test:wikipedia'
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
                        reportName: 'Test Report (Google)',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'google-report.html'
                    ])
                    publishHTML(target: [
                        reportName: 'Test Report (Wikipedia)',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'wikipedia-report.html'
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
