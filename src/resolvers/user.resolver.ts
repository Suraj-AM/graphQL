
const userQuery = {
    hello: async (_: any, args: any, contextValue: any) => {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    }
};

const userMutation = {
    hello: (_: any, args: any, contextValue: any) => {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    }
};

export { userQuery, userMutation };