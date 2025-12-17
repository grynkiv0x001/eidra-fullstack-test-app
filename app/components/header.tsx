import Image from 'next/image';
import logo from '@/app/logo.svg';

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <Image
        src={logo}
        alt="Eidra Fullstack Test App"
        width={168}
        height={24}
        className="invert dark:invert-0"
        priority
      />
    </header>
  );
};
