pipeline {
    agent any

    environment {
        VERSIONED_DIR = "artifacts/V${BUILD_NUMBER}/"
        VIDEO_DIR = "artifacts/V${BUILD_NUMBER}/videos"
        REPORT_DIR = "artifacts/V${BUILD_NUMBER}/reports"
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
                        bat "npm run test:google"
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        bat "npm run test:wikipedia"
                    }
                }
            }
        }

        stage('Organize Artifacts') {
            steps {
                script {
                    bat "mkdir ${VIDEO_DIR}"
                    bat "mkdir ${REPORT_DIR}"
                    bat "copy /Y artifacts\\videos\\* ${VIDEO_DIR}"
                    bat "copy /Y artifacts\\reports\\* ${REPORT_DIR}"
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts allowEmptyArchive: true, artifacts: "${VERSIONED_DIR}**/*", followSymlinks: false
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    publishHTML(target: [
                        reportName : "Test Report (Google)",
                        reportDir  : "${REPORT_DIR}",
                        reportFiles: 'google-report.html',
                        keepAll    : true
                    ])
                    publishHTML(target: [
                        reportName : "Test Report (Wikipedia)",
                        reportDir  : "${REPORT_DIR}",
                        reportFiles: 'wikipedia-report.html',
                        keepAll    : true
                    ])
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts allowEmptyArchive: true, artifacts: "${VERSIONED_DIR}**/*", followSymlinks: false
        }
    }
}
