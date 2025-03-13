import clsx from 'clsx';

export default function Title({
  children,
  className = '',
  containerStyles = '',
}) {
  return (
    <div className={clsx('', containerStyles)}>
      <h1
        className={clsx(
          'inline-block py-1.5 text-lg font-extrabold ',
          className
        )}
      >
        {children}
      </h1>
    </div>
  );
}
