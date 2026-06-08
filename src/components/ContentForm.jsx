// Formulário dinâmico por tipo de conteúdo.
// Commit 1: caso `url` já wired ponta a ponta; demais tipos exibem placeholder
// "em breve" e serão implementados no próximo commit.

function UrlForm({ content, setContent }) {
  return (
    <label className="field">
      <span className="field__label">URL</span>
      <input
        type="url"
        className="field__input"
        placeholder="https://exemplo.com"
        value={content.url}
        onChange={(e) => setContent({ ...content, url: e.target.value })}
      />
    </label>
  )
}

export default function ContentForm({ contentType, content, setContent }) {
  return (
    <section className="panel">
      <h2 className="panel__title">Conteúdo</h2>
      {contentType === 'url' ? (
        <UrlForm content={content} setContent={setContent} />
      ) : (
        <p className="panel__hint">Formulário "{contentType}" em breve.</p>
      )}
    </section>
  )
}
