import { useEffect, useState } from 'react'

/**
 * Devolve uma cópia de `value` que só é atualizada após `delay` ms sem
 * mudanças. Usado para evitar regenerar o QR a cada tecla.
 */
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
