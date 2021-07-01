module.exports = {
    schema: [
        {
            'http://localhost:8080/v1/graphql': {
                headers: {
                    'user-agent': 'codegen',
                },
            },
        },
    ],
    documents: ['./src/**/*.{js,jsx,ts,tsx}'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};