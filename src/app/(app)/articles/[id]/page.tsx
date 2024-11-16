// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PostContent } from "./post-content";
import { api } from "@/lib/axios";
import { Post } from "@/types/api";

export default function ArticlePage() {
  const { id } = useParams(); // Get the dynamic route parameter
  const router = useRouter(); // For navigation fallback (e.g., notFound)
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push("/404"); // Redirect to notFound page
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await api.getPost(Number(id));
        setPost(res.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  if (loading) {
    return (
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
    );
  }

  if (!post) {
    return null; // Optionally, render a fallback if the post doesn't exist
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PostContent post={post} />
    </div>
  );
}
