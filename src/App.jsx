import { useState } from 'react'
import TabBar from './components/TabBar.jsx'
import ContentForm from './components/ContentForm.jsx'
import StylePanel from './components/StylePanel.jsx'
import QRPreview from './components/QRPreview.jsx'

const DEFAULT_CONTENT = {
  url: '',
  text: '',
  wifi: { ssid: '', password: '', encryption: 'WPA' },
  email: { to: '', subject: '', body: '' },
  vcard: { name: '', phone: '', email: '', company: '' },
}

const DEFAULT_STYLE = {
  dotsType: 'square',
  dotsColor: '#000000',
  bgColor: '#ffffff',
  cornersSquareType: 'square',
  cornersDotType: 'square',
  gradient: null,
  logo: null,
  logoSize: 0.3,
  size: 300,
}

export default function App() {
  const [contentType, setContentType] = useState('url')
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [style, setStyle] = useState(DEFAULT_STYLE)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">QR Studio</h1>
        <p className="app__subtitle">Gerador de QR codes customizáveis</p>
      </header>

      <TabBar contentType={contentType} onChange={setContentType} />

      <main className="app__main">
        <div className="app__controls">
          <ContentForm
            contentType={contentType}
            content={content}
            setContent={setContent}
          />
          <StylePanel style={style} setStyle={setStyle} />
        </div>

        <QRPreview contentType={contentType} content={content} style={style} />
      </main>
    </div>
  )
}
