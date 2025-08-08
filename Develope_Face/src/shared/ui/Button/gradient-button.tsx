'use client'
import useThemeStore from '@/shared/store/useLayoutStore'

type GradientButtonBaseProps = {
  label?: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

function GradientButtonBase({
  label,
  onClick,
  className = '',
  children,
}: GradientButtonBaseProps) {
  const theme = useThemeStore((state) => state.theme)
  return (
    <button
      className={`${theme === 'dark' ? 'dark' : ''} ${className}`.trim()}
      onClick={onClick}
    >
      {children || label}
    </button>
  )
}

export const RedButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-red"></GradientButtonBase>
)
export const BlueButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-blue"></GradientButtonBase>
)
export const GreenButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-green"></GradientButtonBase>
)
export const YellowButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-yellow"></GradientButtonBase>
)
export const PurpleButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-purple"></GradientButtonBase>
)
export const PinkButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-pink"></GradientButtonBase>
)
export const TealButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-teal"></GradientButtonBase>
)
export const CyanButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-cyan"></GradientButtonBase>
)
export const OrangeButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-orange"></GradientButtonBase>
)
export const BrownButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-brown"></GradientButtonBase>
)
export const IndigoButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-indigo"></GradientButtonBase>
)
export const LimeButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-lime"></GradientButtonBase>
)
export const OliveButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-olive"></GradientButtonBase>
)
export const CoralButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-coral"></GradientButtonBase>
)
export const MagentaButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase
    {...props}
    className="kkk_bg-magenta"
  ></GradientButtonBase>
)
export const MintButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-mint"></GradientButtonBase>
)
export const GoldButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-gold"></GradientButtonBase>
)
export const SkyButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-sky"></GradientButtonBase>
)
export const PlumButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-plum"></GradientButtonBase>
)
export const BeigeButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-beige"></GradientButtonBase>
)
export const SlateButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase {...props} className="kkk_bg-slate"></GradientButtonBase>
)
export const CharcoalButton = (props: GradientButtonBaseProps) => (
  <GradientButtonBase
    {...props}
    className="kkk_bg-charcoal"
  ></GradientButtonBase>
)
