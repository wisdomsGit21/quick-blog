"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/api";

export function PostContent({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[400px] mb-8"
      >
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
        />
      </motion.div>
      <Badge className="mb-4">{post.category.name}</Badge>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold mb-4"
      >
        {post.title}
      </motion.h1>
      <div className="flex items-center gap-4 text-muted-foreground mb-8">
        <span>By {post.author.name}</span>
        <span>•</span>
        <time dateTime={post.publishedDate}>
          {format(new Date(post.publishedDate), "MMMM d, yyyy")}
        </time>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="prose prose-lg max-w-none"
      >
        {post.content.root.children.map((block, index) => (
          <p key={index} className="mb-4">
            {block.children?.[0]?.text}
          </p>
        ))}
      </motion.div>
    </motion.article>
  );
}
