import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
  ManualApprovalStep,
} from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./stage";

export class CdkPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "MyDemoCodePipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("jvanson/cdk-pipeline-demo", "main"),
        commands: [
          "pwd",
          "ls -las",
          "npm ci",
          "npm run build",
          "npx cdk synth",
        ],
      }),
    });

    const devStage = pipeline.addStage(
      new MyPipelineAppStage(this, "Dev", {
        env: {
          account: "062887326995",
          region: "us-west-2",
        },
      })
    );

    devStage.addPost(
      new ManualApprovalStep("Manual approve before going to production")
    );

    const prodStage = pipeline.addStage(
      new MyPipelineAppStage(this, "Prod", {
        env: {
          account: "062887326995",
          region: "us-west-2",
        },
      })
    );
  }
}
