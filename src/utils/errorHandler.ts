import { GraphQLError } from "graphql";

class customGraphQLError extends GraphQLError {

    status: number | undefined;

    message: string;

    extensions: {};

    constructor(status: number, message: string, code?: string) {
        super(message);
        this.message = message || "something went wrong!";
        this.extensions = {
            code: code || 'INTERNAL_SERVER_ERROR',
            status: status || 500
        };
    }
}

export default customGraphQLError;