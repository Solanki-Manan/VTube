import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "YouTube API",
            version: "1.0.0",
            description: "API documentation for YouTube clone application"
        },
         // 🔐 ADD THIS PART
                components: {
                securitySchemes: {
                bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
                }
            }
            },

        security: [
        {
            bearerAuth: []
        }
        ],
        servers: [
            {
                url: "http://localhost:8000",
            },
            {
                url:"https://project-yt-lu42.onrender.com/"
            }
        ]
    },
    apis:["./src/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;