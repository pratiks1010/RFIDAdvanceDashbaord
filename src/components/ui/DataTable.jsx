import { Checkbox } from './Checkbox'
import { FiChevronDown, FiChevronUp, FiMoreHorizontal, FiStar } from 'react-icons/fi'

/**
 * Data table – like reference: sortable columns, row checkboxes, avatar, badges, star, row actions.
 * columns: [{ key, label, sortable?, render?(value, row), width? }]
 * selectable: show checkbox column; selectedIds, onSelectionChange for controlled selection
 * rowActions?: (row) => ReactNode (e.g. dropdown menu)
 * getRowFavorite?: (row) => boolean; onFavoriteToggle?: (row) => void
 */
export function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data found',
  sortKey,
  sortDir,
  onSort,
  keyField = 'id',
  className = '',
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  rowActions,
  getRowFavorite,
  onFavoriteToggle,
}) {
  const handleSort = (key) => {
    if (!onSort || !columns.find((c) => c.key === key)?.sortable) return
    const nextDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'
    onSort(key, nextDir)
  }

  const allIds = data.map((r) => r[keyField] ?? r.id).filter(Boolean)
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
  const someSelected = selectedIds.length > 0
  const indeterminate = someSelected && !allSelected

  const toggleAll = () => {
    if (!onSelectionChange) return
    if (allSelected) onSelectionChange(selectedIds.filter((id) => !allIds.includes(id)))
    else onSelectionChange([...new Set([...selectedIds, ...allIds])])
  }
  const toggleRow = (id) => {
    if (!onSelectionChange) return
    if (selectedIds.includes(id)) onSelectionChange(selectedIds.filter((x) => x !== id))
    else onSelectionChange([...selectedIds, id])
  }

  const displayColumns = selectable ? [{ key: '__checkbox', label: '', sortable: false, width: '2.5rem' }, ...columns] : columns

  if (loading) {
    return (
      <div className="dash-table-wrap">
        <div className="dash-table-loading">Loading…</div>
      </div>
    )
  }

  return (
    <div className={`dash-table-wrap ${className}`.trim()}>
      <table className="dash-table">
        <thead>
          <tr>
            {displayColumns.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                style={{
                  cursor: col.sortable ? 'pointer' : undefined,
                  width: col.width,
                }}
              >
                {col.key === '__checkbox' ? (
                  <Checkbox
                    checked={allSelected}
                    indeterminate={indeterminate}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                ) : (
                  <>
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="inline-flex ml-1 align-middle">
                        {sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                      </span>
                    )}
                  </>
                )}
              </th>
            ))}
            {(getRowFavorite != null || rowActions) && (
              <th style={{ width: '4rem', textAlign: 'right' }} />
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={displayColumns.length + (getRowFavorite != null || rowActions ? 1 : 0)} className="dash-empty-state">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const rowId = row[keyField] ?? row.id
              const isSelected = rowId != null && selectedIds.includes(rowId)
              return (
                <tr
                  key={rowId ?? JSON.stringify(row)}
                  className={isSelected ? 'dash-table-row-selected' : ''}
                >
                  {displayColumns.map((col) => (
                    <td key={col.key} style={{ width: col.width }}>
                      {col.key === '__checkbox' ? (
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(rowId)}
                          aria-label={`Select row`}
                        />
                      ) : col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  {(getRowFavorite != null || rowActions) && (
                    <td style={{ textAlign: 'right' }}>
                      <div className="inline-flex items-center gap-1">
                        {getRowFavorite != null && onFavoriteToggle && (
                          <button
                            type="button"
                            onClick={() => onFavoriteToggle(row)}
                            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--color-warning)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                            aria-label={getRowFavorite(row) ? 'Unfavorite' : 'Favorite'}
                          >
                            <FiStar
                              size={18}
                              fill={getRowFavorite(row) ? 'var(--color-warning)' : 'transparent'}
                              stroke={getRowFavorite(row) ? 'var(--color-warning)' : 'currentColor'}
                            />
                          </button>
                        )}
                        {rowActions?.(row)}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
