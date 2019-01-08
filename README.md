# Node.js on Google App Engine Standard environment

## What's this?

This is a sample application for node.js run on Google App Engine Standard environment.
A main focus of this application is a useful and extensional project configuration.

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

### Add `server/src/server-config.ts`

1. Access to GCP console and create your GCP project.
    - https://console.cloud.google.com/home/dashboard
2. Create a service account and save credentials.
    - https://console.cloud.google.com/iam-admin/serviceaccounts
3. Create `server/src/server-config.ts` and add credentials as below:

```typescript
export class ServerConfig {
  static PRODUCTION = {
    "type": "service_account",
    "project_id": "PROJECT_NAME",
    "private_key_id": "xxxx",
    "private_key": "xxxx",
    "client_email": "xxxx",
    "client_id": "xxxx",
    "auth_uri": "xxxx",
    "token_uri": "xxxx",
    "auth_provider_x509_cert_url": "xxxx",
    "client_x509_cert_url": "xxxx"
  };
}
```

### Local development

1. `yarn run start:local`

### Deployment

1. Replace `PROJECT_NAME` to your project name in package.json.
2. `gcloud config configurations create PROJECT_NAME`
3. `gcloud config configurations activate PROJECT_NAME`
4. `gcloud auth login`
5. `yarn run deploy`

You can access your application on https://${PROJECT_NAME}.appspot.com.

## Known issues

- https://github.com/Microsoft/TypeScript/issues/842
    - There is shared TypeScript code on this project, but "@types/node" has a incompatible `setTimeout` signature which cannot run on browser.
