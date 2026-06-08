// Formulário dinâmico por tipo de conteúdo. Cada tipo edita sua fatia do
// objeto `content`; o campo principal vazio resulta em estado vazio no preview.

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  )
}

function UrlForm({ content, setContent }) {
  return (
    <Field label="URL">
      <input
        type="url"
        className="field__input"
        placeholder="https://exemplo.com"
        value={content.url}
        onChange={(e) => setContent({ ...content, url: e.target.value })}
      />
    </Field>
  )
}

function TextForm({ content, setContent }) {
  return (
    <Field label="Texto">
      <textarea
        className="field__input"
        rows={4}
        placeholder="Qualquer texto"
        value={content.text}
        onChange={(e) => setContent({ ...content, text: e.target.value })}
      />
    </Field>
  )
}

function WifiForm({ content, setContent }) {
  const wifi = content.wifi
  const set = (patch) => setContent({ ...content, wifi: { ...wifi, ...patch } })
  return (
    <>
      <Field label="Nome da rede (SSID)">
        <input
          type="text"
          className="field__input"
          value={wifi.ssid}
          onChange={(e) => set({ ssid: e.target.value })}
        />
      </Field>
      <Field label="Senha">
        <input
          type="text"
          className="field__input"
          value={wifi.password}
          onChange={(e) => set({ password: e.target.value })}
        />
      </Field>
      <Field label="Segurança">
        <select
          className="field__input"
          value={wifi.encryption}
          onChange={(e) => set({ encryption: e.target.value })}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Sem senha</option>
        </select>
      </Field>
    </>
  )
}

function EmailForm({ content, setContent }) {
  const email = content.email
  const set = (patch) => setContent({ ...content, email: { ...email, ...patch } })
  return (
    <>
      <Field label="Destinatário">
        <input
          type="email"
          className="field__input"
          placeholder="alguem@exemplo.com"
          value={email.to}
          onChange={(e) => set({ to: e.target.value })}
        />
      </Field>
      <Field label="Assunto">
        <input
          type="text"
          className="field__input"
          value={email.subject}
          onChange={(e) => set({ subject: e.target.value })}
        />
      </Field>
      <Field label="Mensagem">
        <textarea
          className="field__input"
          rows={3}
          value={email.body}
          onChange={(e) => set({ body: e.target.value })}
        />
      </Field>
    </>
  )
}

function VcardForm({ content, setContent }) {
  const vcard = content.vcard
  const set = (patch) => setContent({ ...content, vcard: { ...vcard, ...patch } })
  return (
    <>
      <Field label="Nome">
        <input
          type="text"
          className="field__input"
          value={vcard.name}
          onChange={(e) => set({ name: e.target.value })}
        />
      </Field>
      <Field label="Telefone">
        <input
          type="tel"
          className="field__input"
          value={vcard.phone}
          onChange={(e) => set({ phone: e.target.value })}
        />
      </Field>
      <Field label="E-mail">
        <input
          type="email"
          className="field__input"
          value={vcard.email}
          onChange={(e) => set({ email: e.target.value })}
        />
      </Field>
      <Field label="Empresa">
        <input
          type="text"
          className="field__input"
          value={vcard.company}
          onChange={(e) => set({ company: e.target.value })}
        />
      </Field>
    </>
  )
}

const FORMS = {
  url: UrlForm,
  text: TextForm,
  wifi: WifiForm,
  email: EmailForm,
  vcard: VcardForm,
}

export default function ContentForm({ contentType, content, setContent }) {
  const Form = FORMS[contentType] ?? UrlForm
  return (
    <section className="panel">
      <h2 className="panel__title">Conteúdo</h2>
      <Form content={content} setContent={setContent} />
    </section>
  )
}
