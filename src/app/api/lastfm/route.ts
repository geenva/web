import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";

export type ResponseData = {
  error: boolean;
  listening?: boolean;
  song?: string;
  artist?: string;
  link?: string;
};

interface Welcome8 {
  recenttracks: Recenttracks;
}

interface Recenttracks {
  track: Track[];
  "@attr": RecenttracksAttr;
}

interface RecenttracksAttr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

interface Track {
  artist: Album;
  streamable: string;
  image: Image[];
  mbid: string;
  album: Album;
  name: string;
  "@attr"?: TrackAttr;
  url: string;
  date?: DateClass;
}

interface TrackAttr {
  nowplaying: string;
}

interface Album {
  mbid: string;
  "#text": string;
}

interface DateClass {
  uts: string;
  "#text": string;
}

interface Image {
  size: Size;
  "#text": string;
}

enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Small = "small",
}

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export async function GET(
  req: CombineRequest,
  res: NextApiResponse<ResponseData>
) {
  let apiData = await axios
    .get(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=flarely&api_key=" +
        process.env.LAST_FM +
        "&format=json"
    )
    .then((response) => response.data as Welcome8)
    .catch(() => {
      return res.status(500).json({
        error: true,
      });
    });

  let song = apiData?.recenttracks.track[0];
  let nowPlaying = false;
  if (song && song["@attr"]?.nowplaying == "true") nowPlaying = true;

  return NextResponse.json({
    error: false,
    listening: nowPlaying,
    song: song!.name,
    artist: song!.artist["#text"],
    link: song!.url,
  });
}

export function POST(_: CombineRequest) {
  return NextResponse.json({
    error: true,
  });
}
