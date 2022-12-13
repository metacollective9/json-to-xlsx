import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'jsontoxlsx',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    
    //'${ssm:/jsontoxlsx/api/BUCKET_NAME}' ssm is not supported yet, I have raised an issue here - https://github.com/serverless/typescript/issues/59. Once this is fixed, we don't have to hardcode bucket names on this file and can be access from AWS system manager's parameter store

    AWS_BUCKET_NAME: 'medium-blogs'

  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      AWS_BUCKET_NAME: '${self:custom.AWS_BUCKET_NAME}'
    },
  },
  functions: {
    jsontoxlsx: {
      handler: 'handler.jsontoxlsx',
      events: [
        {
          http: {
            method: 'get',
            path: 'jsontoxlsx',
          }
        }
      ]
    },
    dynamicJsontoxlsx: {
      handler: 'handler.dynamicJsontoxlsx',
      events: [
        {
          http: {
            method: 'post',
            path: 'djsontoxlsx',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
