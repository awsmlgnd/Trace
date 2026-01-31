import React, { useState, useEffect } from 'react';
import { Layout } from '@/app/components/layout';
import { Home } from '@/app/components/home';
import { Wallet } from '@/app/components/wallet';
import { Secure } from '@/app/components/secure';
import { PinEntry } from '@/app/components/pin-entry';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'wallet' | 'secure'>('home');
  const [isSecureUnlocked, setIsSecureUnlocked] = useState(false);
  const [showPinEntry, setShowPinEntry] = useState(false);

  const handleTabChange = (tab: 'home' | 'wallet' | 'secure') => {
    if (tab === 'secure' && !isSecureUnlocked) {
      setShowPinEntry(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleUnlock = () => {
    setIsSecureUnlocked(true);
    setShowPinEntry(false);
    setActiveTab('secure');
  };

  const handleLock = () => {
    setIsSecureUnlocked(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#C1BCB1] font-sans text-[#313216] select-none">
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'wallet' && <Wallet />}
        {activeTab === 'secure' && isSecureUnlocked && <Secure onLock={handleLock} />}
      </Layout>

      {showPinEntry && (
        <PinEntry 
          onUnlock={handleUnlock} 
          onCancel={() => setShowPinEntry(false)} 
        />
      )}
    </div>
  );
}
