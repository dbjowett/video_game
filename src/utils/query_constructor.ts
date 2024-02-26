type GameField =
  | "age_ratings"
  | "aggregated_rating"
  | "aggregated_rating_count"
  | "alternative_names"
  | "artworks"
  | "bundles"
  | "category"
  | "checksum"
  | "collection"
  | "collections"
  | "cover"
  | "created_at"
  | "dlcs"
  | "expanded_games"
  | "expansions"
  | "external_games"
  | "first_release_date"
  | "forks"
  | "franchise"
  | "franchises"
  | "game_engines"
  | "game_modes"
  | "genres"
  | "hypes"
  | "involved_companies"
  | "keywords"
  | "language_supports"
  | "multiplayer_modes"
  | "name"
  | "parent_game"
  | "platforms"
  | "player_perspectives"
  | "ports"
  | "rating"
  | "rating_count"
  | "release_dates"
  | "remakes"
  | "remasters"
  | "screenshots"
  | "similar_games"
  | "slug"
  | "standalone_expansions"
  | "status"
  | "storyline"
  | "summary"
  | "tags"
  | "themes"
  | "total_rating"
  | "total_rating_count"
  | "updated_at"
  | "url"
  | "version_parent"
  | "version_title"
  | "videos"
  | "websites";

type GameFieldWithSubfields = `${GameField}.*`;
type GameFieldWithSpecificSubfields = `${GameField}.${string}`;
type CompleteGameField =
  | GameField
  | GameFieldWithSubfields
  | GameFieldWithSpecificSubfields;

export interface IGDBQueryOptions {
  fields: CompleteGameField[]; // List of fields to fetch
  where?: string; // Advanced filtering using the `where` syntax
  limit?: number; // How many records to return
  sort?: string;
  search?: string; // A search query
}

// ** @link https://api-docs.igdb.com/#game

/**
 * Construct a query string for the IGDB API.
 *
 * @param options Configuration options for the query.
 * @returns The constructed query string.
 */
export const constructQuery = (options: IGDBQueryOptions): string => {
  const queryParts = [] as string[];

  // Fields part
  if (options.fields && options.fields.length > 0) {
    const fieldsPart = `fields ${options.fields.join(", ")};`;
    queryParts.push(fieldsPart);
  }

  // Where part
  if (options.where) {
    const wherePart = `where ${options.where};`;
    queryParts.push(wherePart);
  }

  // Limit part
  if (options.limit) {
    const limitPart = `limit ${options.limit};`;
    queryParts.push(limitPart);
  }

  // Sort part
  if (options.sort) {
    const sortPart = `sort ${options.sort};`;
    queryParts.push(sortPart);
  }

  // Search part, if applicable
  if (options.search) {
    const searchPart = `search "${options.search}";`;
    queryParts.push(searchPart);
  }

  return queryParts.join(" ");
};
