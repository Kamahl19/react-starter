import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

import { cn } from '@/common/styleUtils';
import { Button } from '@/common/components/ui/button';
import { ScrollArea } from '@/common/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/common/components/ui/sheet';

type MenuItem = {
  to: string;
  label: string;
  isActive?: boolean;
};

type Props = {
  logo: ReactNode;
  drawer: ReactNode;
  middleSlot: ReactNode;
  endSlot: ReactNode;
};

const StickyHeader = ({ logo, drawer, middleSlot, endSlot }: Props) => (
  <header className="sticky top-0 z-50 w-full border-b bg-background">
    <div className="container flex h-14 items-center gap-6">
      <div className="hidden md:block">{logo}</div>
      <div className="md:hidden">{drawer}</div>
      <div className="flex-1">{middleSlot}</div>
      {endSlot}
    </div>
  </header>
);

type NavProps = {
  items: MenuItem[];
};

const Nav = ({ items }: NavProps) => (
  <nav className="hidden gap-6 md:flex">
    {items.map(({ to, label, isActive }) => (
      <Link
        key={to}
        to={to}
        className={cn(
          'flex h-10 items-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:underline',
          { 'text-foreground': isActive },
        )}
      >
        {label}
      </Link>
    ))}
  </nav>
);

StickyHeader.Nav = Nav;

type DrawerProps = {
  headerSlot: ReactNode;
  items: MenuItem[];
};

const Drawer = ({ headerSlot, items }: DrawerProps) => {
  const { t } = useTranslation('common');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
          <span className="sr-only">{t('stickyHeader.toggleDrawer')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {headerSlot}
        <ScrollArea className="h-full py-6 pl-8">
          <nav className="flex flex-col gap-2">
            {items.map(({ to, label }) => (
              <Link key={to} to={to} className="py-3">
                {label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

StickyHeader.Drawer = Drawer;

export default StickyHeader;
