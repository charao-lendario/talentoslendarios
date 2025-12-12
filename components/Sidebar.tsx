import React, { useState } from 'react';
import { Section } from '../types';
import { Icon } from './ui/icon';
import { Symbol } from './ui/symbol';
import { cn } from '../lib/utils';
import { THEMES, ThemeName } from '../App'; // Import types and constants from App

interface SidebarProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  isDark: boolean;
  toggleTheme: () => void; // Dark Mode Toggle
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentThemeName: ThemeName;
  setThemeName: (t: ThemeName) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
}

interface NavItem {
  label: string;
  icon: string;
  section?: Section;
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
    currentSection, 
    setSection, 
    isDark, 
    toggleTheme, 
    isCollapsed, 
    toggleCollapse,
    currentThemeName,
    setThemeName,
    isMobileOpen,
    closeMobileMenu
}) => {
  // State to track expanded submenus (by label)
  // Default expanded menus
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Interface', 'Identidade Verbal', 'Documentação', 'Aplicações']);

  // Hierarchical Navigation Structure
  const navStructure: NavItem[] = [
    { label: 'Visão Geral', icon: 'home', section: Section.CONCEPT },
    { 
        label: 'Aplicações', 
        icon: 'rocket', 
        children: [
            { label: 'Talentos: Candidato', icon: 'user', section: Section.TALENTS_CANDIDATE },
            { label: 'Talentos: Admin', icon: 'shield-check', section: Section.TALENTS_ADMIN },
        ]
    },
    { 
        label: 'Identidade Verbal', 
        icon: 'fingerprint', 
        children: [
            { label: 'Identidade', icon: 'fingerprint', section: Section.IDENTITY },
            { label: 'Lendário vs Medíocre', icon: 'sword', section: Section.LEGENDARY_VS_MEDIOCRE },
        ]
    },
    { 
        label: 'Interface', 
        icon: 'cube', 
        children: [
            { label: 'Cores', icon: 'palette', section: Section.COLORS },
            { label: 'Tipografia', icon: 'text', section: Section.TYPOGRAPHY },
            { label: 'Espaçamentos', icon: 'apps', section: Section.SPACING },
            { label: 'Ícones', icon: 'star', section: Section.ICONS },
            { label: 'Componentes', icon: 'cube', section: Section.COMPONENTS },
            { label: 'Cards & Boxes', icon: 'layout-fluid', section: Section.CARDS },
            { label: 'Formulários', icon: 'form', section: Section.FORMS },
            { label: 'Tabelas', icon: 'table', section: Section.TABLES },
        ]
    },
    { 
        label: 'Documentação', 
        icon: 'book-alt', 
        children: [
            { label: 'Técnica', icon: 'file-code', section: Section.DOCS },
            { label: 'Manual IA', icon: 'sparkles', section: Section.AI_MANUAL },
        ]
    },
  ];

  const toggleSubmenu = (label: string) => {
    if (isCollapsed) {
        toggleCollapse(); // Auto-expand sidebar if trying to open submenu
        setExpandedMenus([...expandedMenus, label]);
    } else {
        setExpandedMenus(prev => 
            prev.includes(label) 
                ? prev.filter(l => l !== label) 
                : [...prev, label]
        );
    }
  };

  const isSubmenuActive = (item: NavItem): boolean => {
    if (item.section === currentSection) return true;
    if (item.children) {
        return item.children.some(child => child.section === currentSection);
    }
    return false;
  };

  const handleSectionClick = (section: Section) => {
      setSection(section);
      closeMobileMenu(); // Close sidebar on mobile when item is clicked
  };

  return (
    <>
    {/* Overlay for Mobile */}
    {isMobileOpen && (
        <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={closeMobileMenu}
        />
    )}

    <aside 
        className={cn(
            "fixed left-0 top-0 h-full border-r border-border bg-card z-50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl md:shadow-none",
            // Desktop Widths (controlled by collapse)
            isCollapsed ? "md:w-20" : "md:w-64",
            // Mobile Width & Visibility (controlled by transform)
            "w-64", // Mobile is always 64 width (256px)
            isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
    >
      <div>
        {/* Header */}
        <div className={cn("p-6 flex items-center transition-all duration-300", isCollapsed ? "justify-center" : "justify-between")}>
          <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", isCollapsed ? "justify-center w-full" : "")}>
             <Symbol name="infinity" className="text-3xl text-primary shrink-0 transition-colors duration-300" />
             <div className={cn("transition-opacity duration-200", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                <span className="font-sans font-bold text-xl tracking-tight block">Lendár[IA]</span>
                <p className="font-serif text-[10px] text-muted-foreground italic">The Legends & Co.™</p>
             </div>
          </div>
          {/* Close button for Mobile */}
          <button onClick={closeMobileMenu} className="md:hidden text-muted-foreground hover:text-foreground">
             <Icon name="cross" size="size-4" />
          </button>

          {/* Collapse button for Desktop */}
          {!isCollapsed && (
             <button onClick={toggleCollapse} className="hidden md:block text-muted-foreground hover:text-foreground">
                <Icon name="angle-small-left" size="size-5" />
             </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-3 mt-4 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
          <ul className="space-y-1">
            {navStructure.map((item) => {
                const isActive = isSubmenuActive(item);
                const isExpanded = expandedMenus.includes(item.label);
                
                if (item.children) {
                    // Parent Item with Submenu
                    return (
                        <li key={item.label}>
                            <button
                                onClick={() => toggleSubmenu(item.label)}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group relative",
                                    isActive && !isExpanded ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon 
                                        name={item.icon} 
                                        size="size-5" 
                                        className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} 
                                    />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </div>
                                {!isCollapsed && (
                                    <Icon 
                                        name="angle-small-down" 
                                        className={cn("transition-transform duration-200", isExpanded ? "rotate-180" : "")} 
                                    />
                                )}
                            </button>
                            
                            {/* Submenu Items */}
                            <div className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isExpanded && !isCollapsed ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                            )}>
                                <ul className="space-y-1 pl-4">
                                    {item.children.map(child => (
                                        <li key={child.label}>
                                            <button
                                                onClick={() => child.section && handleSectionClick(child.section)}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 border-l-2",
                                                    currentSection === child.section
                                                        ? "border-primary text-primary bg-primary/5 font-semibold"
                                                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                                                )}
                                            >
                                                <Icon 
                                                    name={child.icon} 
                                                    size="size-4" 
                                                    className={cn(
                                                        currentSection === child.section 
                                                            ? "text-primary" 
                                                            : "text-muted-foreground group-hover:text-foreground"
                                                    )}
                                                />
                                                {!isCollapsed && <span>{child.label}</span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    );
                }

                // Direct Link Item
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => item.section && handleSectionClick(item.section)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-3 group",
                        currentSection === item.section
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon 
                        name={item.icon} 
                        size="size-5" 
                        className={currentSection === item.section ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}
                      />
                      {!isCollapsed && item.label}
                    </button>
                  </li>
                );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer Controls (Theme & Mode) */}
      <div className="p-4 border-t border-border bg-card">
        
        {/* Color Theme Selector */}
        <div className={cn("mb-4", isCollapsed ? "hidden" : "block")}>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Tema</p>
            <div className="flex flex-wrap gap-2">
                {Object.keys(THEMES).map((themeKey) => {
                    const t = THEMES[themeKey as ThemeName];
                    const isActive = currentThemeName === themeKey;
                    return (
                        <button
                            key={themeKey}
                            onClick={() => setThemeName(themeKey as ThemeName)}
                            title={t.label}
                            className={cn(
                                "w-6 h-6 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                                isActive ? "border-foreground scale-110" : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                            )}
                            style={{ backgroundColor: t.hex }}
                        >
                            <span className="sr-only">{t.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

        {isCollapsed ? (
            <div className="flex flex-col items-center gap-4">
                 <button onClick={toggleCollapse} className="hidden md:block p-2 rounded-md hover:bg-muted text-muted-foreground">
                    <Icon name="angle-double-right" size="size-4" />
                </button>
                 {/* Mini Theme Indicator when collapsed */}
                 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: THEMES[currentThemeName].hex }}></div>
                 
                 <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                    <Icon name={isDark ? "sun" : "moon"} size="size-4" />
                </button>
            </div>
        ) : (
            <>
                <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted mb-2"
                >
                <Icon name={isDark ? "sun" : "moon"} size="size-4" />
                {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
            </>
        )}
      </div>
    </aside>
    </>
  );
};

export default Sidebar;