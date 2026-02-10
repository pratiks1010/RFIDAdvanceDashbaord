import { Link } from 'react-router-dom'
import { FiMenu, FiBell, FiSettings, FiMaximize2, FiMinimize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { ThemeToggle } from '@/components/ui'

export function DashboardHeader({ onMenuClick, onSidebarCollapseToggle, sidebarCollapsed, onFullScreenToggle, isFullScreen }) {
  return (
    <header className="dash-header">
      <div className="dash-header-left">
        <button
          type="button"
          className="dash-header-icon-btn dash-header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        <button
          type="button"
          className="dash-header-icon-btn dash-header-collapse-btn"
          onClick={onSidebarCollapseToggle}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
        <Link to="/" className="dash-header-logo" aria-label="Dashboard home">
          <img src="/assets/logo/Vector.png" alt="Sparkle RFID" />
        </Link>
      </div>

      <div className="dash-header-right">
        <button
          type="button"
          className={`dash-header-icon-btn dash-header-fullscreen-btn ${isFullScreen ? 'active' : ''}`.trim()}
          onClick={onFullScreenToggle}
          aria-label={isFullScreen ? 'Exit browser full screen (Ctrl+F)' : 'Browser full screen (Ctrl+F)'}
          title={isFullScreen ? 'Exit browser full screen (Ctrl+F)' : 'Browser full screen (Ctrl+F)'}
        >
          {isFullScreen ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
        </button>
        <button
          type="button"
          className="dash-header-icon-btn relative"
          aria-label="Notifications"
        >
          <FiBell size={20} />
          <span className="dash-header-icon-badge" aria-hidden />
        </button>
        <button
          type="button"
          className="dash-header-icon-btn"
          aria-label="Settings"
        >
          <FiSettings size={20} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}
