import Link from 'next/link';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';

export default function BackButton({ href = '/', label = '' }) {
  return (
    <>
      {label && <span className="text-xs">{label}</span>}
      <Link href={href}>
        <button className="bg-black m-0 p-0 rounded-full shadow-lg">
          <LeftArrowIcon width={32} height={32} />
        </button>
      </Link>
    </>
  );
}
