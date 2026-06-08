import { useEffect, useMemo, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { buildQrConfig } from '../lib/qrConfig.js'
import { useDebouncedValue } from '../hooks/useDebouncedValue.js'

// Renderiza o QR de verdade via qr-code-styling. Inputs passam por debounce
// (~300ms) para não regenerar a cada tecla. Quando o conteúdo está vazio,
// mostra o estado vazio em vez do QR.

export default function QRPreview({ contentType, content, style }) {
  const debouncedContent = useDebouncedValue(content, 300)
  const debouncedStyle = useDebouncedValue(style, 300)

  const config = useMemo(
    () => buildQrConfig(contentType, debouncedContent, debouncedStyle),
    [contentType, debouncedContent, debouncedStyle],
  )

  const isEmpty = !config.data
  const containerRef = useRef(null)

  useEffect(() => {
    const node = containerRef.current
    if (isEmpty || !node) return

    const qr = new QRCodeStyling(config)
    node.innerHTML = ''
    qr.append(node)

    return () => {
      node.innerHTML = ''
    }
  }, [config, isEmpty])

  return (
    <section className="preview">
      <h2 className="panel__title">Preview</h2>
      <div className="preview__stage">
        {isEmpty && (
          <div className="preview__empty">
            Preencha o conteúdo para gerar o QR code.
          </div>
        )}
        <div
          ref={containerRef}
          className="preview__qr"
          style={{ display: isEmpty ? 'none' : 'flex' }}
        />
      </div>
    </section>
  )
}
