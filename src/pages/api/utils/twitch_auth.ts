import axios from "axios";
import NodeCache from "node-cache";
import { z } from "zod";
import { type TwitchParams, type TwitchResponse } from "./types";

const cache = new NodeCache();
const accessTokenUri = "https://id.twitch.tv/oauth2/token";

const objectToSearchParams = (obj: Record<string, string>): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, value);
  }
  return params;
};

export const getTwitchAuth = async (
  twitchParams: TwitchParams
): Promise<string> => {
  const stringSchema = z.string();
  const cachedToken = cache.get("access_token");
  if (cachedToken) {
    return stringSchema.parse(cachedToken);
  } else {
    try {
      const urlParams = objectToSearchParams(twitchParams);
      const url = `${accessTokenUri}?${urlParams.toString()}`;

      const {
        data: { expires_in, access_token },
      }: { data: TwitchResponse } = await axios.post(url);

      const responseSchema = z.object({
        expires_in: z.number(),
        access_token: z.string(),
      });

      responseSchema.parse({ expires_in, access_token });

      cache.set("access_token", access_token, expires_in);
      return access_token;
    } catch (error) {
      console.error("Error obtaining Twitch authorization:", error);
      throw new Error("Failed to obtain Twitch authorization");
    }
  }
};
