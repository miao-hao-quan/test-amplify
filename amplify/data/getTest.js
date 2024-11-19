import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { id, sort } = ctx.args;
    const key = { id, sort };
    return ddb.get({
        key,
    })
}

// export function request(ctx) {
//   const { nextToken, lastSync } = ctx.args;
//   return { operation: 'Sync', limit: 100, nextToken, lastSync };
// }

export const response = (ctx) => ctx.result;