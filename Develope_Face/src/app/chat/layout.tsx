import { StompProvider } from '@/components/provider/StompProvider'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StompProvider>{children}</StompProvider>
}
