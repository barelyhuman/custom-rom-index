export function Head({ ...props }) {
  return (
    <head {...props}>
      <title>Custom Rom Index | CRI </title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' href='logo.svg' type='image/x-icon' />

      {/* Primary Meta Tags */}
      <meta name='title' content='Custom Rom Index | CRI' />
      <meta
        name='description'
        content='Easiest way to find phones that support custom ROMs'
      />
      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://cri.reaper.im/' />
      <meta property='og:title' content='Custom Rom Index | CRI' />
      <meta
        property='og:description'
        content='Easiest way to find phones that support custom ROMs'
      />
      <meta property='og:image' content='https://cri.reaper.im/og-image.png' />
      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://cri.reaper.im/' />
      <meta property='twitter:title' content='Custom Rom Index | CRI' />
      <meta
        property='twitter:description'
        content='Easiest way to find phones that support custom ROMs'
      />
      <meta
        property='twitter:image'
        content='https://cri.reaper.im/og-image.png'
      />
      {props.children}
    </head>
  );
}
