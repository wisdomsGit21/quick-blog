import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { PostContent } from "./post-content";
import { api } from "@/lib/axios";
import { Post } from "@/types/api";

async function getPostData(id: number): Promise<Post> {
  try {
    const res = await api.getPost(id);
    return res.data;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);
  const postData = await getPostData(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-full h-12" />
            <div className="space-y-4">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-2/3 h-6" />
            </div>
          </div>
        }
      >
        <PostContent post={postData} />
      </Suspense>
    </div>
  );
}
