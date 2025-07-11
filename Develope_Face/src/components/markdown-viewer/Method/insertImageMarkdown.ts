interface InsertImageMarkdownProps {
  imageUrl: string
  altText: string
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  setMarkdownInput: React.Dispatch<React.SetStateAction<string>>
}

export const insertImageMarkdown = ({
  imageUrl,
  altText,
  textareaRef,
  setMarkdownInput,
}: InsertImageMarkdownProps) => {
  const imageMarkdown = `![${altText}](${imageUrl})\n`

  if (textareaRef.current) {
    const { selectionStart, selectionEnd, value } = textareaRef.current
    const newValue =
      value.substring(0, selectionStart) +
      imageMarkdown +
      value.substring(selectionEnd)
    setMarkdownInput(newValue)

    setTimeout(() => {
      textareaRef.current?.focus()
      textareaRef.current?.setSelectionRange(
        selectionStart + imageMarkdown.length,
        selectionStart + imageMarkdown.length,
      )
    }, 0)
  } else {
    setMarkdownInput((prev) => prev + imageMarkdown)
  }
}
