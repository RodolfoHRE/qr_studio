// Monta o objeto de configuração que será passado ao qr-code-styling.
//
// STUB (commit 1): por enquanto só deriva uma string de dados básica a partir
// do conteúdo e devolve dimensões/cores. O encoding real por tipo
// (WIFI:..., mailto:..., vCard, etc.) e a geração de QR de verdade entram no
// próximo commit junto com a biblioteca qr-code-styling.

/**
 * Deriva a string de dados que será codificada no QR a partir do conteúdo.
 * @param {string} contentType - 'url' | 'text' | 'wifi' | 'email' | 'vcard'
 * @param {object} content - estado de conteúdo (campos por tipo)
 * @returns {string}
 */
function deriveData(contentType, content) {
  switch (contentType) {
    case 'url':
      return content.url ?? ''
    case 'text':
      return content.text ?? ''
    case 'wifi':
      return content.wifi?.ssid ?? ''
    case 'email':
      return content.email?.to ?? ''
    case 'vcard':
      return content.vcard?.name ?? ''
    default:
      return ''
  }
}

/**
 * Constrói o objeto de config (placeholder por enquanto).
 * @param {string} contentType
 * @param {object} content
 * @param {object} style
 * @returns {object}
 */
export function buildQrConfig(contentType, content, style) {
  return {
    data: deriveData(contentType, content),
    width: style.size,
    height: style.size,
    dotsOptions: {
      type: style.dotsType,
      color: style.dotsColor,
    },
    backgroundOptions: {
      color: style.bgColor,
    },
    cornersSquareOptions: {
      type: style.cornersSquareType,
    },
    cornersDotOptions: {
      type: style.cornersDotType,
    },
  }
}
