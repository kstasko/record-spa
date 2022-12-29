import {App} from 'aws-cdk-lib';
import { RecordSpaStack } from './RecordSpaStack';

const app = new App();

new RecordSpaStack(app, 'RecordSpaStack', {
  env: {
    account: process.env.AWS_DEFAULT_ACCOUNT,
    region: 'us-east-2'
  }
})
