export const Platforms = Object.freeze({
  LINUX: 3,
  NINTENDO_64: 4,
  WII: 5,
  PC: 6,
  PS: 7,
  PS2: 8,
  PS3: 9,
  XBOX: 11,
  XBOX360: 12,
  MAC: 14,
  C64: 15,
  AMIGA: 16,
  NES: 18,
  SNES: 19,
  DS: 20,
  GC: 21,
  GBC: 22,
  DC: 23,
  GBA: 24,
  MEGA_DRIVE: 29,
  SATURN: 32,
  GB: 33,
  ANDROID: 34,
  GAME_GEAR: 35,
  THREE_DS: 37,
  PSP: 38,
  IOS: 39,
  WII_U: 41,
  VITA: 46,
  PS4: 48,
  XBOX_ONE: 49,
  FAMICOM: 58,
  MASTER_SYSTEM: 64,
  ATARI: 65,
  SEGA_CD: 78,
  TURBO_GRAFX: 86,
  VB: 87,
  STEAM_OS: 92,
  SWITCH: 130,
  OCULUS_VR: 162,
  STEAM_VR: 163,
  PS_VR: 165,
  PS5: 167,
  XBOX_SERIES: 169,
  STADIA: 170,
});

export type GmKey = keyof typeof GenreMap;
export const GenreMap = Object.freeze({
  2: {
    name: "Point-and-click",
    hashtag: "#PointAndClick",
  },
  4: {
    name: "Fighting",
    hashtag: "#Fighting",
  },
  5: {
    name: "Shooter",
    hashtag: "#Shooter",
  },
  7: {
    name: "Music",
    hashtag: "#Music",
  },
  8: {
    name: "Platform",
    hashtag: "#Platform",
  },
  9: {
    name: "Puzzle",
    hashtag: "#Puzzle",
  },
  10: {
    name: "Racing",
    hashtag: "#Racing",
  },
  11: {
    name: "Real Time Strategy (RTS)",
    hashtag: "#RTS",
  },
  12: {
    name: "Role-playing (RPG)",
    hashtag: "#RPG",
  },
  13: {
    name: "Simulator",
    hashtag: "#Simulator",
  },
  14: {
    name: "Sport",
    hashtag: "#Sport",
  },
  15: {
    name: "Strategy",
    hashtag: "#Strategy",
  },
  16: {
    name: "Turn-based strategy (TBS)",
    hashtag: "#TBS",
  },
  24: {
    name: "Tactical",
    hashtag: "#Tactical",
  },
  26: {
    name: "Quiz/Trivia",
    hashtag: "#QuizTrivia",
  },
  25: {
    name: "Hack and slash/Beat 'em up",
    hashtag: "#HackAndSlash",
  },
  30: {
    name: "Pinball",
    hashtag: "#Pinball",
  },
  31: {
    name: "Adventure",
    hashtag: "#Adventure",
  },
  33: {
    name: "Arcade",
    hashtag: "#Arcade",
  },
  34: {
    name: "Visual Novel",
    hashtag: "#VisualNovel",
  },
  32: {
    name: "Indie",
    hashtag: "#Indie",
  },
  35: {
    name: "Card & Board Game",
    hashtag: "#CardAndBoardGame",
  },
  36: {
    name: "MOBA",
    hashtag: "#MOBA",
  },
});

const categoryMap: Record<number, string> = {
  1: "Official",
  2: "Wikia",
  3: "Wikipedia",
  4: "Facebook",
  5: "Twitter",
  6: "Twitch",
  8: "Instagram",
  9: "YouTube",
  10: "iPhone",
  11: "iPad",
  12: "Android",
  13: "Steam",
  14: "Reddit",
  15: "Discord",
  16: "Google Plus",
  17: "Tumblr",
  18: "LinkedIn",
  19: "Pinterest",
  20: "SoundCloud",
};

export const getObjectCategoryName = (
  categoryId: number
): string | undefined => {
  return categoryMap[categoryId];
};
