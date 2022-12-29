import { App, Stack, StackProps } from 'aws-cdk-lib';
import { StaticWebHost } from './StaticWebHost';


export class RecordSpaStack extends Stack {
    constructor(app: App, id: string, stackProps: StackProps) {
        super(app, id, stackProps);

        new StaticWebHost(this, 'Record-Spa');
    }
};
