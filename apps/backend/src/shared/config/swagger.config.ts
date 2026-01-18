import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  apis: ['./src/features/**/*.routes.ts', './src/features/**/*.router.ts', './src/server.ts'],
  definition: {
    components: {
      parameters: {
        LimitParam: {
          description: 'Number of items per page',
          in: 'query',
          name: 'limit',
          schema: {
            default: 10,
            maximum: 100,
            minimum: 1,
            type: 'integer',
          },
        },
        PageParam: {
          description: 'Page number for pagination',
          in: 'query',
          name: 'page',
          schema: {
            default: 1,
            minimum: 1,
            type: 'integer',
          },
        },
        SearchParam: {
          description: 'Search term for filtering results',
          in: 'query',
          name: 'search',
          schema: {
            type: 'string',
          },
        },
      },
      responses: {
        BadRequest: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError',
              },
            },
          },
          description: 'Bad request - validation error',
        },
        InternalServerError: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
          description: 'Internal server error',
        },
        NotFound: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
          description: 'Resource not found',
        },
      },
      schemas: {
        CreateDepartment: {
          properties: {
            code: {
              example: 'CS',
              maxLength: 50,
              minLength: 1,
              type: 'string',
            },
            description: {
              example: 'Department of Computer Science',
              nullable: true,
              type: 'string',
            },
            name: {
              example: 'Computer Science',
              maxLength: 255,
              minLength: 1,
              type: 'string',
            },
          },
          required: ['name', 'code'],
          type: 'object',
        },
        CreateSubject: {
          properties: {
            code: {
              example: 'CS101',
              maxLength: 50,
              minLength: 1,
              type: 'string',
            },
            departmentId: {
              example: 1,
              type: 'integer',
            },
            description: {
              example: 'Basic programming concepts',
              nullable: true,
              type: 'string',
            },
            name: {
              example: 'Introduction to Programming',
              maxLength: 255,
              minLength: 1,
              type: 'string',
            },
          },
          required: ['name', 'code', 'departmentId'],
          type: 'object',
        },
        Department: {
          properties: {
            code: {
              example: 'CS',
              type: 'string',
            },
            createdAt: {
              example: '2024-01-01T00:00:00.000Z',
              format: 'date-time',
              type: 'string',
            },
            description: {
              example: 'Department of Computer Science',
              nullable: true,
              type: 'string',
            },
            id: {
              example: 1,
              type: 'integer',
            },
            name: {
              example: 'Computer Science',
              type: 'string',
            },
            totalSubjects: {
              example: 15,
              type: 'integer',
            },
            updatedAt: {
              example: '2024-01-01T00:00:00.000Z',
              format: 'date-time',
              type: 'string',
            },
          },
          type: 'object',
        },
        DepartmentsResponse: {
          properties: {
            data: {
              items: {
                $ref: '#/components/schemas/Department',
              },
              type: 'array',
            },
            pagination: {
              $ref: '#/components/schemas/PaginationMeta',
            },
          },
          type: 'object',
        },
        Error: {
          properties: {
            error: {
              example: 'An error occurred',
              type: 'string',
            },
          },
          type: 'object',
        },
        PaginationMeta: {
          properties: {
            limit: {
              example: 10,
              type: 'integer',
            },
            page: {
              example: 1,
              type: 'integer',
            },
            total: {
              example: 50,
              type: 'integer',
            },
            totalPages: {
              example: 5,
              type: 'integer',
            },
          },
          type: 'object',
        },
        Subject: {
          properties: {
            code: {
              example: 'CS101',
              type: 'string',
            },
            createdAt: {
              example: '2024-01-01T00:00:00.000Z',
              format: 'date-time',
              type: 'string',
            },
            department: {
              $ref: '#/components/schemas/Department',
              nullable: true,
            },
            departmentId: {
              example: 1,
              type: 'integer',
            },
            description: {
              example: 'Basic programming concepts',
              nullable: true,
              type: 'string',
            },
            id: {
              example: 1,
              type: 'integer',
            },
            name: {
              example: 'Introduction to Programming',
              type: 'string',
            },
            updatedAt: {
              example: '2024-01-01T00:00:00.000Z',
              format: 'date-time',
              type: 'string',
            },
          },
          type: 'object',
        },
        SubjectsResponse: {
          properties: {
            data: {
              items: {
                $ref: '#/components/schemas/Subject',
              },
              type: 'array',
            },
            pagination: {
              $ref: '#/components/schemas/PaginationMeta',
            },
          },
          type: 'object',
        },
        ValidationError: {
          properties: {
            details: {
              items: {
                properties: {
                  code: {
                    example: 'invalid_type',
                    type: 'string',
                  },
                  field: {
                    example: 'name',
                    type: 'string',
                  },
                  message: {
                    example: 'Name is required',
                    type: 'string',
                  },
                },
                type: 'object',
              },
              type: 'array',
            },
            error: {
              example: 'Validation failed',
              type: 'string',
            },
          },
          type: 'object',
        },
      },
    },
    info: {
      description: 'A comprehensive API for managing university departments and subjects',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      title: 'University Management API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        description: 'Development server',
        url: 'http://localhost:8000',
      },
    ],
    tags: [
      {
        description: 'Subject management endpoints',
        name: 'Subjects',
      },
      {
        description: 'Department management endpoints',
        name: 'Departments',
      },
    ],
  },
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
