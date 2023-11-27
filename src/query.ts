const queryTypeDefs = `
    hello:String
`;
const queryResolvers = {
    hello: () => 'Hey their Server is up'
};

export { queryTypeDefs, queryResolvers };