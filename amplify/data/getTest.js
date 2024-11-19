import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  return ddb.get({ key: { id: ctx.args.id,sort:6 } });
}

export const response = (ctx) => ctx.result;