import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostSkeleton } from "@/components/post-skeleton";
import { api } from "@/lib/axios";
import { Post } from "@/types/api";

async function getAllArticles(): Promise<Post[]> {
  const res = await api.getPosts(); // Adjust the API call to fetch all articles.
  return res.data.docs;
}

function ArticlesList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <Badge className="mb-2">{post.category.name}</Badge>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground">
              {post.content.root.children[2]?.children[0]?.text.slice(0, 100)}
              ...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link href={`/articles/${post.id}`}>
                Read more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default async function ArticlesPage() {
  const postsPromise = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Articles</h1>
      <Suspense fallback={<PostSkeleton count={6} />}>
        <ArticlesList posts={await postsPromise} />
      </Suspense>
    </div>
  );
}
