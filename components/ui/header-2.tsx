'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Features',
			href: '#',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'About',
			href: '#',
		},
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-full text-white border-b border-transparent md:rounded-md md:border md:transition-all md:duration-500 md:ease-out',
				{
					'bg-black/60 supports-[backdrop-filter]:bg-black/40 border-white/10 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						scrolled && !open,
					'bg-black/80': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-8 md:h-12 md:px-14 lg:px-20 md:transition-all md:duration-500 md:ease-out',
					{
						'px-4 md:px-6 lg:px-6': scrolled,
					},
				)}
			>
				<WordmarkIcon className="text-white" />
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a key={i} className={cn(buttonVariants({ variant: 'ghost' }), 'text-white/80 hover:text-white hover:bg-white/10')} href={link.href}>
							{link.label}
						</a>
					))}
					<Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">Sign In</Button>
					<Button className="bg-white text-black hover:bg-white/90">Get Started</Button>
				</div>
				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden border-white/20 text-white hover:bg-white/10">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-black/95 backdrop-blur-lg fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-white/10 md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<a
								key={link.label}
								className={cn(buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								}), 'text-white/80 hover:text-white hover:bg-white/10')}
								href={link.href}
							>
								{link.label}
							</a>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
							Sign In
						</Button>
						<Button className="w-full bg-white text-black hover:bg-white/90">Get Started</Button>
					</div>
				</div>
			</div>
		</header>
	);
}

export const WordmarkIcon = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className={cn("font-mono text-sm font-bold tracking-[0.2em] uppercase", className)}>
    noir.labs
  </span>
);

