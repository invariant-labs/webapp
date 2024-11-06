export const messagesToHide: string[] = [
  "(reading 'coingeckoId')",
  'Connection cancelled',
  'Disconnected from polkadot',
  "'click' handler took",
  '<path> attribute d: Expected moveto path command'
]

if (process.env.NODE_ENV === 'production') console.log = () => {}

export function filterConsoleMessages(hideMessages: string[]): void {
  if (typeof window === 'undefined') {
    return
  }

  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'

  if (!isLocalhost) {
    return
  }

  const originalConsole = {
    error: console.error.bind(console),
    warn: console.warn.bind(console)
  }

  const createFilteredMethod = (originalMethod: (...args: any[]) => void) => {
    return (...args: any[]) => {
      const message = args
        .map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
        .join(' ')
      const shouldHide = hideMessages.some(hideMsg => message.includes(hideMsg))
      if (!shouldHide) {
        originalMethod(...args)
      }
    }
  }

  console.error = createFilteredMethod(originalConsole.error)
  console.warn = createFilteredMethod(originalConsole.warn)
}
