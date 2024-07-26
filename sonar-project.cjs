const scanner = require('sonarqube-scanner').default

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'sqp_87cdcc922e18bff11660850a1b0240be34fbf46e',
    options: {
      'sonar.projectKey': 'G00dBunny-Portfolio',
      'sonar.projectVersion': '1.0',
      'sonar.language': 'js',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.sources': '.'
    }
  },
  (error) => {
    if (error) {
      console.error(error)
    }
    process.exit()
  }
)
