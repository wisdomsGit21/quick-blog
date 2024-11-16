"use client";

import Link from "next/link";
import Image from "next/image";
import { Category, Post } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryContent({
  category,
  posts,
}: {
  category: Category;
  posts: Post[];
}) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        {category.name}
      </motion.h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={item}>
            <Card className="overflow-hidden">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground">
                  {post.content.root.children[2]?.children[0]?.text.slice(
                    0,
                    100
                  )}
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
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
