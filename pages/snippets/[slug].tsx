import { MDXRemote } from 'next-mdx-remote';
import SnippetLayout from 'layouts/snippets';
import components from 'components/MDXComponents';
import { mdxToHtml, getFiles, getFileBySlug } from 'lib/mdx';
import { Snippet } from 'lib/types';

export default function SnippetsPage({ snippet }: { snippet: Snippet }) {
  return (
    <SnippetLayout snippet={snippet}>
      <MDXRemote {...snippet.content} components={components} />
    </SnippetLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('snippets');

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
  const {content, ...data} = await getFileBySlug('snippets', params.slug);

  if (!content) {
    return { notFound: true };
  }

  const { html } = await mdxToHtml(content);

  return {
    props: {
      snippet: {
        ...data,
        content: html
      }
    }
  };
}
