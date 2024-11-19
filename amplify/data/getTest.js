import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { id, sort } = {id:1,sort:6};
    const key = { id, sort };
    return ddb.get({
        key,
    })
}

export const response = (ctx) => ctx.result;