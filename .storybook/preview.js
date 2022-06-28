import * as NextImage from 'next/image'
import { WalletProvider } from '../components/WalletProvider'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const decorators = [
  (Story) => (
    <WalletProvider>
      <Story />
    </WalletProvider>
  ),
]
