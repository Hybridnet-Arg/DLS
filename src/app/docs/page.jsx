import 'swagger-ui-react/swagger-ui.css';
import SwaggerUI from 'swagger-ui-react';
import { createSwaggerSpec } from 'next-swagger-doc';
import packageJSON from '../../../package.json';
import { CONFIG } from '@/constants';

const spec = createSwaggerSpec({
  apis: ['src/app/api/**/*.js', 'src/pages/api/**/*.js'],
  definition: {
    openapi: '3.0.0',
    info: {
      title: `DMS API Documentation (${CONFIG.APP_ENV})`,
      version: packageJSON.version,
      description: `Official API documentation for the DMS system. This instance corresponds to the ${CONFIG.APP_ENV} environment.`,
    },
  },
});

export default async function ApiDocsPage() {
  return <SwaggerUI spec={spec} />;
}
