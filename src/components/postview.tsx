import Link from "next/link";

import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);


type PostWithUser = RouterOutputs["post"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex flex-col">
     <Link href={`/post/${post.id}`}>
      <div className="flex gap-3 border-b border-slate-400 p-4" key={post.id}>
      <Link href={`/@${author.username}`}>
        <Image
          src={author.profileImageUrl}
          alt={`@${author.username}' profile picture`}
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
          /></Link>
        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`}><span className="hover:underline">{`@${author.username}`}</span></Link>
          <span>·</span>
          <Link href={`/post/${post.id}`}> <span className="font-thin hover:underline underline-offset-0">
              {" "}
              {` ${dayjs(post.createdAt).fromNow()}`}{" "}
            </span></Link>
          </div>
          <span className="text-2xl ">{post.content}</span>
        </div>
      </div>
          </Link>
    </div>
  );
};
