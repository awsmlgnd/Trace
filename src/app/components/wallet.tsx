import React, { useState } from 'react';
import { 
  Smartphone, 
  Battery, 
  ChevronRight, 
  Plus, 
  Moon, 
  Volume2, 
  Zap, 
  Trash2,
  Settings as SettingsIcon,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';

export function Wallet() {
  const [brightness, setBrightness] = useState(65);
  const [autoSleep, setAutoSleep] = useState("30 seconds");
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isHapticOn, setIsHapticOn] = useState(true);

  return (
    <div className="px-6 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h1 className="text-[22px] font-medium leading-tight text-[#313216] tracking-tight">Wallet</h1>
      </header>

      {/* Device Card (Hero) */}
      <section className="bg-[#D0CBC3] p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-6">
        <div className="flex justify-center py-4">
          <div className="relative w-[180px] h-[100px] bg-[#3C1F0F] rounded-[12px] shadow-2xl flex items-center justify-center overflow-hidden border border-[#313216]">
            {/* Minimal Wallet Illustration */}
            <div className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-[#3A4A1E]" />
            <div className="w-[80px] h-[30px] border border-[#C1BCB144] rounded-[4px] opacity-20" />
            <div className="absolute bottom-2 left-3 text-[8px] font-mono text-[#C1BCB1] opacity-40">MONO v2.1.4</div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <h2 className="text-[17px] font-medium text-[#313216]">My Wallet</h2>
            <ChevronRight size={16} className="text-[#9F8C6B] group-hover:text-[#313216]" />
          </div>
          <div className="flex items-center justify-center gap-3 text-[12px] text-[#7F5D38]">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#3A4A1E]" /> Connected</span>
            <span className="flex items-center gap-1.5"><Battery size={14} className="rotate-90" /> 87%</span>
          </div>
          <p className="text-[10px] text-[#9F8C6B] mt-2 uppercase tracking-widest">Firmware v2.1.4</p>
        </div>
      </section>

      {/* Connected Accounts Section */}
      <section className="space-y-4">
        <h2 className="text-[17px] font-medium text-[#313216]">Connected Accounts</h2>
        <div className="bg-[#D0CBC3] rounded-[16px] overflow-hidden divide-y divide-[#9F8C6B33] border border-[#9F8C6B22]">
          <AccountRow name="HDFC Bank" number="****4521" />
          <AccountRow name="ICICI Bank" number="****8892" />
          <button className="w-full flex items-center gap-4 p-4 active:bg-[#C1BCB155] transition-colors group">
            <div className="w-[28px] h-[28px] rounded-full bg-[#C1BCB1] flex items-center justify-center text-[#3C1F0F]">
              <Plus size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[14px] font-medium text-[#3C1F0F]">Add Account</span>
          </button>
        </div>
      </section>

      {/* UPI Settings */}
      <section className="space-y-4">
        <h2 className="text-[17px] font-medium text-[#313216]">UPI Settings</h2>
        <div className="bg-[#D0CBC3] rounded-[16px] overflow-hidden divide-y divide-[#9F8C6B33] border border-[#9F8C6B22]">
          <SettingRow label="Default UPI ID" value="mono.payment@okaxis" />
          <SettingRow label="Auto-approve limit" value="₹500" />
          <div className="flex items-center justify-between p-4">
            <span className="text-[14px] text-[#313216]">Daily spend limit</span>
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-[#7F5D38] font-medium">₹10,000</span>
              <Toggle active={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Device Settings */}
      <section className="space-y-4">
        <h2 className="text-[17px] font-medium text-[#313216]">Device Settings</h2>
        <div className="bg-[#D0CBC3] rounded-[16px] overflow-hidden divide-y divide-[#9F8C6B33] border border-[#9F8C6B22]">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#313216]">Display brightness</span>
              <span className="text-[12px] text-[#9F8C6B] font-mono">{brightness}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full h-1 bg-[#C1BCB1] rounded-lg appearance-none cursor-pointer accent-[#3C1F0F]" 
            />
          </div>
          <SettingRow label="Auto-sleep timeout" value={autoSleep} isSelect />
          <div className="flex items-center justify-between p-4">
            <span className="text-[14px] text-[#313216]">Sound</span>
            <Toggle active={isSoundOn} onClick={() => setIsSoundOn(!isSoundOn)} />
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-[14px] text-[#313216]">Haptic feedback</span>
            <Toggle active={isHapticOn} onClick={() => setIsHapticOn(!isHapticOn)} />
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4 pb-4">
        <h2 className="text-[17px] font-medium text-[#3C1F0F]">Danger Zone</h2>
        <div className="bg-[#3C1F0F0D] rounded-[16px] overflow-hidden divide-y divide-[#3C1F0F1A] border border-[#3C1F0F1A]">
          <button className="w-full flex items-center justify-between p-4 active:bg-[#3C1F0F1A] transition-colors text-[#3C1F0F] text-[14px] font-medium text-left">
            <span>Unpair Device</span>
            <Trash2 size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-4 active:bg-[#3C1F0F1A] transition-colors text-[#3C1F0F] text-[14px] font-medium text-left">
            <span>Reset Wallet</span>
            <Zap size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

function AccountRow({ name, number }: { name: string, number: string }) {
  return (
    <div className="flex items-center justify-between p-4 group cursor-pointer active:bg-[#C1BCB155] transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-[28px] h-[28px] rounded-full bg-[#C1BCB1] flex items-center justify-center text-[#7F5D38]">
          <CreditCard size={16} />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#313216]">{name}</p>
          <p className="text-[12px] text-[#9F8C6B]">{number}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-[#9F8C6B] opacity-40 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function SettingRow({ label, value, isSelect }: { label: string, value: string, isSelect?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 group cursor-pointer active:bg-[#C1BCB155] transition-colors">
      <span className="text-[14px] text-[#313216]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[14px] text-[#7F5D38] font-medium">{value}</span>
        {isSelect ? <ChevronDown size={16} className="text-[#9F8C6B]" /> : <ChevronRight size={16} className="text-[#9F8C6B]" />}
      </div>
    </div>
  );
}

function Toggle({ active, onClick }: { active: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${active ? 'bg-[#3C1F0F]' : 'bg-[#9F8C6B44]'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${active ? 'left-5.5' : 'left-0.5'}`} />
    </button>
  );
}

function ChevronDown({ size, className }: { size: number, className?: string }) {
  return <ChevronRight size={size} className={`rotate-90 ${className}`} />;
}
