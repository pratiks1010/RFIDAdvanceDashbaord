import { useState, useCallback, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardHeader } from './DashboardHeader'

/**
 * Global dashboard shell: user profile + sidebar + header stay static on all pages.
 * Ctrl+F toggles browser full screen (requestFullscreen API).
 */
export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const layoutRef = useRef(null)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v)
  }, [])

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((c) => !c)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const toggleFullScreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        setIsFullScreen(false)
      } else {
        const el = layoutRef.current ?? document.documentElement
        await el.requestFullscreen()
        setIsFullScreen(true)
      }
    } catch {
      setIsFullScreen(false)
    }
  }, [])

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        toggleFullScreen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleFullScreen])

  return (
    <div ref={layoutRef} className="dash-layout">
      {/* Backdrop for mobile when sidebar is open */}
      <div
        className={`dash-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`.trim()}
        onClick={closeSidebar}
        onKeyDown={(e) => e.key === 'Escape' && closeSidebar()}
        role="button"
        tabIndex={-1}
        aria-hidden
      />

      <aside
        className={`dash-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`.trim()}
        aria-label="User profile and navigation"
      >
        <DashboardSidebar onClose={closeSidebar} collapsed={sidebarCollapsed} />
      </aside>

      <div className="dash-main-wrap">
        <DashboardHeader
          onMenuClick={toggleSidebar}
          onSidebarCollapseToggle={toggleSidebarCollapse}
          sidebarCollapsed={sidebarCollapsed}
          onFullScreenToggle={toggleFullScreen}
          isFullScreen={isFullScreen}
        />
        <main className="dash-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
