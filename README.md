# Node.js on Google App Engine Standard environment

## What's this?

This is a sample application for node.js run on Google App Engine Standard environment.
A main focus of this application is a useful and extensional project configuration, 
so it is not included business logic, for example RDB access and so on. 

## How to use

### Prerequisites

- Google Cloud SDK
- Node.js v8
    - yarn
- git CLI
- A project of Google Cloud Platform
  - If you are newbie of GCP/GAE, access https://cloud.google.com and create a new project.

1. `npm install -g yarn`
2. `yarn install`

### Local development

1. `yarn run start:local`

### Deployment

1. Replace `PROJECT_NAME` to your project name in package.json.
2. `yarn run deploy`

You can access your application on https://${PROJECT_NAME}.appspot.com.

## Known issues

- https://github.com/Microsoft/TypeScript/issues/842
    - There is shared TypeScript code on this project, but "@types/node" has a incompatible `setTimeout` signature which cannot run on browser.
