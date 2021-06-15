import { APIGatewayProxyResult } from "aws-lambda";

export const response = (
  body: string = "",
  statusCode = 200,
  headers: APIGatewayProxyResult["headers"] = {}
): APIGatewayProxyResult => ({
  statusCode,
  body,
  headers: {
    "Access-Control-Allow-Origin": "*",
    ...headers,
  },
});

export const jsonResponse = (
  data: unknown,
  statusCode = 200,
  headers: APIGatewayProxyResult["headers"] = {}
): APIGatewayProxyResult =>
  response(JSON.stringify(data, null, 2), statusCode, {
    "Content-Type": "application/json",
    ...headers,
  });

export const emptyResponse = (
  statusCode = 204,
  headers: APIGatewayProxyResult["headers"] = {}
): APIGatewayProxyResult => response("", statusCode, headers);
