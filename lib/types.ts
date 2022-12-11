import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
};