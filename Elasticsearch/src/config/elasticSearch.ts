const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://e61eef22cc3248a298bb08f2d896b27b.us-central1.gcp.cloud.es.io:443', // Elasticsearch endpoint
  auth: {
    apiKey: { // API key ID and secret
      id: 'PretrazivanjeAplikacija',
      api_key: 'elNiNWZJOEJIOEZUWGFqYkVUbFU6Q1ZZOGNtejRRY0cwa2ZJUk1abVhuQQ==',
    }
  }
})  