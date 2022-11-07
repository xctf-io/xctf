export const env = process.env.NODE_ENV === 'development' ? {
  GRAPHQL_URL: 'http://localhost:4455/api/v1/graphql',
  KRATOS_URL: 'http://localhost:4455/api/kratos',
} : {
  GRAPHQL_URL: 'https://ctfg.io/api/v1/graphql',
  KRATOS_URL: 'https://ctfg.io/api/kratos',
};

