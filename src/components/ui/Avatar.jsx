/**
 * Avatar – initial or image. Small circle for table rows.
 */
export function Avatar({ src, alt, name, className = '' }) {
  const initial = name
    ? name
        .trim()
        .split(/\s+/)
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'
  return (
    <span className={`dash-avatar ${className}`.trim()}>
      {src ? <img src={src} alt={alt ?? name ?? ''} /> : initial}
    </span>
  )
}
