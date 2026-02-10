import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Smooth, user-friendly transition between login and register.
 * Motion div is always position:absolute so no layout jump or scrollbar.
 */
const tween = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.32,
}

const variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: tween,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { ...tween, duration: 0.26 },
  },
}

export function AuthPageTransition() {
  const location = useLocation()

  return (
    <div className="auth-pages-wrapper">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="auth-page-motion"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
