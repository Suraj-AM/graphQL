import userService from "../services/user.service";
import asyncGraphQLRequest from "../util/catchAsyncGraphQL";
const userQuery = {
    hello: async (_: any, args: any, contextValue: any) => {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    }
};

const userMutation = {
    hello: asyncGraphQLRequest(async (_: any, args: any, contextValue: any) => {
        const user = await userService.createUser({ name: "suraj", email: "suraj2@gmail.com", mobile: 7219550691, password: "Suraj@222" });
        return user;
    })
};

export { userQuery, userMutation };