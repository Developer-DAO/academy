import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTranslation } from 'next-i18next';

interface LessonProps {
  frontMatter: {
    i18n: string;
  };
  mdxSource: MDXRemoteSerializeResult;
}

const Lesson: React.FC<LessonProps> = ({ frontMatter: { i18n }, mdxSource }) => {
  const { t } = useTranslation(i18n);
  return (
    <div>
      <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
    </div>
  );
};

export default Lesson;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("lessons"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("lessons", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};