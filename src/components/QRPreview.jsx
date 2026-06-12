import { useEffect, useMemo, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { buildQrConfig } from '../lib/qrConfig.js'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'

// Renderiza o QR de verdade via qr-code-styling. Inputs passam por debounce
// (~300ms) para não regenerar a cada tecla. Quando o conteúdo está vazio,
// mostra o estado vazio em vez do QR. A instância é mantida em ref (criada uma
// vez, atualizada via .update()) para permitir export PNG/SVG via .download().

export default function QRPreview({ contentType, content, style }) {
  const debouncedContent = useDebouncedValue(content, 300)
  const debouncedStyle = useDebouncedValue(style, 300)

  const config = useMemo(
    () => buildQrConfig(contentType, debouncedContent, debouncedStyle),
    [contentType, debouncedContent, debouncedStyle],
  )

  const isEmpty = !config.data
  const containerRef = useRef(null)
  const qrRef = useRef(null)
  const [filename, setFilename] = useState('qr-studio')

  useEffect(() => {
    const node = containerRef.current
    if (isEmpty || !node) return

    if (qrRef.current) {
      qrRef.current.update(config)
    } else {
      qrRef.current = new QRCodeStyling(config)
      qrRef.current.append(node)
    }
  }, [config, isEmpty])

  const handleDownload = (extension) => {
    if (!qrRef.current || isEmpty) return
    const name = filename.trim() || 'qr-studio'
    qrRef.current.download({ name, extension })
  }

  return (
    <section className="preview" aria-label="Pré-visualização do QR code">
      <div className="preview__stage">
        {isEmpty && (
          <div className="preview__empty">
            <svg className="preview__glyph" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6 6h14v14H6V6Zm3 3v8h8V9H9Zm19-3h14v14H28V6Zm3 3v8h8V9h-8ZM6 28h14v14H6V28Zm3 3v8h8v-8H9Zm19-3h5v5h-5v-5Zm9 0h5v5h-5v-5Zm-9 9h5v5h-5v-5Zm9 0h5v5h-5v-5Zm-4-4h4v4h-4v-4Z"
              />
            </svg>
            <p className="preview__empty-text">
              Preencha o conteúdo para gerar o QR code.
            </p>
          </div>
        )}
        <div
          ref={containerRef}
          className="preview__qr"
          style={{ display: isEmpty ? 'none' : 'flex' }}
        />
      </div>

      <div className="export">
        <label className="field export__name">
          <span className="field__label">Nome do arquivo</span>
          <input
            type="text"
            className="field__input"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="qr-studio"
            disabled={isEmpty}
          />
        </label>
        <div className="export__buttons">
          <button
            type="button"
            className="btn"
            onClick={() => handleDownload('png')}
            disabled={isEmpty}
          >
            Baixar PNG
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => handleDownload('svg')}
            disabled={isEmpty}
          >
            Baixar SVG
          </button>
        </div>
      </div>
    </section>
  )
}
