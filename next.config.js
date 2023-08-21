/** @type {import('next').NextConfig} */

import remarkFrontmatter from 'remark-frontmatter'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX({
  reactStrictMode: true,
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
