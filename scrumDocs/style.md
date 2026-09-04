/* ==========================================================================
   MAIN DASHBOARD STYLESHEET & COMPONENT SYSTEM
   ========================================================================== */

/* --- Import Google Fonts --- */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* --- Reset & Global Defaults --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-app);
  color: var(--text-primary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: 1.5;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- Window Shell Container (Full Screen Layout) --- */
.window-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-surface-window);
  border-radius: 0;
  box-shadow: none;
  border: none;
  display: flex;
  flex-direction: column;
}

/* --- Main Layout Grid (Sidebar + Body) --- */
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

/* ==========================================================================
   SIDEBAR NAVIGATION
   ========================================================================== */
.sidebar {
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color-subtle);
  padding: var(--spacing-xl) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.window-dots {
  display: none;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.dot.red { background-color: var(--dot-red); }
.dot.yellow { background-color: var(--dot-yellow); }
.dot.green { background-color: var(--dot-green); }

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.nav-item svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.8;
  stroke: currentColor;
  fill: none;
  flex-shrink: 0;
}

.nav-item:hover {
  color: var(--text-primary);
  background-color: var(--bg-card);
}

.nav-item.active {
  background-color: var(--accent-primary);
  color: var(--accent-primary-text);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-active-item);
}

.nav-item.active svg {
  stroke: var(--accent-primary-text);
  fill: var(--accent-primary-text);
}

.sidebar-divider {
  height: 1px;
  background-color: var(--border-color-subtle);
  margin: var(--spacing-xs) 0;
}

/* ==========================================================================
   MAIN DASHBOARD CONTENT AREA
   ========================================================================== */
.main-content {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  overflow-x: hidden;
}

/* --- Header Bar --- */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 440px;
}

.search-box svg {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  stroke: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  background-color: var(--bg-input);
  border: 1px solid var(--border-color-subtle);
  border-radius: var(--radius-md);
  padding: 12px 16px 12px 46px;
  color: var(--text-primary);
 font-size: var(--font-size-sm);
  font-family: inherit;
  outline: none;
  transition: all var(--transition-fast);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: var(--accent-blue);
  box-shadow: var(--shadow-input-focus);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.icon-btn {
  position: relative;
  background: var(--bg-input);
  border: 1px solid var(--border-color-subtle);
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.icon-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-card);
  border-color: var(--border-color);
}

.notification-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 7px;
  height: 7px;
  background-color: var(--accent-pink);
  border-radius: 50%;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.user-profile:hover {
  background-color: var(--bg-card);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
}

.chevron-down {
  width: 16px;
  height: 16px;
  stroke: var(--text-secondary);
}

/* ==========================================================================
   DASHBOARD GRID SYSTEM
   ========================================================================== */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--spacing-xl);
}

/* --- Card Base Styles --- */
.card {
  background-color: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-color-subtle);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-card);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.card:hover {
  border-color: var(--border-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.card-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.card-subtitle {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 2px;
}


/* ==========================================================================
   LEVEL BAR CHART COMPONENT
   ========================================================================== */
.chart-container-bar {
  height: 160px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: var(--spacing-md);
  gap: 12px;
}

.bar-group {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 100%;
  flex: 1;
  justify-content: center;
}

.bar {
  width: 14px;
  border-radius: var(--radius-full);
  transition: height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bar.volume {
  background-color: #2b3040;
}

.bar.service {
  background-color: var(--accent-teal);
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-dot.volume { background-color: #2b3040; }
.legend-dot.service { background-color: var(--accent-teal); }
.legend-dot.pink { background-color: var(--accent-pink); }