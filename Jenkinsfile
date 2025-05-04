pipeline {
    agent any

    environment {
        VIDEO_DIR = 'artifacts/videos/'
        REPORT_DIR = 'artifacts/reports/'
    }

    options {
        // Supprime les anciens artefacts pour chaque build
        skipDefaultCheckout()
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '1'))
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // Nettoie l'espace de travail avant chaque build
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                // Récupère le code depuis le repository
                checkout scm
            }
        }

        stage('Cache node_modules') {
            steps {
                // Utilise un cache pour node_modules
                cache(path: 'node_modules', key: "npm-cache-${env.JOB_NAME}", restoreKeys: ['npm-cache-']) {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests in Parallel') {
            parallel {
                stage('Test Google') {
                    steps {
                        // Exécution des tests pour Google
                        bat 'npm run test:google'
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        // Exécution des tests pour Wikipedia
                        bat 'npm run test:wikipedia'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive les vidéos et rapports générés
                archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/**/*, artifacts/reports/**/*', followSymlinks: false
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    // Publier les rapports HTML
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
            // Archiver les artefacts finaux après le build
            archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/**/*, artifacts/reports/**/*', followSymlinks: false
        }
    }
}
