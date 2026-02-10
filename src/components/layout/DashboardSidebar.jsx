import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiBarChart2,
  FiPlus,
  FiList,
  FiCheckCircle,
  FiEdit,
  FiPrinter,
  FiFileText,
  FiFile,
  FiDownload,
  FiUpload,
  FiRepeat,
  FiCalendar,
  FiRadio,
  FiTag,
  FiHome,
  FiBook,
  FiZap,
  FiLogOut,
} from 'react-icons/fi'
import { Avatar } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { getLoginNameFromToken } from '@/utils/jwt'

/* Icon color from palette: primary, success, warning, etc. */
const INVENTORY_MANAGEMENT = [
  { to: '/', label: 'Dashboard', icon: FiBarChart2, iconColor: 'var(--color-success)' },
  { to: '/add-inventory', label: 'Add Inventory', icon: FiPlus, iconColor: 'var(--color-warning)' },
  { to: '/inventory-list', label: 'Inventory List', icon: FiList, iconColor: 'var(--color-primary)' },
  { to: '/stock-verification', label: 'Stock Verification', icon: FiCheckCircle, iconColor: 'var(--color-success)' },
  { to: '/design-label', label: 'Design Label', icon: FiEdit, iconColor: '#00B4D8' },
  { to: '/create-prn-label', label: 'Create PRN Label', icon: FiPrinter, iconColor: 'var(--color-primary)' },
]

const TRANSACTION = [
  { to: '/quotation', label: 'Quotation', icon: FiFileText, iconColor: 'var(--color-error)' },
  { to: '/invoice', label: 'Invoice', icon: FiFile, iconColor: 'var(--color-success)' },
  { to: '/sample-in', label: 'Sample In', icon: FiDownload, iconColor: 'var(--color-success)' },
  { to: '/sample-out', label: 'Sample Out', icon: FiUpload, iconColor: 'var(--color-error)' },
  { to: '/stock-transfer', label: 'Stock Transfer', icon: FiRepeat, iconColor: 'var(--color-warning)' },
  { to: '/order-list', label: 'Order List', icon: FiCalendar, iconColor: '#9B59B6' },
  { to: '/reports', label: 'Reports', icon: FiFileText, iconColor: '#00B4D8' },
]

const RFID_TAGS_MANAGEMENT = [
  { to: '/scan-to-desktop', label: 'Scan to Desktop', icon: FiRadio, iconColor: 'var(--color-error)' },
  { to: '/rfid-tags-sheet-upload', label: 'RFID Tags Sheet Upload', icon: FiUpload, iconColor: 'var(--color-primary)' },
  { to: '/rfid-tag-list', label: 'RFID Tag List', icon: FiTag, iconColor: 'var(--color-error)' },
  { to: '/rfid-tags-usage', label: 'RFID Tags Usage', icon: FiTag, iconColor: '#00B4D8' },
]

const RFID_OPERATIONS = [
  { to: '/rfid-api-hub', label: 'RFID API Hub', icon: FiHome, iconColor: 'var(--color-primary)' },
  { to: '/api-integration-guide', label: 'API Integration Guide', icon: FiBook, iconColor: '#9B59B6' },
  { to: '/quick-integration', label: 'Quick Integration', icon: FiZap, iconColor: 'var(--color-warning)' },
]

const sectionVariants = {
  hidden: { opacity: 0, x: -4 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.02, duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function NavSection({ title, items, onNavigate, sectionIndex, collapsed }) {
  return (
    <motion.div
      className="dash-sidebar-nav-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      custom={sectionIndex}
    >
      {!collapsed && <div className="dash-sidebar-nav-title">{title}</div>}
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `dash-sidebar-nav-link ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`.trim()
          }
          tabIndex={0}
        >
          {({ isActive }) => (
            <>
              <span
                className="dash-sidebar-nav-icon-wrap"
                style={{ color: isActive ? 'var(--color-success)' : item.iconColor }}
              >
                <item.icon size={16} aria-hidden />
              </span>
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
              {collapsed && (
                <span className="dash-sidebar-tooltip" role="tooltip">
                  {item.label}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </motion.div>
  )
}

export function DashboardSidebar({ onClose, collapsed }) {
  const { token, user, clientCode, logout } = useAuth()
  const navigate = useNavigate()

  const username =
    user?.LoginName ??
    user?.Username ??
    user?.name ??
    (token ? getLoginNameFromToken(token) : null) ??
    'User'
  const displayClientCode = clientCode ?? user?.ClientCode ?? user?.clientCode ?? null

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <motion.div
        className={`dash-sidebar-profile ${collapsed ? 'collapsed' : ''}`.trim()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="dash-sidebar-profile-inner" title={collapsed ? `${username}${displayClientCode ? ` • ${displayClientCode}` : ''}` : undefined}>
          <div className="dash-sidebar-profile-avatar-wrap">
            <Avatar name={username} />
          </div>
          {!collapsed && (
            <div className="dash-sidebar-profile-info">
                <div className="dash-sidebar-profile-name" title={username}>{username}</div>
                {displayClientCode && (
                  <span className="dash-sidebar-profile-code">{displayClientCode}</span>
                )}
              </div>
          )}
        </div>
      </motion.div>

      <nav className="dash-sidebar-nav" aria-label="Main navigation" role="navigation">
        <NavSection title="INVENTORY MANAGEMENT" items={INVENTORY_MANAGEMENT} onNavigate={onClose} sectionIndex={0} collapsed={collapsed} />
        <NavSection title="TRANSACTION" items={TRANSACTION} onNavigate={onClose} sectionIndex={1} collapsed={collapsed} />
        <NavSection title="RFID TAGS MANAGEMENT" items={RFID_TAGS_MANAGEMENT} onNavigate={onClose} sectionIndex={2} collapsed={collapsed} />
        <NavSection title="RFID OPERATIONS" items={RFID_OPERATIONS} onNavigate={onClose} sectionIndex={3} collapsed={collapsed} />
        <motion.button
          type="button"
          className={`dash-sidebar-nav-link dash-sidebar-nav-logout ${collapsed ? 'collapsed' : ''}`.trim()}
          onClick={handleLogout}
          aria-label="Log out"
          tabIndex={0}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <span className="dash-sidebar-nav-icon-wrap" style={{ color: 'var(--color-error)' }}>
            <FiLogOut size={16} aria-hidden />
          </span>
          {!collapsed && <span className="flex-1 truncate">Log out</span>}
          {collapsed && (
            <span className="dash-sidebar-tooltip" role="tooltip">
              Log out
            </span>
          )}
        </motion.button>
      </nav>
    </>
  )
}
