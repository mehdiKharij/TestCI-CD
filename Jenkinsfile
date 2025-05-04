pipeline {
    agent any

    environment {
        VIDEO_DIR = 'artifacts/videos/'
        REPORT_DIR = 'artifacts/reports/'
        BUILD_DIR = "artifacts/build-${BUILD_NUMBER}/" // Dossier spécifique pour chaque build
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir() // Nettoie l'espace de travail avant chaque build
            }
        }

        stage('Checkout') {
            steps {
                checkout scm // Récupère le code source du repository
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Installe les dépendances nécessaires avec npm
            }
        }

        stage('Run Tests in Parallel') {
            parallel {
                stage('Test Google') {
                    steps {
                        bat 'npm run test:google' // Exécute les tests pour Google
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        bat 'npm run test:wikipedia' // Exécute les tests pour Wikipedia
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Organiser les artefacts dans des dossiers versionnés par numéro de build
                script {
                    def videoArtifacts = "${VIDEO_DIR}**/*"
                    def reportArtifacts = "${REPORT_DIR}**/*"
                    
                    // Créer des sous-dossiers pour chaque version de build
                    def versionedVideoDir = "${BUILD_DIR}videos/"
                    def versionedReportDir = "${BUILD_DIR}reports/"

                    // Copier les fichiers dans les dossiers versionnés
                    sh "mkdir -p ${versionedVideoDir}"
                    sh "mkdir -p ${versionedReportDir}"

                    // Déplacer les artefacts dans les sous-dossiers versionnés
                    sh "mv ${videoArtifacts} ${versionedVideoDir}"
                    sh "mv ${reportArtifacts} ${versionedReportDir}"

                    // Archive les artefacts organisés par version de build
                    archiveArtifacts allowEmptyArchive: true, artifacts: "${BUILD_DIR}**/*", followSymlinks: false
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    // Publier les rapports HTML pour chaque test
                    publishHTML(target: [
                        reportName: 'Test Report (Google)',
                        reportDir: REPORT_DIR,
                        reportFiles: 'google-report.html'
                    ])
                    publishHTML(target: [
                        reportName: 'Test Report (Wikipedia)',
                        reportDir: REPORT_DIR,
                        reportFiles: 'wikipedia-report.html'
                    ])
                }
            }
        }
    }

    post {
        always {
            // Archive les artefacts après chaque build dans un dossier versionné
            script {
                def videoArtifacts = "${VIDEO_DIR}**/*"
                def reportArtifacts = "${REPORT_DIR}**/*"
                
                def versionedVideoDir = "${BUILD_DIR}videos/"
                def versionedReportDir = "${BUILD_DIR}reports/"

                sh "mkdir -p ${versionedVideoDir}"
                sh "mkdir -p ${versionedReportDir}"

                // Déplacer les artefacts dans les sous-dossiers versionnés
                sh "mv ${videoArtifacts} ${versionedVideoDir}"
                sh "mv ${reportArtifacts} ${versionedReportDir}"

                // Archive les artefacts versionnés
                archiveArtifacts allowEmptyArchive: true, artifacts: "${BUILD_DIR}**/*", followSymlinks: false
            }
        }
    }
}
