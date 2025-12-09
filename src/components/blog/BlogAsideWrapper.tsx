// src/components/blog/BlogAsideWrapper.tsx

import { listCategories, listTags } from "@/data/blog";
import BlogAside from "./BlogAside";

export default async function BlogAsideWrapper() {
  const categories = (await listCategories()).data ?? [];
  const tags = (await listTags()).data ?? [];

  return <BlogAside categories={categories} tags={tags} crumb="All Blogs" />;
}