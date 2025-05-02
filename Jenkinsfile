pipeline {
    agent any

    environment {
        VIDEO_DIR = 'artifacts/videos/'
        REPORT_DIR = 'artifacts/reports/'
    }

    stages {
        stage('Run Tests in Parallel') {
            parallel {
                stage('Test Google') {
                    steps {
                        script {
                            // Exécution du test Google en parallèle
                            sh 'npm run test:google'
                        }
                    }
                }
                stage('Test Wikipedia') {
                    steps {
                        script {
                            // Exécution du test Wikipedia en parallèle
                            sh 'npm run test:wikipedia'
                        }
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                script {
                    // Archive les vidéos et rapports générés
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/**/*, artifacts/reports/**/*', followSymlinks: false
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                script {
                    // Publie les rapports de test dans Jenkins
                    publishHTML(target: [
                        reportName: 'Test Report Google',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'google-report.html'
                    ])
                    publishHTML(target: [
                        reportName: 'Test Report Wikipedia',
                        reportDir: 'artifacts/reports',
                        reportFiles: 'wikipedia-report.html'
                    ])
                }
            }
        }
    }

    post {
        always {
            // Archive les vidéos et rapports même si les tests échouent
            archiveArtifacts allowEmptyArchive: true, artifacts: 'artifacts/videos/**/*, artifacts/reports/**/*', followSymlinks: false
        }
    }
}
