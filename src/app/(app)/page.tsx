import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostSkeleton } from "@/components/post-skeleton";
import { CategorySkeleton } from "@/components/category-skeleton";
import { api } from "@/lib/axios";
import { Post, Category } from "@/types/api";

async function getLatestPosts(): Promise<Post[]> {
  try {
    const res = await api.getLatestPosts(3);
    return res.data.docs;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return empty array as fallback
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await api.getCategories();
    return res.data.docs;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array as fallback
  }
}

function LatestPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return <div>No posts available</div>;
  }
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

function Categories({ categories }: { categories: Category[] }) {
  if (!categories.length) {
    return <div>No categories available</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          asChild
          className="h-auto py-2 px-4"
        >
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
}

export default async function Home() {
  const postsPromise = getLatestPosts();
  const categoriesPromise = getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Featured Articles</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We believe that every story we tell is a reflection of our team
        </p>
        <Suspense fallback={<PostSkeleton count={3} />}>
          <LatestPosts posts={await postsPromise} />
        </Suspense>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-4">Categories</h2>
        <Suspense fallback={<CategorySkeleton count={5} />}>
          <Categories categories={await categoriesPromise} />
        </Suspense>
      </section>
    </div>
  );
}
