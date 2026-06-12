// Controles de estilo do QR: cores, tipos de ponto/canto, gradiente nos pontos
// e logo central (que força correção de erro H em qrConfig).

const DOT_TYPES = [
  ['square', 'Quadrado'],
  ['dots', 'Pontos'],
  ['rounded', 'Arredondado'],
  ['extra-rounded', 'Bem arredondado'],
  ['classy', 'Clássico'],
  ['classy-rounded', 'Clássico arredondado'],
]

const CORNER_SQUARE_TYPES = [
  ['square', 'Quadrado'],
  ['dot', 'Ponto'],
  ['extra-rounded', 'Bem arredondado'],
]

const CORNER_DOT_TYPES = [
  ['square', 'Quadrado'],
  ['dot', 'Ponto'],
]

export default function StylePanel({ style, setStyle }) {
  const set = (patch) => setStyle({ ...style, ...patch })

  const gradientOn = Boolean(style.gradient)

  const toggleGradient = (on) => {
    set({
      gradient: on ? { from: style.dotsColor, to: '#0FB5BA', rotation: 0 } : null,
    })
  }

  const setGradient = (patch) => set({ gradient: { ...style.gradient, ...patch } })

  const onLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set({ logo: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <section className="panel">
      <h2 className="panel__title">Estilo</h2>

      <label className="field">
        <span className="field__label">Tipo dos pontos</span>
        <select
          className="field__input"
          value={style.dotsType}
          onChange={(e) => set({ dotsType: e.target.value })}
        >
          {DOT_TYPES.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      {!gradientOn && (
        <label className="field">
          <span className="field__label">Cor dos pontos</span>
          <input
            type="color"
            className="field__color"
            value={style.dotsColor}
            onChange={(e) => set({ dotsColor: e.target.value })}
          />
        </label>
      )}

      <label className="field field--inline">
        <input
          type="checkbox"
          checked={gradientOn}
          onChange={(e) => toggleGradient(e.target.checked)}
        />
        <span className="field__label">Gradiente nos pontos</span>
      </label>

      {gradientOn && (
        <div className="field-group">
          <label className="field">
            <span className="field__label">Cor inicial</span>
            <input
              type="color"
              className="field__color"
              value={style.gradient.from}
              onChange={(e) => setGradient({ from: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field__label">Cor final</span>
            <input
              type="color"
              className="field__color"
              value={style.gradient.to}
              onChange={(e) => setGradient({ to: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field__label">Ângulo: {style.gradient.rotation}°</span>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={style.gradient.rotation}
              onChange={(e) => setGradient({ rotation: Number(e.target.value) })}
            />
          </label>
        </div>
      )}

      <label className="field">
        <span className="field__label">Cor do fundo</span>
        <input
          type="color"
          className="field__color"
          value={style.bgColor}
          onChange={(e) => set({ bgColor: e.target.value })}
        />
      </label>

      <label className="field">
        <span className="field__label">Tipo do quadrado de canto</span>
        <select
          className="field__input"
          value={style.cornersSquareType}
          onChange={(e) => set({ cornersSquareType: e.target.value })}
        >
          {CORNER_SQUARE_TYPES.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Cor do quadrado de canto</span>
        <input
          type="color"
          className="field__color"
          value={style.cornersSquareColor}
          onChange={(e) => set({ cornersSquareColor: e.target.value })}
        />
      </label>

      <label className="field">
        <span className="field__label">Tipo do ponto de canto</span>
        <select
          className="field__input"
          value={style.cornersDotType}
          onChange={(e) => set({ cornersDotType: e.target.value })}
        >
          {CORNER_DOT_TYPES.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Cor do ponto de canto</span>
        <input
          type="color"
          className="field__color"
          value={style.cornersDotColor}
          onChange={(e) => set({ cornersDotColor: e.target.value })}
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
          onChange={(e) => set({ size: Number(e.target.value) })}
        />
      </label>

      <div className="field">
        <span className="field__label">Logo central</span>
        <input type="file" accept="image/*" onChange={onLogoChange} />
        {style.logo && (
          <>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => set({ logo: null })}
            >
              Remover logo
            </button>
            <label className="field">
              <span className="field__label">
                Tamanho do logo: {Math.round(style.logoSize * 100)}%
              </span>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={style.logoSize}
                onChange={(e) => set({ logoSize: Number(e.target.value) })}
              />
            </label>
            <p className="panel__hint">Correção de erro forçada para H.</p>
          </>
        )}
      </div>
    </section>
  )
}
