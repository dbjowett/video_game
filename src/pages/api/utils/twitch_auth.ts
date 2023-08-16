import axios from "axios";
import NodeCache from "node-cache";
import { z } from "zod";
import { type TwitchParams, type TwitchResponse } from "./types";

const cache = new NodeCache();
const accessTokenUri = "https://id.twitch.tv/oauth2/token";

export const getTwitchAuth = async (
  twitchParams: TwitchParams
): Promise<string> => {
  const stringSchema = z.string();
  const cachedToken = cache.get("access_token");
  if (cachedToken) {
    return stringSchema.parse(cachedToken);
  } else {
    const url = `${accessTokenUri}?${Object.entries(twitchParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&")}`;

    const {
      data: { expires_in, access_token },
    }: { data: TwitchResponse } = await axios.post(url);
    const expiresIn = expires_in;
    cache.set("access_token", access_token, expiresIn);
    return access_token;
  }
};
