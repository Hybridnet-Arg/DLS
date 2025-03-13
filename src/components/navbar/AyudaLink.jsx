'use client';
import { NavLink } from './NavLink';
import { AyudaIcon } from './NavIcons';

export default function AyudaLink() {
  const handleDownload = () => {
    const fileUrl = '/static/pdf/user_manual.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'manual_de_uso.pdf';
    link.click();
  };

  return (
    <NavLink firstItem alert handleOnClick={() => handleDownload()}>
      <div className="flex items-center px-5 space-x-2">
        <span className="text-xs md:text-sm">Ayuda</span>
        <AyudaIcon width={16} height={16} />
      </div>
    </NavLink>
  );
}
