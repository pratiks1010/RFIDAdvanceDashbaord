/**
 * Responsive container: max-width + horizontal padding for mobile, tablet, desktop.
 * Uses global spacing tokens.
 */
export function Container({ children, className = '', as: Tag = 'div', size = 'default' }) {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <Tag
      className={[
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.default,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
