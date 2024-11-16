"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/axios";
import { Category, Post } from "@/types/api";
import CategoryContent from "./categories-content";
import { PostSkeleton } from "@/components/post-skeleton";

export default function CategoryPage() {
  const { id } = useParams() as unknown as { id: string };
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<{
    category: Category;
    posts: Post[];
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategoryData = async () => {
      try {
        const categoryId = parseInt(id, 10);

        const [categoryRes, postsRes] = await Promise.all([
          api.getCategory(categoryId),
          api.getPosts(),
        ]);

        const posts = postsRes.data.docs.filter(
          (post) => post.category.id === categoryId
        );

        setCategoryData({ category: categoryRes.data, posts });
      } catch (error) {
        console.error("Failed to fetch category data:", error);
        setCategoryData(null); // Handle gracefully if needed
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PostSkeleton count={6} />
      </div>
    );
  }

  if (!categoryData) {
    return <div>Category not found.</div>; // Customize your fallback UI
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryContent {...categoryData} />
    </div>
  );
}
