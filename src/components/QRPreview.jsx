import { buildQrConfig } from '../lib/qrConfig.js'

// Commit 1: prova o pipeline ponta a ponta mostrando a config derivada como
// JSON. A renderização do QR real (canvas/svg via qr-code-styling) entra no
// próximo commit.

export default function QRPreview({ contentType, content, style }) {
  const config = buildQrConfig(contentType, content, style)
  const isEmpty = !config.data

  return (
    <section className="preview">
      <h2 className="panel__title">Preview</h2>
      {isEmpty ? (
        <div className="preview__empty">
          Preencha o conteúdo para gerar o QR code.
        </div>
      ) : (
        <pre className="preview__config">{JSON.stringify(config, null, 2)}</pre>
      )}
    </section>
  )
}
