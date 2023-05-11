import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import Link from "next/link";



const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.post.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
      <Link href="https://t3-proyect.santiagoellis.dev/">
        <div className="text-slate-400 ml-4 hover">
         ↼ Back Home
        </div>
        </Link>
       <PostView {...data}/>
      </PageLayout>
    </>
  );
};

  export const getStaticProps: GetStaticProps = async (context) => {
    const helpers = generateSSGHelper()

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");


  await helpers.post.getById.prefetch({id});

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
