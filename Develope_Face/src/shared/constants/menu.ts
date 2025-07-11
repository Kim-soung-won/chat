import { RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material'
import { Cat } from 'lucide-react'

export const pathKeys = {
  root: '/',
  Components: {
    root() {
      return pathKeys.root.concat('components')
    },
    Basic: {
      root() {
        return pathKeys.Components.root().concat('/basic')
      },
      Button() {
        return pathKeys.Components.Basic.root().concat('/button')
      },
      modal() {
        return pathKeys.Components.Basic.root().concat('/modal')
      },
    },
    Game: {
      root() {
        return pathKeys.Components.root().concat('/game')
      },
      FallingCat() {
        return pathKeys.Components.Game.root().concat('/falling-cat')
      },
    },
    Icon: {
      root() {
        return pathKeys.Components.root().concat('/icon')
      },
      Lucide() {
        return pathKeys.Components.Icon.root().concat('/lucide')
      },
      Material() {
        return pathKeys.Components.Icon.root().concat('/mui')
      },
    },
    Slider: {
      root() {
        return pathKeys.Components.root().concat('/slider')
      },
      Snap() {
        return pathKeys.Components.Slider.root().concat('/snap')
      },
    },
    Bar: {
      root() {
        return pathKeys.Components.root().concat('/bar')
      },
      TopNotification() {
        return pathKeys.Components.Bar.root().concat('/top-notification')
      },
      SnackBar() {
        return pathKeys.Components.Bar.root().concat('/snackbar')
      },
    },
  },
}

export const MenuItems = [
  {
    text: 'Button',
    path: pathKeys.Components.Basic.Button(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: '고양이게임',
    path: pathKeys.Components.Game.FallingCat(),
    icon: Cat,
  },
  {
    text: 'Icon Lucide',
    path: pathKeys.Components.Icon.Lucide(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: 'Icon Material',
    path: pathKeys.Components.Icon.Material(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: 'Modal',
    path: pathKeys.Components.Basic.modal(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: 'Snap Slider',
    path: pathKeys.Components.Slider.Snap(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: 'Top Notification',
    path: pathKeys.Components.Bar.TopNotification(),
    icon: RadioButtonCheckedIcon,
  },
  {
    text: 'SnackBar',
    path: pathKeys.Components.Bar.SnackBar(),
    icon: RadioButtonCheckedIcon,
  },
]
