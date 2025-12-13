import * as React from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X } from 'lucide-react';
import { siteConfig, isMegaMenu, type NavItem, type MegaMenuItem, type HeaderLayout, type CTAShape } from '../config/site';

// Navigation props - allows parent to override nav config
interface NavigationProps {
    navItems?: NavItem[];
    navCta?: { label: string; href: string };
    headerLayout?: HeaderLayout;
    ctaShape?: CTAShape;
}

// Custom menu icon with shorter third bar
const MenuIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="14" y2="18" />
    </svg>
);

import Lenis from '@studio-freight/lenis';
import '../styles/global.css';
import '../styles/mobile-menu.css';

const Navigation = ({
    navItems: propNavItems,
    navCta: propNavCta,
    headerLayout: propHeaderLayout,
    ctaShape: propCtaShape
}: NavigationProps) => {
    // Use props if provided, otherwise fall back to siteConfig
    const navItems = propNavItems || siteConfig.nav.items;
    const navCta = propNavCta || siteConfig.nav.cta;
    const headerLayout = (propHeaderLayout || siteConfig.header?.layout || 'standard') as HeaderLayout;
    const ctaShape = (propCtaShape || siteConfig.header?.ctaShape || 'rounded') as CTAShape;

    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Lenis & Scrollbar Refs
    const lenisRef = React.useRef<Lenis | null>(null);
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const scrollbarRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const rafIdRef = React.useRef<number | null>(null);

    React.useEffect(() => {
        setMounted(true);
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            lenisRef.current?.destroy();
        };
    }, []);

    // Initialize Lenis for Mobile Menu
    React.useEffect(() => {
        if (!isMobileMenuOpen || !overlayRef.current) {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            return;
        }

        // Initialize Lenis scoped to the overlay
        const lenis = new Lenis({
            wrapper: overlayRef.current,
            content: overlayRef.current.firstElementChild as HTMLElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        // RAF Loop
        const raf = (time: number) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        };
        rafIdRef.current = requestAnimationFrame(raf);

        // Scrollbar Logic
        const updateScrollbar = () => {
            const scrollbar = scrollbarRef.current;
            const track = trackRef.current;
            const thumb = thumbRef.current;
            const overlay = overlayRef.current;

            if (!scrollbar || !track || !thumb || !overlay) return;

            const scrollHeight = overlay.scrollHeight;
            const clientHeight = overlay.clientHeight;

            if (scrollHeight <= clientHeight) {
                scrollbar.style.opacity = '0';
                scrollbar.style.pointerEvents = 'none';
                return;
            }
            scrollbar.style.opacity = '1';
            scrollbar.style.pointerEvents = 'auto';

            const trackHeight = track.clientHeight;
            const scrollRatio = clientHeight / scrollHeight;
            const thumbHeight = Math.max(40, trackHeight * scrollRatio);
            thumb.style.height = `${thumbHeight}px`;

            const maxScroll = scrollHeight - clientHeight;
            const maxThumbTop = trackHeight - thumbHeight;

            const progress = lenis.scroll / maxScroll;
            const thumbTop = progress * maxThumbTop;

            thumb.style.transform = `translateY(${thumbTop}px)`;
        };

        lenis.on('scroll', updateScrollbar);
        updateScrollbar();

        // Thumb Drag Handling
        let isDragging = false;
        let startY = 0;
        let startScroll = 0;

        const handleThumbMouseDown = (e: MouseEvent) => {
            if (!overlayRef.current) return;
            isDragging = true;
            startY = e.clientY;
            startScroll = lenis.scroll;
            thumbRef.current?.classList.add('dragging');
            if (document.body) {
                document.body.style.userSelect = 'none';
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !overlayRef.current || !trackRef.current || !thumbRef.current) return;
            e.preventDefault();

            const deltaY = e.clientY - startY;
            const scrollHeight = overlayRef.current.scrollHeight;
            const clientHeight = overlayRef.current.clientHeight;
            const trackHeight = trackRef.current.clientHeight;
            const thumbHeight = parseFloat(thumbRef.current.style.height);
            const maxThumbTop = trackHeight - thumbHeight;
            const maxScroll = scrollHeight - clientHeight;

            const scrollRatio = maxScroll / maxThumbTop;
            const targetScroll = Math.max(
                0,
                Math.min(startScroll + deltaY * scrollRatio, maxScroll)
            );

            lenis.scrollTo(targetScroll, { immediate: false });
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                thumbRef.current?.classList.remove('dragging');
                if (document.body) {
                    document.body.style.userSelect = '';
                }
            }
        };

        if (thumbRef.current) {
            thumbRef.current.addEventListener('mousedown', handleThumbMouseDown);
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Watch for content height changes
        const resizeObserver = new ResizeObserver(() => {
            updateScrollbar();
        });

        if (overlayRef.current) {
            resizeObserver.observe(overlayRef.current);
            const contentElement = overlayRef.current.firstElementChild as HTMLElement;
            if (contentElement) {
                resizeObserver.observe(contentElement);
            }
        }

        return () => {
            lenis.destroy();
            resizeObserver.disconnect();
            if (thumbRef.current) {
                thumbRef.current.removeEventListener('mousedown', handleThumbMouseDown);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [isMobileMenuOpen]);

    const handleMouseEnter = (menuId: string) => {
        // Ignore hover events on touch devices
        if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenu(menuId);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 100);
    };

    const toggleMenu = (menuId: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const event = new CustomEvent('mobile-menu-toggle', {
            detail: { isOpen: newState }
        });
        window.dispatchEvent(event);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        const event = new CustomEvent('mobile-menu-toggle', {
            detail: { isOpen: false }
        });
        window.dispatchEvent(event);
    };

    // Get mega menu items for rendering dropdown content
    const megaMenuItems = navItems.filter(isMegaMenu) as MegaMenuItem[];

    return (
        <>
            {/* Overlay behind mega menu */}
            <div
                className="MenuOverlay"
                onMouseEnter={handleMouseLeave}
                style={{ display: activeMenu ? 'block' : 'none' }}
            />

            <nav className="NavigationMenuRoot" data-layout={headerLayout}>
                {/* Desktop Menu List - hidden if minimal layout */}
                {headerLayout !== 'minimal' && (
                <ul className="NavigationMenuList" data-layout={headerLayout}>
                    {navItems.map((item: NavItem) => (
                        isMegaMenu(item) ? (
                            <li
                                key={item.menuId}
                                className="NavigationMenuItem"
                                onMouseEnter={() => handleMouseEnter(item.menuId)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className={`NavigationMenuTrigger ${activeMenu === item.menuId ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => toggleMenu(item.menuId)}
                                >
                                    {item.label}
                                    <ChevronDown
                                        className="NavigationMenuChevron"
                                        style={{ transform: activeMenu === item.menuId ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    />
                                </button>
                            </li>
                        ) : (
                            <li key={item.href}>
                                <a className="NavigationMenuLink" href={item.href}>{item.label}</a>
                            </li>
                        )
                    ))}
                    {/* CTA inside nav list for standard layout only */}
                    {headerLayout === 'standard' && navCta && (
                        <li>
                            <a className={`NavigationMenuLink NavigationCTAButton ${ctaShape === 'pill' ? 'cta-pill' : 'cta-rounded'}`} href={navCta.href}>
                                {navCta.label}
                            </a>
                        </li>
                    )}
                </ul>
                )}

                {/* CTA button for centered layout is now rendered in Header.astro */}

                {/* CTA button for minimal layout (no nav) */}
                {headerLayout === 'minimal' && navCta && (
                    <a className={`NavigationMenuLink NavigationCTAButton ${ctaShape === 'pill' ? 'cta-pill' : 'cta-rounded'}`} href={navCta.href}>
                        {navCta.label}
                    </a>
                )}

                {/* Mobile Burger Button */}
                <button
                    className="BurgerButton"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    style={{ zIndex: 10001 }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
            </nav>

            {/* Desktop Mega Menu Content */}
            {activeMenu && (
                <div
                    className="NavigationMenuContent"
                    onMouseEnter={() => handleMouseEnter(activeMenu)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="MegaMenuContainer">
                        {megaMenuItems.map((menuItem) => (
                            activeMenu === menuItem.menuId && (
                                <div key={menuItem.menuId} className="MegaMenu">
                                    {menuItem.sections.map((section, sectionIndex) => (
                                        <div key={sectionIndex} className="MegaMenuSection">
                                            <h3 className={`MegaMenuSectionTitle MegaMenuSectionTitle--${section.titleStyle || 'neutral'}`}>
                                                {section.title}
                                            </h3>
                                            {section.links.map((link, linkIndex) => (
                                                <a
                                                    key={linkIndex}
                                                    href={link.href}
                                                    className="MegaMenuLink"
                                                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                >
                                                    <span className="MegaMenuLinkTitle">{link.title}</span>
                                                    {link.description && (
                                                        <span className="MegaMenuLinkDesc">{link.description}</span>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {mounted && isMobileMenuOpen && createPortal(
                <div className="MobileMenuOverlay" ref={overlayRef}>
                    <ul className="MobileMenuList">
                        <li>
                            <a className="MobileMenuLink" href="/" onClick={closeMobileMenu}>Home</a>
                        </li>
                        {navItems.map((item: NavItem) => (
                            isMegaMenu(item) ? (
                                <li key={item.menuId}>
                                    <details name="mobile-menu-accordion-group" className="MobileMenuDetails">
                                        <summary className="MobileMenuSummary">
                                            <span className="MobileMenuText">
                                                {item.label}
                                                <ChevronDown size={20} />
                                            </span>
                                        </summary>
                                        <div className="MobileSubMenu">
                                            {item.sections.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="MobileSubMenuSection">
                                                    <h4 className={`MobileSubMenuTitle MobileSubMenuTitle--${section.titleStyle || 'neutral'}`}>
                                                        {section.title}
                                                    </h4>
                                                    {section.links.map((link, linkIndex) => (
                                                        <a
                                                            key={linkIndex}
                                                            href={link.href}
                                                            onClick={closeMobileMenu}
                                                            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                        >
                                                            {link.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </li>
                            ) : (
                                <li key={item.href}>
                                    <a className="MobileMenuLink" href={item.href} onClick={closeMobileMenu}>
                                        {item.label}
                                    </a>
                                </li>
                            )
                        ))}
                        {navCta && (
                            <li>
                                <a
                                    className="MobileMenuLink NavigationCTAButton"
                                    href={navCta.href}
                                    onClick={closeMobileMenu}
                                >
                                    {navCta.label}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>,
                document.body
            )}

            {/* Custom Scrollbar for Mobile Menu */}
            {mounted && isMobileMenuOpen && createPortal(
                <div className="custom-scrollbar" ref={scrollbarRef} style={{ position: 'fixed', zIndex: 10002 }}>
                    <div className="scroll-arrow scroll-arrow-up" aria-hidden="true"></div>
                    <div className="scroll-track" ref={trackRef}>
                        <div className="custom-thumb" ref={thumbRef}></div>
                    </div>
                    <div className="scroll-arrow scroll-arrow-down" aria-hidden="true"></div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Navigation;
