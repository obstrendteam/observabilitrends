import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '@/components/Layout';

export default function ArticlePage({ source, frontMatter }) {
  return (
    <Layout>
      <article className="prose max-w-none">
        <h1>{frontMatter.title}</h1>
        <p className="text-sm text-gray-500">{frontMatter.date} — {frontMatter.author}</p>
        <MDXRemote {...source} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), 'content/articles');
  const filenames = fs.readdirSync(articlesDir);
  const paths = filenames.map(name => ({
    params: { slug: name.replace(/\\.mdx?$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/articles', `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontMatter: data } };
}