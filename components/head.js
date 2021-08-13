import NextHead from 'next/head'

export function Head ({ ...props }) {
  return (
    <NextHead {...props}>
      <title>CRI — Custom Rom Index</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' href='logo.svg' type='image/x-icon' />

      {/* Primary Meta Tags */}
      <meta name='title' content='CRI — Custom Rom Index' />
      <meta
        name='description'
        content='The easiest way to find a rom for your device.As an enthusiast, I’ve wasted hours together to find a working ROM for my devices and also, sometimes I feel like it’s better to spend on devices that already have a great collection of roms. Which is why this website was created so you don’t have to waste time like I did.'
      />
      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://cri.reaper.im/' />
      <meta property='og:title' content='CRI — Custom Rom Index' />
      <meta
        property='og:description'
        content='The easiest way to find a rom for your device.As an enthusiast, I’ve wasted hours together to find a working ROM for my devices and also, sometimes I feel like it’s better to spend on devices that already have a great collection of roms. Which is why this website was created so you don’t have to waste time like I did.'
      />
      <meta property='og:image' content='https://cri.reaper.im/og-image.png' />
      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://cri.reaper.im/' />
      <meta property='twitter:title' content='CRI — Custom Rom Index' />
      <meta
        property='twitter:description'
        content='The easiest way to find a rom for your device.As an enthusiast, I’ve wasted hours together to find a working ROM for my devices and also, sometimes I feel like it’s better to spend on devices that already have a great collection of roms. Which is why this website was created so you don’t have to waste time like I did.'
      />
      <meta
        property='twitter:image'
        content='https://cri.reaper.im/og-image.png'
      />
      {props.children}
    </NextHead>
  )
}
