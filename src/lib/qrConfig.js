// Monta o objeto de configuração passado ao qr-code-styling, incluindo o
// encoding da string de dados conforme o tipo de conteúdo.

// Escapa caracteres especiais do formato Wi-Fi (\ ; , " :).
function escapeWifi(value) {
  return String(value).replace(/([\\;,":])/g, '\\$1')
}

function encodeWifi(wifi) {
  if (!wifi?.ssid) return ''
  const encryption = wifi.encryption || 'WPA'
  const password = wifi.password || ''
  return `WIFI:T:${encryption};S:${escapeWifi(wifi.ssid)};P:${escapeWifi(password)};;`
}

function encodeEmail(email) {
  if (!email?.to) return ''
  const params = []
  if (email.subject) params.push(`subject=${encodeURIComponent(email.subject)}`)
  if (email.body) params.push(`body=${encodeURIComponent(email.body)}`)
  const query = params.length ? `?${params.join('&')}` : ''
  return `mailto:${email.to}${query}`
}

function encodeVcard(vcard) {
  if (!vcard?.name) return ''
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${vcard.name}`]
  if (vcard.company) lines.push(`ORG:${vcard.company}`)
  if (vcard.phone) lines.push(`TEL:${vcard.phone}`)
  if (vcard.email) lines.push(`EMAIL:${vcard.email}`)
  lines.push('END:VCARD')
  return lines.join('\n')
}

/**
 * Deriva a string de dados que será codificada no QR.
 * Retorna '' quando o campo principal do tipo está vazio (estado vazio).
 */
export function deriveData(contentType, content) {
  switch (contentType) {
    case 'url':
      return content.url ?? ''
    case 'text':
      return content.text ?? ''
    case 'wifi':
      return encodeWifi(content.wifi)
    case 'email':
      return encodeEmail(content.email)
    case 'vcard':
      return encodeVcard(content.vcard)
    default:
      return ''
  }
}

/**
 * Constrói o objeto de config do qr-code-styling.
 */
export function buildQrConfig(contentType, content, style) {
  return {
    type: 'canvas',
    width: style.size,
    height: style.size,
    data: deriveData(contentType, content),
    margin: 8,
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
