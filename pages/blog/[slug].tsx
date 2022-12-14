import { MDXRemote } from 'next-mdx-remote';
import BlogLayout from 'layouts/blog';
import components from 'components/MDXComponents';
import { getFileBySlug, getFiles, mdxToHtml } from 'lib/mdx';
import { Post } from 'lib/types';

export default function PostPage({ post }: { post: Post }) {
  
  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.content}
        components={
          {
            ...components
          } as any
        }
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
}



export async function getStaticProps({ params }) {
  const {content, ...data} = await getFileBySlug('blog', params.slug);

  if (!content) {
    return { notFound: true };
  }

  const { html, readingTime } = await mdxToHtml(content);

  return {
    props: {
      post: {
        ...data,
        content: html,
        readingTime
      }
    }
  };
}
