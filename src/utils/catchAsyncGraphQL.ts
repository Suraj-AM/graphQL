import customGraphQLError from '../utils/errorHandler';


type GraphQLMiddlewareFn = (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => Promise<any>;

const asyncGraphQLRequest = (fn: GraphQLMiddlewareFn) => async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    return await fn(resolve, parent, args, context, info);
  } catch (err: any) {
    throw new customGraphQLError(500,err)
  }
};

export default asyncGraphQLRequest;
