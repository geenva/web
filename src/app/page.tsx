"use client";

import { useLanyard } from "use-lanyard";
import Link from "next/link";

export default function Home() {
  const { data: activity } = useLanyard("457805013474082817");
  let style = "invisible";

  if (
    activity?.discord_status == "online" ||
    activity?.discord_status == "dnd" ||
    activity?.discord_status == "idle"
  )
    style = "text-green-500 animate-pulse";

  return (
    <body className="bg-white text-black dark:bg-black dark:text-white">
      <div className="font-mono align-left m-10 sm:m-6 lg:m-16">
        <h1 className="text-[6vh]">
          Marcus <text className={style}>•</text>
        </h1>
        <p>
          <Link
            className="underline hover:text-blue-700 dark:hover:text-blue-300"
            href="mailto:hc@yipip.uk"
          >
            Email
          </Link>
        </p>
      </div>
    </body>
  );
}
