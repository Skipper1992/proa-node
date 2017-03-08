'use strict'

const Confidence = require('confidence')
const Config = require('./config')
const heredoc = require('heredoc')

const default_criteria = {
  env: process.env.NODE_ENV
}


const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/web'),
    labels: ['web']
  }],
  registrations: [
    {
      plugin: 'vision'
    },
    {
      plugin: {
        register: 'visionary',
        options: {
          engines: { jade: 'jade' },
          path: './server/web'
        }
      }
    },
    {
      plugin: 'inert'
    },
    {
      plugin: './server/plugins/auth'
    },
    {
      plugin: './server/web/index'
    },
    {
      plugin: {
        register: './server/api/index',
      },
      options: {
        routes: {
          prefix: '/api'
        }
      }
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'title',
            description: heredoc.strip(() => { /*
                    ## description
            */})
          },
          tags: [
            {
              name: 'tag',
              description: 'tag description'
            },
          ],
          basePath: '/api',
          pathPrefixSize: 2,
          documentationPath: '/doc',
          securityDefinitions: {
            'jwt': {
              'type': 'apiKey',
              'name': 'token',
              'in': 'header',
              'description': 'token'
            }
          },
          security: [{ 'jwt': [] }],
        }
      }
    },
  ]
}


const store = new Confidence.Store(manifest)


exports.get = function (key, criteria = default_criteria) {

  return store.get(key, criteria)
}


exports.meta = function (key, criteria = default_criteria) {

  return store.meta(key, criteria)
}
