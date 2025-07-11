import { Inter, Noto_Sans_KR, Lora, JetBrains_Mono } from 'next/font/google'

// 1. UI/본문용 (산세리프 - 고딕체)
// 깔끔하고 모던
export const InterFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-inter', // CSS 변수로도 사용할 수 있게 설정
})

// 2. 한국어 본문용 (산세리프 - 고딕체)
// 한국어 웹의 표준! 가독성이 가장 좋아.
export const NotoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

// 3. 블로그/기사 본문용 (세리프 - 명조체)
// 긴 글을 읽을 때 눈이 편안하고, 클래식한 느낌을 줘.
export const LoraFont = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lora',
})

// Code 미리보기 폰트
export const JetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
})

// Code 미리보기 스타일 밝음
export const PrismLightTheme = `
/* prism-coy.css */
code[class*="language-"], pre[class*="language-"] { color: black; background: none; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -moz-tab-size: 4; -o-tab-size: 4; tab-size: 4; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; }
pre[class*="language-"] { position: relative; margin: .5em 0; overflow: visible; padding: 1px; }
.token.comment, .token.prolog, .token.doctype, .token.cdata { color: #708090; }
.token.punctuation { color: #999; }
.token.namespace { opacity: .7; }
.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #905; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #690; }
.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #a67f59; }
.token.atrule, .token.attr-value, .token.keyword { color: #07a; }
.token.function, .token.class-name { color: #DD4A68; }
.token.regex, .token.important, .token.variable { color: #e90; }
.token.important, .token.bold { font-weight: bold; }
.token.italic { font-style: italic; }
.token.entity { cursor: help; }
`
// Code 미리보기 스타일 어두움
export const PrismDarkheme = `
/* prism-okaidia.css */
code[class*="language-"], pre[class*="language-"] { color: #f8f8f2; background: none; text-shadow: 0 1px rgba(0, 0, 0, 0.3); font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -moz-tab-size: 4; -o-tab-size: 4; tab-size: 4; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; }
.token.comment, .token.prolog, .token.doctype, .token.cdata { color: slategray; }
.token.punctuation { color: #f8f8f2; }
.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color: #f92672; }
.token.boolean, .token.number { color: #ae81ff; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #a6e22e; }
.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable { color: #f8f8f2; }
.token.atrule, .token.attr-value, .token.function, .token.class-name { color: #e6db74; }
.token.keyword { color: #66d9ef; }
.token.regex, .token.important { color: #fd971f; }
.token.important, .token.bold { font-weight: bold; }
.token.italic { font-style: italic; }
.token.entity { cursor: help; }
`
