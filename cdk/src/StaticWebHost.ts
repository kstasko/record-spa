import {aws_s3, aws_cloudfront, aws_s3_deployment, CfnOutput, RemovalPolicy} from "aws-cdk-lib";
import {Construct} from 'constructs';

export class StaticWebHost extends Construct {
    readonly cloudfrontDomain;
    constructor(construct: Construct, id: string) {
        super(construct, id);

        const recordOai = new aws_cloudfront.OriginAccessIdentity(
            this,
            `CloudFrontOriginAccessIdentity`
          );

        const recordSiteBucket = new aws_s3.Bucket(this, 'RecordSite', {
            bucketName: 'record-site',
            publicReadAccess: false,
            removalPolicy: RemovalPolicy.DESTROY
        });

        recordSiteBucket.grantRead(recordOai)

        const recordDistribution = new aws_cloudfront.CloudFrontWebDistribution(this, 'RecordDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: recordSiteBucket,
                        originAccessIdentity: recordOai
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                    
                }
            ],
            errorConfigurations: [
                {
                  errorCode: 404,
                  responseCode: 200,
                  responsePagePath: '/index.html',
                },
                {
                  errorCode: 403,
                  responseCode: 200,
                  responsePagePath: '/index.html',
                },
              ]
        });

        new aws_s3_deployment.BucketDeployment(this, 'RecordDeploy', {
            sources: [aws_s3_deployment.Source.asset(`${__dirname}/../../ui/build`)],
            destinationBucket: recordSiteBucket,
            distribution: recordDistribution,
            distributionPaths: ["/*"],
            retainOnDelete: false
        });

        this.cloudfrontDomain = recordDistribution.distributionDomainName

        new CfnOutput(this, 'cloufront domain name', { value: this.cloudfrontDomain });
        new CfnOutput(this, 'cloufront id', { value: recordDistribution.distributionId })

    }
}