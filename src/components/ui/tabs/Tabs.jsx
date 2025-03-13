'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Tabs({ itemTabs = [], defaultValue = 1 }) {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  useEffect(() => {
    const setInitialTab = () => {
      const tab = searchParams.get('tab');
      if (!tab) return;
      setSelectedTab(parseInt(tab));
    };
    setInitialTab();
  }, [searchParams]);

  return (
    <div className="grid grid-cols-5">
      {itemTabs.map((item, index) => (
        <Link href={item?.link} key={item?.key}>
          <button
            className={clsx(
              'w-full py-2 flex items-center justify-center rounded-t-xl',
              'bg-backgroundGray border-slate-300',
              { 'border-r-4': index !== itemTabs.length - 1 },
              { 'bg-gray-500 opacity-90': item?.key !== selectedTab },
              { 'cursor-not-allowed': item?.disabled }
            )}
            onClick={() => {
              setSelectedTab(item?.key);
              if (item?.onClick) {
                item?.onClick();
              }
            }}
            disabled={item?.disabled}
          >
            <span className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap px-4">
              {item?.name}
            </span>
          </button>
        </Link>
      ))}
    </div>
  );
}
