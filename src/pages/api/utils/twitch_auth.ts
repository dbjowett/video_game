import axios from "axios";
import NodeCache from "node-cache";
import { type TwitchParams, type TwitchResponse } from "./types";

const cache = new NodeCache();
const accessTokenUri = "https://id.twitch.tv/oauth2/token";

export const getTwitchAuth = async (
  twitchParams: TwitchParams
): Promise<string> => {
  const queryString = Object.entries(twitchParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    )
    .join("&");

  const url = `${accessTokenUri}?${queryString}`;
  const cachedToken = cache.get("access_token");

  if (!!cachedToken) {
    return cache.get("access_token")!;
  } else {
    const { data }: { data: TwitchResponse } = await axios.post(url);
    const expiresIn = data.expires_in;
    cache.set("access_token", data.access_token, expiresIn);
    return data.access_token;
  }
};
