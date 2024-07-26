const scanner = require('sonarqube-scanner').default

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.SONARQUBE_TOKEN,
    options: {
      'sonar.projectKey': 'G00dBunny-Portfolio',
      'sonar.projectVersion': '1.0',
      'sonar.language': 'js',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.sources': '.',
      'sonar.exclusions': 'sonar-project.cjs'
    }
  },
  (error) => {
    if (error) {
      console.error(error)
    }
    process.exit()
  }
)
