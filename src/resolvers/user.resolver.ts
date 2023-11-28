import userService from "../services/user.service";
import asyncGraphQLRequest from "../util/catchAsyncGraphQL";
const userQuery = {
    hello: async (_: any, args: any, contextValue: any) => {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    }
};

const userMutation = {
    createUser: asyncGraphQLRequest(async (_: any, args: any, contextValue: any) => {
        const user = await userService.createUser({ name: args.name, email: args.email, mobile: args.mobile, password: args.password });
        return { _id: user._id };
    })
};

export { userQuery, userMutation };