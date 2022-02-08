import "@/mock/msw";
import axios from "axios";
import type { NextApiHandler } from "next";
import nc from "next-connect";

export const getHandler: NextApiHandler = async (_, res) => {
  try {
    const { data } = await axios.get("http://api.server.com/posts");
    res.status(200).json({ data });
    return;
  } catch (err) {
    res.status(500);
  }
};

const handler = nc().get(getHandler);
export default handler;
