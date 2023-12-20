import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function, InlineCode, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import * as path from "path";

// import { MyPipelineAppStage } from './stage';

export class MyLambdaStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    new Function(this, "LambdaCodePipleineDemo", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler.handler",
      code: Code.fromAsset(path.join(__dirname, "lambda")),
      environment: { stageName: stageName },
    });
  }
}
