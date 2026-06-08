// Controles de estilo do QR.
// Commit 1: cor dos pontos e tamanho já wired; restante (esquinas, gradiente,
// logo) entra junto com a geração de QR real.

export default function StylePanel({ style, setStyle }) {
  return (
    <section className="panel">
      <h2 className="panel__title">Estilo</h2>

      <label className="field">
        <span className="field__label">Cor dos pontos</span>
        <input
          type="color"
          className="field__color"
          value={style.dotsColor}
          onChange={(e) => setStyle({ ...style, dotsColor: e.target.value })}
        />
      </label>

      <label className="field">
        <span className="field__label">Cor do fundo</span>
        <input
          type="color"
          className="field__color"
          value={style.bgColor}
          onChange={(e) => setStyle({ ...style, bgColor: e.target.value })}
        />
      </label>

      <label className="field">
        <span className="field__label">Tamanho: {style.size}px</span>
        <input
          type="range"
          min="150"
          max="400"
          step="10"
          value={style.size}
          onChange={(e) => setStyle({ ...style, size: Number(e.target.value) })}
        />
      </label>
    </section>
  )
}
