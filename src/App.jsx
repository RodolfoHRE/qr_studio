import { useEffect, useState } from 'react'
import TabBar from './components/TabBar.jsx'
import ContentForm from './components/ContentForm.jsx'
import StylePanel from './components/StylePanel.jsx'
import QRPreview from './components/QRPreview.jsx'
// Logo principal: lockup horizontal (ícone + wordmark, 405x110). O nome do
// arquivo descreve o TEMA alvo: dark vai no tema escuro, light no claro.
import logoOnDark from './img/svg/qr_studio_logo_name_dark_inline_title.svg'
import logoOnLight from './img/svg/qr_studio_logo_name_light_inline_title.svg'

const DEFAULT_CONTENT = {
  url: '',
  text: '',
  wifi: { ssid: '', password: '', encryption: 'WPA' },
  email: { to: '', subject: '', body: '' },
  vcard: { name: '', phone: '', email: '', company: '' },
}

const DEFAULT_STYLE = {
  dotsType: 'square',
  dotsColor: '#172E7C',
  bgColor: '#ffffff',
  cornersSquareType: 'square',
  cornersSquareColor: '#172E7C',
  cornersDotType: 'square',
  cornersDotColor: '#172E7C',
  gradient: null, // objeto { from, to, rotation } quando ligado, senão cor sólida
  logo: null,
  logoSize: 0.3,
  size: 300,
}

function useTheme() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0D1529' : '#EEEEEE')
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export default function App() {
  const [contentType, setContentType] = useState('url')
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [style, setStyle] = useState(DEFAULT_STYLE)
  const [theme, toggleTheme] = useTheme()

  return (
    <div className="app">
      <header className="topbar">
        <img
          className="topbar__logo"
          src={theme === 'dark' ? logoOnDark : logoOnLight}
          alt="QR Studio"
          width="147"
          height="40"
        />
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      <main className="app__main">
        <div className="app__controls">
          <TabBar contentType={contentType} onChange={setContentType} />
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
