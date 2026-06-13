"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import LoadingModal from "./LoadingModal";

export default function NavigationLink({ 
  href, 
  children, 
  className, 
  style 
}: { 
  href: string; 
  children: ReactNode; 
  className?: string; 
  style?: React.CSSProperties;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  const handleNavigation = () => {
    if (href && href !== pathname && !href.startsWith('#')) {
      setIsNavigating(true);
    }
  };

  return (
    <>
      <Link href={href} className={className} style={style} onClick={handleNavigation}>
        {children}
      </Link>
      <LoadingModal show={isNavigating} />
    </>
  );
}
