import { GraphQLError } from 'graphql';
import userService from '../services/user.service';
import tokenService from '../services/token.service';

interface Context {
    user?: any;
}

const   context = async ({ req }: { req: any}): Promise<Context> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        // Check access token
        if (!token) {
            return {}
        }

        // If token exists, then verify
        const payload: any = tokenService.verifyToken(token);

        // Get user
        const user = await userService.getUserByID(payload.sub);

        // If user deleted or not found
        if (!user) {
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                }
            });
        }

        // Set user in context
        return { user };
    } catch (err: any) {
        throw new GraphQLError(err, {
            extensions: {
                code: 'INTERNALSERVERERROR',
                http: { status: 500 },
            }
        });
    }
};

export default context;
