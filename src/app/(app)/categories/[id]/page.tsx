import { Suspense } from "react";

import { PostSkeleton } from "@/components/post-skeleton";
import { api } from "@/lib/axios";
import { Category, Post } from "@/types/api";
import CategoryContent from "./categories-content";

async function getCategory(
  id: number
): Promise<{ category: Category; posts: Post[] }> {
  const [categoryRes, postsRes] = await Promise.all([
    api.getCategory(id),
    api.getPosts(),
  ]);
  const posts = postsRes.data.docs.filter((post) => post.category.id === id);
  return { category: categoryRes.data, posts };
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id, 10);
  const categoryPromise = getCategory(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<PostSkeleton count={6} />}>
        <CategoryContent {...await categoryPromise} />
      </Suspense>
    </div>
  );
}
