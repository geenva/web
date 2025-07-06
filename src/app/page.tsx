"use client";

import { useLanyard } from "use-lanyard";
import Link from "next/link";
import { ResponseData } from "./api/lastfm/route";
import useSWR from "swr";

// @ts-ignore
const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json() as unknown as ResponseData);

function LastFm() {
  const { data, error } = useSWR("/api/lastfm", fetcher);

  if (error || data?.error == true || !data) return <></>;

  return (
    <div className="bg-gray-200 dark:bg-gray-700">
      <p>
        Listening to{" "}
        <Link href={data.link!} className="text-blue-700 dark:text-blue-400">
          {data.song}{" "}
        </Link>
        by {data.artist}
      </p>
    </div>
  );
}

export default function Home() {
  const { data: activity } = useLanyard("457805013474082817");
  let style = "text-gray-500";

  if (
    activity?.discord_status == "online" ||
    activity?.discord_status == "dnd" ||
    activity?.discord_status == "idle"
  )
    style = "text-green-500 animate-pulse";

  return (
    <body className="bg-white text-black dark:bg-black dark:text-white">
      <div className="font-mono align-left m-10 sm:m-6 lg:m-16">
        <h1 className="text-[6vh] leading-[1]">
          Marcus <text className={style}>•</text>
        </h1>
        <p>Europe</p>

        <br />

        <LastFm />

        <br />
        <div className="group">
          <p>
            <Link href="/piano.jpg" className="animate-pulse hover:underline">
              music
            </Link>
          </p>
        </div>

        <br />
        <p>
          <Link
            href="mailto:hc@yipip.uk"
            className="underline hover:text-blue-700 dark:hover:text-blue-300"
          >
            Email
          </Link>
          <br />
          <Link
            href="https://github.com/geenva/web"
            className="underline hover:text-blue-700 dark:hover:text-blue-300"
          >
            Source
          </Link>
        </p>
      </div>
    </body>
  );
}
