import { App, Stack, StackProps, aws_cognito } from 'aws-cdk-lib';
import { StaticWebHost } from './StaticWebHost';


export class RecordSpaStack extends Stack {
    constructor(app: App, id: string, stackProps: StackProps) {
        super(app, id, stackProps);

        const { cloudfrontDomain } = new StaticWebHost(this, 'Record-Spa');

        const userPool = new aws_cognito.UserPool(this, 'RecordUserPool', {
            userPoolName: 'record-user-pool'
        });

        userPool.addDomain('RecordCognitoDomain', {
            cognitoDomain: { domainPrefix: 'theta-over-33' }
        });

        userPool.addClient('RecordSpaClient', {
            userPoolClientName: 'RecordSpa',
            generateSecret: false,
            oAuth: {
                callbackUrls: [`https://${cloudfrontDomain}`],
                flows: {
                    authorizationCodeGrant: true
                }
            }
        });

    }
};
