import * as GradientButton from '@/shared/ui/Button/gradient-button'

const buttons = [
  {
    Component: GradientButton.RedButton,
    name: 'Red',
    light: 'linear-gradient(135deg, #ff6666, #e60000)',
    dark: 'linear-gradient(135deg, #cc4444, #990000)',
    lightHover: 'linear-gradient(135deg, #ff6b6b, #c92a2a)',
    darkHover: 'linear-gradient(135deg, #d14d4d, #b30000)',
  },
  {
    Component: GradientButton.BlueButton,
    name: 'Blue',
    light: 'linear-gradient(135deg, #4da6ff, #0059b3)',
    dark: 'linear-gradient(135deg, #337acc, #003366)',
    lightHover: 'linear-gradient(135deg, #66b3ff, #0066cc)',
    darkHover: 'linear-gradient(135deg, #4080d0, #004080)',
  },
  {
    Component: GradientButton.GreenButton,
    name: 'Green',
    light: 'linear-gradient(135deg, #66cc66, #006600)',
    dark: 'linear-gradient(135deg, #4d994d, #004d00)',
    lightHover: 'linear-gradient(135deg, #70d070, #008000)',
    darkHover: 'linear-gradient(135deg, #59a659, #006600)',
  },
  {
    Component: GradientButton.YellowButton,
    name: 'Yellow',
    light: 'linear-gradient(135deg, #ffd633, #e6b800)',
    dark: 'linear-gradient(135deg, #b38f00, #806000)',
    lightHover: 'linear-gradient(135deg, #ffdb4d, #e6c200)',
    darkHover: 'linear-gradient(135deg, #cca300, #997300)',
  },
  {
    Component: GradientButton.PurpleButton,
    name: 'Purple',
    light: 'linear-gradient(135deg, #b366ff, #6600cc)',
    dark: 'linear-gradient(135deg, #8040b3, #330066)',
    lightHover: 'linear-gradient(135deg, #bf80ff, #7300e6)',
    darkHover: 'linear-gradient(135deg, #8c4dbf, #400080)',
  },
  {
    Component: GradientButton.PinkButton,
    name: 'Pink',
    light: 'linear-gradient(135deg, #ff99cc, #ff1a75)',
    dark: 'linear-gradient(135deg, #b36688, #800040)',
    lightHover: 'linear-gradient(135deg, #ffb3d1, #ff3385)',
    darkHover: 'linear-gradient(135deg, #cc7799, #99004d)',
  },
  {
    Component: GradientButton.TealButton,
    name: 'Teal',
    light: 'linear-gradient(135deg, #66cccc, #006666)',
    dark: 'linear-gradient(135deg, #4d9999, #004d4d)',
    lightHover: 'linear-gradient(135deg, #70d0d0, #008080)',
    darkHover: 'linear-gradient(135deg, #59a6a6, #006666)',
  },
  {
    Component: GradientButton.CyanButton,
    name: 'Cyan',
    light: 'linear-gradient(135deg, #66e0ff, #00b3cc)',
    dark: 'linear-gradient(135deg, #40b3cc, #006680)',
    lightHover: 'linear-gradient(135deg, #80e6ff, #00cce6)',
    darkHover: 'linear-gradient(135deg, #4dbfd9, #00738f)',
  },
  {
    Component: GradientButton.OrangeButton,
    name: 'Orange',
    light: 'linear-gradient(135deg, #ff9933, #cc5200)',
    dark: 'linear-gradient(135deg, #b36b2b, #803300)',
    lightHover: 'linear-gradient(135deg, #ffad5c, #e65c00)',
    darkHover: 'linear-gradient(135deg, #cc7a33, #993d00)',
  },
  {
    Component: GradientButton.BrownButton,
    name: 'Brown',
    light: 'linear-gradient(135deg, #a0522d, #5c3317)',
    dark: 'linear-gradient(135deg, #734026, #3d1f10)',
    lightHover: 'linear-gradient(135deg, #b5653b, #6e3d1d)',
    darkHover: 'linear-gradient(135deg, #804d2b, #4d2614)',
  },
  {
    Component: GradientButton.IndigoButton,
    name: 'Indigo',
    light: 'linear-gradient(135deg, #6666ff, #0000cc)',
    dark: 'linear-gradient(135deg, #4d4db3, #000066)',
    lightHover: 'linear-gradient(135deg, #8080ff, #1a1aff)',
    darkHover: 'linear-gradient(135deg, #5959bf, #000080)',
  },
  {
    Component: GradientButton.LimeButton,
    name: 'Lime',
    light: 'linear-gradient(135deg, #99ff99, #33cc33)',
    dark: 'linear-gradient(135deg, #66b366, #1f661f)',
    lightHover: 'linear-gradient(135deg, #adffad, #40d040)',
    darkHover: 'linear-gradient(135deg, #73bf73, #267326)',
  },
  {
    Component: GradientButton.OliveButton,
    name: 'Olive',
    light: 'linear-gradient(135deg, #808000, #4d4d00)',
    dark: 'linear-gradient(135deg, #666600, #333300)',
    lightHover: 'linear-gradient(135deg, #999900, #666600)',
    darkHover: 'linear-gradient(135deg, #737300, #404000)',
  },
  {
    Component: GradientButton.CoralButton,
    name: 'Coral',
    light: 'linear-gradient(135deg, #ff7f50, #cc4125)',
    dark: 'linear-gradient(135deg, #b35a3b, #802d19)',
    lightHover: 'linear-gradient(135deg, #ff8f66, #e6452b)',
    darkHover: 'linear-gradient(135deg, #cc6644, #99331f)',
  },
  {
    Component: GradientButton.MagentaButton,
    name: 'Magenta',
    light: 'linear-gradient(135deg, #ff4dff, #b300b3)',
    dark: 'linear-gradient(135deg, #993399, #660066)',
    lightHover: 'linear-gradient(135deg, #ff66ff, #cc00cc)',
    darkHover: 'linear-gradient(135deg, #a63aa6, #800080)',
  },
  {
    Component: GradientButton.MintButton,
    name: 'Mint',
    light: 'linear-gradient(135deg, #aaffcc, #33cc99)',
    dark: 'linear-gradient(135deg, #77b38c, #1f6654)',
    lightHover: 'linear-gradient(135deg, #bbffd9, #40d9a6)',
    darkHover: 'linear-gradient(135deg, #85bf99, #26735f)',
  },
  {
    Component: GradientButton.GoldButton,
    name: 'Gold',
    light: 'linear-gradient(135deg, #ffd700, #b38f00)',
    dark: 'linear-gradient(135deg, #997300, #665000)',
    lightHover: 'linear-gradient(135deg, #ffe033, #cca300)',
    darkHover: 'linear-gradient(135deg, #a67a00, #734f00)',
  },
  {
    Component: GradientButton.SkyButton,
    name: 'Sky',
    light: 'linear-gradient(135deg, #87ceeb, #4682b4)',
    dark: 'linear-gradient(135deg, #5c99a6, #2b4d59)',
    lightHover: 'linear-gradient(135deg, #9adcf0, #4a90c2)',
    darkHover: 'linear-gradient(135deg, #66a3b3, #336673)',
  },
  {
    Component: GradientButton.PlumButton,
    name: 'Plum',
    light: 'linear-gradient(135deg, #dda0dd, #993399)',
    dark: 'linear-gradient(135deg, #996699, #663366)',
    lightHover: 'linear-gradient(135deg, #e0b3e0, #a64ca6)',
    darkHover: 'linear-gradient(135deg, #a673a6, #804080)',
  },
  {
    Component: GradientButton.BeigeButton,
    name: 'Beige',
    light: 'linear-gradient(135deg, #f5f5dc, #d2b48c)',
    dark: 'linear-gradient(135deg, #a69980, #665544)',
    lightHover: 'linear-gradient(135deg, #f8f8e0, #dcbf9c)',
    darkHover: 'linear-gradient(135deg, #b3a68d, #736050)',
  },
  {
    Component: GradientButton.SlateButton,
    name: 'Slate',
    light: 'linear-gradient(135deg, #708090, #2f4f4f)',
    dark: 'linear-gradient(135deg, #4d5966, #1f3333)',
    lightHover: 'linear-gradient(135deg, #7a8a9a, #3a5f5f)',
    darkHover: 'linear-gradient(135deg, #596673, #264040)',
  },
  {
    Component: GradientButton.CharcoalButton,
    name: 'Charcoal',
    light: 'linear-gradient(135deg, #36454f, #1c1c1c)',
    dark: 'linear-gradient(135deg, #262f36, #0d0d0d)',
    lightHover: 'linear-gradient(135deg, #40505b, #262626)',
    darkHover: 'linear-gradient(135deg, #2d3840, #121212)',
  },
]

export default function GradientButtonPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gradient Buttons</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Button UI
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Style Value
              </th>
            </tr>
          </thead>
          <tbody>
            {buttons.map(
              ({ Component, name, light, dark, lightHover, darkHover }) => (
                <tr
                  key={name}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <Component>{name}</Component>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col">
                      <p className="font-semibold ">Light Mode:</p>
                      <code className=" p-1 rounded text-sm">
                        {light} & {lightHover}
                      </code>
                      <p className="font-semibold mt-2">Dark Mode:</p>
                      <code className="p-1 rounded text-sm">
                        {dark} & {darkHover}
                      </code>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
