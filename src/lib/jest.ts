import type { NextApiHandler } from "next";
import { createMocks, RequestOptions } from "node-mocks-http";

type Args = {
  code: number;
  data: unknown;
};

export async function testHandler(
  handler: NextApiHandler,
  requestOptions: RequestOptions,
  callback: (args: Args) => void
) {
  const { req, res } = createMocks(requestOptions);
  // @ts-ignore
  await handler(req, res);
  const code = res._getStatusCode();
  const data = JSON.parse(res._getData());
  callback({ code, data });
}
