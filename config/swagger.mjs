import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'MindIndex API',
        version: '0.1.0',
        description:
            'MindIndex Api Documentation',
        license: {
            name: 'Licensed Under Apache license 2.0  ',
            url: 'www.apache.org/licenses/LICENSE-2.0.html',
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.mjs', './controllers/*.mjs'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;