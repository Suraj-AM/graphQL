import userService from "../services/user.service";
import asyncGraphQLRequest from "../utils/catchAsyncGraphQL";
import tokenService from "../services/token.service";
import authService from '../services/auth.service';

const userQuery = {
    hello: async (_: any, args: any, contextValue: any) => {
        return 'Hey their Server is up' + JSON.stringify(contextValue);
    },
    loginUser: asyncGraphQLRequest(async (_: any, args: any, contextValue: any) => {
        const { mobile, password } = args;
        const user = await authService.loginUserWithEmailAndPassword(mobile, password);
        const { token, expires } = tokenService.generateAuthTokens(user);
        return { "accessToken": token };
    })
};

const userMutation = {
    createUser: asyncGraphQLRequest(async (_: any, args: any, contextValue: any) => {
        const user = await userService.createUser({ name: args.name, email: args.email, mobile: args.mobile, password: args.password });
        return { _id: user._id };
    })
};

export { userQuery, userMutation };