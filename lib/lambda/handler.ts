export async function handler(event: string, context: string) {
  console.log("Stage name is: " + process.env.stageName);
  return {
    body: "Hello Lambda Function",
    statusCode: 200,
  };
}
