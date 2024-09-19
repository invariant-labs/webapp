import { Buffer as BufferPolyfill } from 'buffer'
declare var Buffer: typeof BufferPolyfill
globalThis.Buffer = BufferPolyfill
window.Buffer = BufferPolyfill
