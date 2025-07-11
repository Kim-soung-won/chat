import nextMDX from '@next/mdx'
import type { NextConfig } from 'next'

import rehypeHighlight from 'rehype-highlight'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'

import type { Pluggable } from 'unified'

// rehype-pretty-code에 전달할 옵션을 명시적으로 정의합니다.
const prettyCodeOptions: RehypePrettyCodeOptions = {}

// @next/mdx에 전달될 MDX 처리 옵션의 타입을 정의합니다.
// 이 타입은 @mdx-js/mdx의 Options 인터페이스와 호환되어야 합니다.
interface CustomMDXOptions {
  format?: 'mdx' | 'md'
  remarkPlugins?: Pluggable[]
  rehypePlugins?: Pluggable[]
  [key: string]: any // 그 외 다른 MDX 옵션들을 허용하기 위함
}

const mdxProcessingOptions: CustomMDXOptions = {
  rehypePlugins: [rehypeHighlight],
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: mdxProcessingOptions,
})

const config: NextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'standalone',
  // 여기에 다른 Next.js 설정을 추가할 수 있습니다.
}

export default withMDX(config)
