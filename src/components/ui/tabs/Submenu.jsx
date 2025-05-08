'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePlantaStore } from '@/store/planta.store';

function SubItem({
  hidden,
  disabled,
  title,
  icon,
  selectedOption,
  setSelectedOption,
  id,
}) {
  return (
    <button
      className={clsx(
        'flex items-center gap-2 rounded-s-md px-2 mb-2 w-full text-left',
        {
          'hover:bg-white': !disabled,
          'py-[0.75rem]': !icon,
          'py-[0.3rem]': icon,
          'opacity-50 cursor-not-allowed': disabled,
          'bg-white': id === selectedOption,
          hidden: hidden,
        }
      )}
      key={title}
      onClick={() => !disabled && setSelectedOption(id)}
      disabled={disabled}
    >
      {icon && icon}
      <h2 className="text-sm font-medium">{title}</h2>
    </button>
  );
}

const convertToRegex = (path) => {
  return path.replace(/:\w+/g, '[^/]+').replace(/\//g, '\\/').concat('$');
};

const isInRoute = (links = [], pathname = '') =>
  links.some((link) => {
    const regex = new RegExp(convertToRegex(link));
    return regex.test(pathname);
  });

export default function Submenu({
  items = [],
  defaultValue = '',
  className = '',
  children,
  defaultView,
}) {
  const path = usePathname();
  const { selectedOptionMenu } = usePlantaStore();
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    const key = items?.find((item) => {
      if (item?.links && item?.links?.length > 0) {
        return isInRoute(item?.links, path);
      }
      if (item?.link === path) return item;
      return null;
    })?.key;

    if (key) setSelectedOption(key);
    return () => {
      setSelectedOption(defaultValue);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    setSelectedOption(selectedOptionMenu);
  }, [selectedOptionMenu]);

  return (
    <div
      className={`rounded-b-md mb-5 bg-backgroundGray pt-5 pb-3 px-3 ${className}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-[1] md:flex-[1] rounded-e mt-5">
          {items?.map(
            ({
              disabled,
              hidden,
              title,
              icon,
              onMouseEnter,
              onMouseLeave,
              ...rest
            }) =>
              rest?.link ? (
                onMouseEnter ? (
                  <Link
                    key={rest?.key}
                    href={rest?.link}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    style={{ cursor: 'pointer' }}
                  >
                    <SubItem
                      disabled={disabled}
                      hidden={hidden}
                      title={title}
                      id={rest?.key}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      icon={icon}
                    />
                  </Link>
                ) : (
                  <Link key={rest?.key} href={rest?.link}>
                    <SubItem
                      disabled={disabled}
                      hidden={hidden}
                      title={title}
                      id={rest?.key}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      icon={icon}
                    />
                  </Link>
                )
              ) : (
                <SubItem
                  key={rest?.key}
                  hidden={hidden}
                  disabled={disabled}
                  title={title}
                  id={rest?.key}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  icon={icon}
                />
              )
          )}
        </div>
        <div className="flex-[4.23] md:flex-[4.23] bg-white rounded-lg mt-4 md:mt-0 min-h-[440px] 2xl:min-h-[500px]">
          {children ??
            items?.find((item) => item?.key === selectedOption)?.component ??
            defaultView}
        </div>
      </div>
    </div>
  );
}
