import clsx from 'clsx';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function NavLink({
  href = '',
  children,
  firstItem = false,
  lastItem = false,
  alert = false,
  blue = false,
  options = [],
  handleOnClick = () => {},
}) {
  const linkClasses = clsx(
    'text-xs md:text-sm relative group border-y-[0.1rem] px-5 py-[0.46rem] hover:text-white',
    {
      'data-[active]:bg-[rgba(255,255,0,0.1)] data-[state=open]:bg-[rgba(255,255,0,0.1)] hover:bg-[rgba(255,255,0,0.1)] bg-[rgba(255,255,0,0.1)] border-yellow-400':
        alert,
      'data-[active]:bg-[#8FBFE7]/20 data-[state=open]:bg-[#8FBFE7]/20 hover:bg-[#8FBFE7]/20 bg-[#8FBFE7]/20 border-[#8FBFE7]':
        blue,
      'data-[active]:bg-[rgba(0,0,0,0.15)] data-[state=open]:bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.15)] border-white':
        !alert && !blue,
      'border-s-[0.1rem] rounded-s-lg': firstItem,
      'rounded-s-none': !firstItem,
      'border-e-[0.1rem] rounded-e-lg': lastItem,
      'rounded-e-none': !lastItem,
    }
  );

  const spanClasses = clsx(
    'block absolute bottom-0 left-0 w-full h-[0.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    {
      'bg-yellow-400': alert,
      'bg-[#8FBFE7]': blue,
      'bg-white': !alert,
      'rounded-bl-lg': firstItem,
      'rounded-br-lg': lastItem,
    }
  );

  if (options?.length === 0) {
    return href ? (
      <Link href={href} className={linkClasses}>
        {children}
        <span className={spanClasses}></span>
      </Link>
    ) : (
      <button
        className={`${linkClasses} cursor-pointer`}
        onClick={handleOnClick}
      >
        {children}
        <span className={spanClasses}></span>
      </button>
    );
  }

  return (
    <NavigationMenu position="left">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${linkClasses} py-[0.44rem] px-2`}>
            {children}
            <span className={spanClasses}></span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex shadow-lg">
              <div className="flex flex-col">
                {options?.map((option) => (
                  <Link
                    {...option}
                    key={option?.key}
                    href={option?.href}
                    className={clsx(
                      'text-xs w-full px-2 py-[0.4rem] bg-white hover:bg-[#F5D92E] whitespace-nowrap transition duration-700',
                      {
                        'cursor-not-allowed hover:bg-gray-200 text-gray-400':
                          option?.disabled,
                      }
                    )}
                  >
                    {option?.label}
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
