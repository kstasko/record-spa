import { App, Stack, StackProps, aws_cognito, aws_apigateway, aws_lambda } from 'aws-cdk-lib';
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

        const apiLambda = new aws_lambda.Function(this, 'RecordApi', {
            code: aws_lambda.Code.fromAsset(`${__dirname}/../../api/dist`),
            handler: 'lambda.handler',
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            functionName: 'record-api'
        });

        const restApi = new aws_apigateway.LambdaRestApi(this, 'RecordApiGw', {
            handler: apiLambda,
            defaultCorsPreflightOptions: {
                allowOrigins: ['*'],
                allowMethods: ['ANY']
            }
        });

        restApi.methods.forEach(method => {
            const cfnMethod = method.node.defaultChild as aws_apigateway.CfnMethod;
            cfnMethod.addPropertyOverride('ApiKeyRequired', false);
            cfnMethod.addPropertyOverride('AuthorizationType', 'NONE');
            cfnMethod.addPropertyDeletionOverride('AuthorizerId');
        });

    }
};
