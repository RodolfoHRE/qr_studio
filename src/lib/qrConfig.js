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

// Monta as opções dos pontos: gradiente linear quando style.gradient está
// definido, senão cor sólida (comportamento original). Ângulo vem em graus no
// estado e é convertido para radianos aqui.
function dotsOptions(style) {
  if (style.gradient) {
    return {
      type: style.dotsType,
      gradient: {
        type: 'linear',
        rotation: ((style.gradient.rotation || 0) * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: style.gradient.from },
          { offset: 1, color: style.gradient.to },
        ],
      },
    }
  }
  return {
    type: style.dotsType,
    color: style.dotsColor,
  }
}

/**
 * Constrói o objeto de config do qr-code-styling.
 */
export function buildQrConfig(contentType, content, style) {
  const config = {
    type: 'canvas',
    width: style.size,
    height: style.size,
    data: deriveData(contentType, content),
    margin: 8,
    // Logo presente força correção de erro máxima (H) para o QR continuar
    // legível com a imagem central cobrindo parte dos dados.
    qrOptions: {
      errorCorrectionLevel: style.logo ? 'H' : 'M',
    },
    dotsOptions: dotsOptions(style),
    backgroundOptions: {
      color: style.bgColor,
    },
    cornersSquareOptions: {
      type: style.cornersSquareType,
      color: style.cornersSquareColor,
    },
    cornersDotOptions: {
      type: style.cornersDotType,
      color: style.cornersDotColor,
    },
  }

  if (style.logo) {
    config.image = style.logo
    config.imageOptions = {
      crossOrigin: 'anonymous',
      margin: 4,
      imageSize: style.logoSize,
      hideBackgroundDots: true,
    }
  }

  return config
}
