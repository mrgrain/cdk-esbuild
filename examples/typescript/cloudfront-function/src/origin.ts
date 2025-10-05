import cf from 'cloudfront';

function handler(event: AWSCloudFrontFunction.Event): AWSCloudFrontFunction.Request {
  cf.updateRequestOrigin({
    domainName: 'github.com',
    originPath: '/mrgrain/cdk-esbuild',
  });

  return event.request;
}
