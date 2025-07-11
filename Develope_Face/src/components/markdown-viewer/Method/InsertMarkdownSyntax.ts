export type MarkdownInput =
  | 'bold'
  | 'italic'
  | 'h3'
  | 'link'
  | 'quote'
  | 'codeblock'
  | 'callout'

interface MarkdownSyntaxProps {
  type: MarkdownInput
  selectedText?: string
}

export const insertMarkdownSyntax = ({
  type,
  selectedText,
}: MarkdownSyntaxProps): string => {
  let prefix = ''
  let suffix = ''
  let placeholder = ''
  let textToInsert = ''

  switch (type) {
    case 'bold':
      prefix = '**'
      suffix = '**'
      placeholder = '굵은 텍스트'
      break
    case 'italic':
      prefix = '*'
      suffix = '*'
      placeholder = '기울인 텍스트'
      break
    case 'h3':
      prefix = '\n### '
      suffix = '\n'
      placeholder = '제목 텍스트'
      break
    case 'link':
      prefix = '['
      suffix = `](${prompt('링크 URL을 입력하세요:', 'https://') || ''})`
      placeholder = '링크 텍스트'
      break
    case 'quote':
      prefix = '\n> '
      suffix = '\n'
      placeholder = '인용문'
      break
    case 'codeblock':
      prefix = '\n```javascript\n'
      suffix = '\n```\n'
      placeholder = 'console.log("Hello");'
      break // 언어는 javascript 예시
    case 'callout':
      prefix = '\n<Callout type="info">\n  '
      suffix = '\n</Callout>\n'
      placeholder = '콜아웃 내용'
      break
    // TODO: 다른 타입들 추가 (h2, h3, 리스트 등)
  }

  if (selectedText) {
    textToInsert = `${prefix}${selectedText}${suffix}`
  } else {
    textToInsert = `${prefix}${placeholder}${suffix}`
  }
  return textToInsert
}
