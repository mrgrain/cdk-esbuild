async function handler(event: AWSCloudFrontFunction.Event): Promise<AWSCloudFrontFunction.Response> {
  var response = event.response;
  var headers = response.headers!;
  
  // Add a custom header to the response
  headers['x-custom-header'] = { value: 'processed-by-esbuild' };
  
  return response;
}
