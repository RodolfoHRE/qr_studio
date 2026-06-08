const TABS = [
  { id: 'url', label: 'URL' },
  { id: 'text', label: 'Texto' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'email', label: 'E-mail' },
  { id: 'vcard', label: 'Contato' },
]

export default function TabBar({ contentType, onChange }) {
  return (
    <nav className="tabbar" role="tablist" aria-label="Tipo de conteúdo">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={contentType === tab.id}
          className={
            'tabbar__tab' + (contentType === tab.id ? ' tabbar__tab--active' : '')
          }
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
