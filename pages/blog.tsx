import { Suspense, useState } from "react";

import Container from "components/Container";
import BlogPost from "components/BlogPost";
import { InferGetStaticPropsType } from "next";

import {getAllFilesFrontMatter} from 'lib/mdx'
import { Post } from 'lib/types';


export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <Container
      title="Blog – Reza A. Alipour"
      description="What I've been thinking."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {`I have just started writing online and as time passes, my passion for writing is increasing.
          I appreciate that I can share my thoughts and I would be more than happy to have your 
          honest opinion on them. Feel free to explore and read them. I hope I will have been some
          help when you are done. There is a total of ${posts.length} posts available here.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              Featured
            </h3>
            <BlogPost
              title="What this blog is about"
              excerpt="A short story about the motivations behind this blog."
              slug="intro"
            />
          </>
        )}
        <Suspense fallback={null}>
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts
          </h3>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map((post) => (
            <BlogPost
              key={post.title}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </Suspense>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts: Post[] = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}
