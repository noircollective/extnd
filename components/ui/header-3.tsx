'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { useTranslation, LanguageSwitcher } from '@/lib/i18n';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const { t } = useTranslation();

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { open } }));
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const productLinks: LinkItem[] = [
		{
			title: t('product.websiteBuilder'),
			href: '#',
			description: t('product.websiteBuilder.desc'),
			icon: GlobeIcon,
		},
		{
			title: t('product.cloudPlatform'),
			href: '#',
			description: t('product.cloudPlatform.desc'),
			icon: LayersIcon,
		},
		{
			title: t('product.teamCollaboration'),
			href: '#',
			description: t('product.teamCollaboration.desc'),
			icon: UserPlusIcon,
		},
		{
			title: t('product.analytics'),
			href: '#',
			description: t('product.analytics.desc'),
			icon: BarChart,
		},
		{
			title: t('product.integrations'),
			href: '#',
			description: t('product.integrations.desc'),
			icon: PlugIcon,
		},
		{
			title: t('product.api'),
			href: '#',
			description: t('product.api.desc'),
			icon: CodeIcon,
		},
	];

	const companyLinks: LinkItem[] = [
		{
			title: t('company.aboutUs'),
			href: '#',
			description: t('company.aboutUs.desc'),
			icon: Users,
		},
		{
			title: t('company.customerStories'),
			href: '#',
			description: t('company.customerStories.desc'),
			icon: Star,
		},
		{
			title: t('company.partnerships'),
			href: '#',
			icon: Handshake,
			description: t('company.partnerships.desc'),
		},
	];

	const companyLinks2: LinkItem[] = [
		{
			title: t('company.terms'),
			href: '#',
			icon: FileText,
		},
		{
			title: t('company.privacy'),
			href: '#',
			icon: Shield,
		},
		{
			title: t('company.refund'),
			href: '#',
			icon: RotateCcw,
		},
		{
			title: t('company.blog'),
			href: '#',
			icon: Leaf,
		},
		{
			title: t('company.helpCenter'),
			href: '#',
			icon: HelpCircle,
		},
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-full text-white border-b border-transparent md:rounded-md md:border md:transition-all md:duration-500 md:ease-out',
				{
					'bg-black/60 supports-[backdrop-filter]:bg-black/40 border-white/10 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						scrolled && !open,
					'bg-black/95 supports-[backdrop-filter]:bg-black/80 backdrop-blur-xl border-white/10': open,
				},
			)}
		>
			<nav
				className={cn(
					'mx-auto flex h-14 w-full items-center justify-between px-8 md:h-12 md:px-14 lg:px-20 md:transition-all md:duration-500 md:ease-out',
					{
						'px-2 md:px-3 lg:px-4': scrolled,
					},
				)}
			>
				<div className="flex items-center gap-5">
					<a href="#" className="hover:bg-white/10 rounded-md p-2 flex items-center">
						<WordmarkIcon className="text-white" />
					</a>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">{t('header.product')}</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1 pr-1.5">
									<ul className="grid w-max min-w-[400px] max-w-[500px] grid-cols-2 gap-2 rounded-md border border-white/10 bg-black/50 p-2 shadow-lg backdrop-blur-md">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-white/60 text-sm">
											{t('header.interested')}{' '}
											<a href="#" className="text-white font-medium hover:underline">
												{t('header.scheduleDemo')}
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-white/80 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">{t('header.company')}</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1 pr-1.5 pb-1.5">
									<div className="grid w-max min-w-[400px] max-w-[500px] grid-cols-2 gap-2">
										<ul className="space-y-2 rounded-md border border-white/10 bg-black/50 p-2 shadow-lg backdrop-blur-md">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-3">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="flex p-2 hover:bg-white/10 flex-row rounded-md items-center gap-x-2 text-white/80 hover:text-white"
													>
														<item.icon className="size-4" />
														<span className="font-medium">{item.title}</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink className="px-4" asChild>
								<a href="#" className="hover:bg-white/10 text-white/80 hover:text-white rounded-md p-2 text-sm font-medium">
									{t('header.pricing')}
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<LanguageSwitcher />
					<Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">{t('header.signIn')}</Button>
					<Button className="bg-white text-black hover:bg-white/90">{t('header.getStarted')}</Button>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<LanguageSwitcher />
					<Button
						size="icon"
						variant="outline"
						onClick={() => setOpen(!open)}
						className="md:hidden border-white/20 text-white hover:bg-white/10"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>
			<MobileMenu open={open} className="flex flex-col gap-2 overflow-y-auto pb-24">
				<div className="flex w-full flex-col gap-y-2">
					<span className="text-sm text-white/50 px-2">{t('header.product')}</span>
					{productLinks.map((link) => (
						<MobileListItem key={link.title} {...link} />
					))}
					<span className="text-sm text-white/50 px-2 mt-4">{t('header.company')}</span>
					{companyLinks.map((link) => (
						<MobileListItem key={link.title} {...link} />
					))}
					{companyLinks2.map((link) => (
						<MobileListItem key={link.title} {...link} />
					))}
				</div>
				<div className="flex flex-col gap-2 mt-auto pt-6">
					<Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
						{t('header.signIn')}
					</Button>
					<Button className="w-full bg-white text-black hover:bg-white/90">{t('header.getStarted')}</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-black/95 supports-[backdrop-filter]:bg-black/80 backdrop-blur-xl',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/10 md:hidden text-white',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				data-lenis-prevent="true"
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'h-full overflow-y-auto p-4 overscroll-contain',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 rounded-sm p-2 text-white/80 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white active:bg-white/20', className)} {...props} asChild>
			<a href={href}>
				<div className="bg-white/5 flex aspect-square size-12 items-center justify-center rounded-md border border-white/10 shadow-sm shrink-0">
					<Icon className="text-white size-5" />
				</div>
				<div className="flex flex-col items-start justify-center text-left">
					<span className="font-medium text-sm text-white">{title}</span>
					<span className="text-white/50 text-xs line-clamp-2">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

function MobileListItem({ title, description, icon: Icon, href }: LinkItem) {
	return (
		<a href={href} className="w-full flex flex-row gap-x-2 flex-shrink-0 rounded-sm p-2 text-white/80 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white active:bg-white/20">
			<div className="bg-white/5 flex aspect-square size-12 items-center justify-center rounded-md border border-white/10 shadow-sm shrink-0">
				<Icon className="text-white size-5" />
			</div>
			<div className="flex flex-col items-start justify-center text-left">
				<span className="font-medium text-sm text-white">{title}</span>
				<span className="text-white/50 text-xs line-clamp-2">{description}</span>
			</div>
		</a>
	);
}

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}


const WordmarkIcon = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className={cn("font-mono text-sm font-bold tracking-[0.2em] uppercase", className)}>
    noir.labs
  </span>
);
