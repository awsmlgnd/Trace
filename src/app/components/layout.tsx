import React from 'react';
import { Home as HomeIcon, CreditCard, Lock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'wallet' | 'secure';
  onTabChange: (tab: 'home' | 'wallet' | 'secure') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 pb-[83px] overflow-y-auto">
        {children}
      </main>

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#C1BCB1] border-t border-[#9F8C6B33] h-[83px] px-6 pb-safe flex items-center justify-between z-40">
        <TabButton 
          icon={<HomeIcon size={24} strokeWidth={activeTab === 'home' ? 2 : 1.5} fill={activeTab === 'home' ? 'currentColor' : 'none'} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <TabButton 
          icon={<CreditCard size={24} strokeWidth={activeTab === 'wallet' ? 2 : 1.5} fill={activeTab === 'wallet' ? 'currentColor' : 'none'} />} 
          label="Wallet" 
          active={activeTab === 'wallet'} 
          onClick={() => onTabChange('wallet')} 
        />
        <TabButton 
          icon={<Lock size={24} strokeWidth={activeTab === 'secure' ? 2 : 1.5} fill={activeTab === 'secure' ? 'currentColor' : 'none'} />} 
          label="Secure" 
          active={activeTab === 'secure'} 
          onClick={() => onTabChange('secure')} 
        />
      </nav>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 transition-colors duration-200",
        active ? "text-[#3C1F0F]" : "text-[#9F8C6B]"
      )}
    >
      {icon}
      <span className="text-[12px] font-normal leading-none">{label}</span>
    </button>
  );
}
