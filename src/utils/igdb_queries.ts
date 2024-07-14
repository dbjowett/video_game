export const queries = {
  upcoming: `
      fields name, cover.url, genres.name, total_rating, first_release_date;
      where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & first_release_date > ${Math.floor(
        Date.now() / 1000
      )};
      sort first_release_date asc;
      limit 40;
    `,
  popular: `
      fields name, cover.url, genres.name, total_rating, first_release_date;
      where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & total_rating > 9 & total_rating_count > 100;
      sort total_rating desc;
      limit 40;
    `,
  newReleases: `
      fields name, cover.url, genres.name, total_rating, first_release_date;
      where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & first_release_date >= ${
        Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
      } & first_release_date <= ${Date.now() / 1000};
      sort first_release_date desc;
      limit 40;
    `,
  homepage: `
      query games "upcoming" {
        fields name, cover.url, genres.name, total_rating, first_release_date;
        where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & first_release_date > ${Math.floor(
          Date.now() / 1000
        )};
        sort first_release_date asc;
        limit 20;
      };
  
      query games "popular" {
        fields name, cover.url, genres.name, total_rating, first_release_date;
        where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & total_rating > 9 & total_rating_count > 100;
        sort total_rating desc;
        limit 20;
      };
  
      query games "newReleases" {
        fields name, cover.url, genres.name, total_rating, first_release_date;
        where platforms != null & platforms = (167,169,48,6,130,92) & cover != null & category = 0 & first_release_date >= ${
          Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
        } & first_release_date <= ${Date.now() / 1000};
        sort first_release_date desc;
        limit 20;
      };
    `,
};
