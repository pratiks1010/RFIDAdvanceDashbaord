import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/**
 * Pagination – page, totalPages, onPageChange. Optional page size selector.
 */
export function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
  className = '',
}) {
  const from = totalItems != null && pageSize ? (page - 1) * pageSize + 1 : null
  const to = totalItems != null && pageSize ? Math.min(page * pageSize, totalItems) : null

  const go = (p) => {
    const next = Math.max(1, Math.min(totalPages, p))
    if (next !== page) onPageChange?.(next)
  }

  const showPages = 5
  let start = Math.max(1, page - Math.floor(showPages / 2))
  let end = Math.min(totalPages, start + showPages - 1)
  if (end - start + 1 < showPages) start = Math.max(1, end - showPages + 1)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      <nav className="dash-pagination" aria-label="Pagination">
        <button
          type="button"
          className="dash-pagination-btn"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <FiChevronLeft size={18} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`dash-pagination-btn ${p === page ? 'active' : ''}`}
            onClick={() => go(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="dash-pagination-btn"
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <FiChevronRight size={18} />
        </button>
      </nav>
      {totalItems != null && from != null && to != null && (
        <span className="text-sm text-[var(--text-muted)]">
          {from}–{to} of {totalItems}
        </span>
      )}
      {pageSizeOptions.length > 0 && onPageSizeChange && (
        <select
          className="dash-filter-select w-auto"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          aria-label="Items per page"
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      )}
    </div>
  )
}
