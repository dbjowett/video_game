import axios from "axios";
import NodeCache from "node-cache";
import { scheduleJob } from "node-schedule";
import { type TwitchParams, type TwitchResponse } from "./types";

const cache = new NodeCache();
const accessTokenUri = "https://id.twitch.tv/oauth2/token";
let tokenExpirationTime: number;

export const getTwitchAuth = async (
  twitchParams: TwitchParams
): Promise<string> => {
  const queryString = Object.keys(twitchParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          twitchParams[key as keyof typeof twitchParams]
        )}`
    )
    .join("&");

  const url = `${accessTokenUri}?${queryString}`;

  if (tokenExpirationTime && tokenExpirationTime > Date.now()) {
    const currentToken = cache.get("access_token") as string | null;
    if (currentToken !== null) {
      return currentToken;
    }
  }

  try {
    const { data }: { data: TwitchResponse } = await axios.post(url);
    const expiresIn = data.expires_in;
    tokenExpirationTime = Date.now() + expiresIn * 1000;
    cache.set("access_token", data.access_token, expiresIn);
    scheduleJob(new Date(tokenExpirationTime), async () => {
      try {
        await getTwitchAuth(twitchParams);
      } catch (error) {
        console.log(`Couldn't refresh token: `, error);
      }
    });
    return data.access_token;
  } catch (error) {
    console.log(`Couldn't get authorization: `, error);
    throw new Error("Getting Access Token Failed");
  }
};
