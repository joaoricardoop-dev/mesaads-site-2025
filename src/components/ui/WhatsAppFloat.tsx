import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  /** Número com DDI + DDD, sem formatação. Ex: 5592981596354 */
  phone?: string
  /** Mensagem pré-preenchida */
  message?: string
  /** Ms de atraso antes de aparecer */
  showAfterMs?: number
  /** Mostra tooltip ao lado do botão */
  showTooltip?: boolean
  className?: string
}

export function WhatsAppFloat({
  phone = '5592981596354',
  message = 'Olá! Quero saber mais sobre anunciar no mesa.ads.',
  showAfterMs = 1200,
  showTooltip = true,
  className,
}: Props) {
  const [visible, setVisible] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), showAfterMs)
    return () => clearTimeout(t)
  }, [showAfterMs])

  // Mostra tooltip ~2s depois de aparecer, uma vez só
  useEffect(() => {
    if (!visible || !showTooltip) return
    const open = setTimeout(() => setTipOpen(true), 2200)
    const close = setTimeout(() => setTipOpen(false), 6800)
    return () => {
      clearTimeout(open)
      clearTimeout(close)
    }
  }, [visible, showTooltip])

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={clsx(
            'fixed bottom-6 right-6 z-50 print:hidden',
            // compensa a bottom sheet do checkout mobile
            'xl:bottom-8 xl:right-8',
            className,
          )}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tipOpen && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-hairline bg-ink-950/90 backdrop-blur-xl px-4 py-2 text-[12px] tracking-tight text-chalk shadow-soft"
                role="status"
              >
                Fale no WhatsApp
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setTipOpen(false)
                  }}
                  aria-label="Fechar dica"
                  className="ml-3 text-chalk/45 hover:text-chalk transition-colors"
                >
                  ✕
                </button>
                <span
                  aria-hidden
                  className="absolute right-[-5px] top-1/2 -translate-y-1/2 size-2 rotate-45 bg-ink-950/90 border-r border-t border-hairline"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-12px_rgba(37,211,102,0.8),0_4px_14px_-6px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 ease-apple"
          >
            {/* Pulse ring */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full animate-pulse-whatsapp"
            />
            <WhatsAppIcon className="size-7" />
          </motion.a>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse-whatsapp {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          50% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
        }
        .animate-pulse-whatsapp {
          animation: pulse-whatsapp 2.4s ease-out infinite;
        }
      `}</style>
    </AnimatePresence>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M16.003 5.333c-5.888 0-10.666 4.777-10.666 10.665a10.6 10.6 0 0 0 1.515 5.456l-1.549 5.665 5.804-1.52a10.65 10.65 0 0 0 4.895 1.2h.001c5.887 0 10.665-4.777 10.665-10.665S21.891 5.333 16.003 5.333zm0 19.535a8.85 8.85 0 0 1-4.513-1.235l-.323-.193-3.36.881.897-3.275-.21-.336a8.84 8.84 0 0 1-1.356-4.711c0-4.897 3.982-8.88 8.882-8.88a8.87 8.87 0 0 1 8.882 8.88c-.001 4.9-3.984 8.88-8.88 8.87zm4.87-6.654c-.267-.133-1.578-.779-1.822-.867-.245-.089-.423-.133-.6.134-.178.267-.688.867-.844 1.044-.155.178-.311.2-.577.067-.267-.134-1.125-.415-2.143-1.321-.792-.707-1.327-1.58-1.482-1.847-.156-.267-.017-.411.117-.544.12-.12.267-.311.4-.467.133-.155.178-.267.267-.444.089-.178.044-.333-.022-.467-.067-.134-.6-1.444-.822-1.977-.216-.52-.436-.449-.6-.457-.155-.008-.333-.01-.51-.01-.178 0-.467.067-.711.334-.244.267-.933.911-.933 2.222s.956 2.578 1.089 2.755c.133.178 1.882 2.877 4.56 4.031.637.275 1.134.439 1.522.562.639.203 1.221.175 1.682.106.513-.077 1.578-.645 1.8-1.267.222-.622.222-1.156.156-1.267-.067-.111-.244-.178-.511-.311z" />
    </svg>
  )
}
