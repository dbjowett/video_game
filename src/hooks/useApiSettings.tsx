import { type PageTypes } from "~/components/Navbar";
import { Platforms } from "~/pages/api/utils/constants";

const { PS5, XBOX_SERIES, PS4, SWITCH, STEAM_OS, PC } = Platforms;

export type GetGameProps = PageTypes;

export const getApiSettings = (type: GetGameProps) => {
  const limit = "20";
  const upcoming_options = {
    method: "POST",
    data: `
    fields name, release_dates.*, summary, similar_games, screenshots.image_id, cover.*, rating, genres.name, platforms.*;
    where platforms= (${PS5},${XBOX_SERIES},${PS4},${PC},${SWITCH},${STEAM_OS}) & cover != null & category = 0
    & first_release_date != n & first_release_date >${Math.floor(
      Date.now() / 1000
    )};
    sort first_release_date asc;
    limit ${limit};
    `,
    url: "/games/",
  };

  const toprated_options = {
    method: "POST",
    data: `
    fields name, rating, rating_count, release_dates.*, summary,similar_games, screenshots.image_id, cover.*, rating, genres.name, platforms.*;
    where platforms= (${PS5},${XBOX_SERIES},${PS4},${PC},${SWITCH},${STEAM_OS}) & cover != null & category = 0 & rating > 9 & rating_count > 100;
    sort rating desc;
    limit ${limit};
    `,
    url: "/games/",
  };

  const popular_options = {
    method: "POST",
    data: `
    fields name, rating, rating_count, release_dates.*, summary,similar_games,  screenshots.image_id, cover.*, rating, genres.name, platforms.*;
    where platforms= (${PS5},${XBOX_SERIES},${PS4},${PC},${SWITCH},${STEAM_OS}) & cover != null & category = 0 & rating > 9 & rating_count > 100;
    sort rating desc;
    limit ${limit};
    `,
    url: "/games/",
  };

  const optionMap = {
    popular: popular_options,
    toprated: toprated_options,
    upcoming: upcoming_options,
  } as const;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(optionMap[type as keyof typeof optionMap]),
  };

  return options;
};
