import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Lock, 
  ChevronRight,
  Utensils,
  ShoppingBag,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecureProps {
  onLock: () => void;
}

const TRANSACTIONS = [
  { id: 1, date: 'Today', items: [
    { merchant: 'Starbucks Coffee', category: 'Food & Drink', amount: -450, time: '09:41', status: 'Success', ref: 'UPI: 928374829' },
    { merchant: 'Amazon India', category: 'Shopping', amount: -2100, time: '08:20', status: 'Success', ref: 'UPI: 102938475' },
  ]},
  { id: 2, date: 'Yesterday', items: [
    { merchant: 'Zomato Limited', category: 'Food & Drink', amount: -1250, time: '21:15', status: 'Success', ref: 'UPI: 556677889' },
    { merchant: 'Transfer from Mom', category: 'Other', amount: 5000, time: '14:30', status: 'Success', ref: 'UPI: 112233445' },
    { merchant: 'Netflix India', category: 'Bills', amount: -499, time: '00:01', status: 'Success', ref: 'UPI: 998877665' },
  ]},
  { id: 3, date: '28 Jan', items: [
    { merchant: 'Shell Petrol', category: 'Transport', amount: -3200, time: '18:45', status: 'Success', ref: 'UPI: 443322110' },
  ]}
];

const BANK_ACCOUNTS = [
  { id: 1, name: 'HDFC Bank', number: '****4521', balance: '₹84,200', logo: 'H' },
  { id: 2, name: 'ICICI Bank', number: '****8892', balance: '₹40,300', logo: 'I' },
];

export function Secure({ onLock }: SecureProps) {
  const [selectedAccount, setSelectedAccount] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="px-6 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#3A31251A] flex items-center justify-center text-[#313216]">
            <Lock size={16} />
          </div>
          <h1 className="text-[22px] font-medium leading-tight text-[#313216] tracking-tight">Secure</h1>
        </div>
        <button 
          onClick={onLock}
          className="w-10 h-10 rounded-full bg-[#D0CBC3] flex items-center justify-center text-[#313216] border border-[#9F8C6B33]"
        >
          <Lock size={20} strokeWidth={1.5} />
        </button>
      </header>

      {/* Account Balance Card (Hero) */}
      <section className="bg-[#3A31250F] p-6 rounded-[24px] shadow-[0_4px_12px_rgba(58,49,37,0.08)] border border-[#3A31251A] space-y-6">
        <div className="space-y-1">
          <p className="text-[12px] text-[#9F8C6B] uppercase tracking-widest font-medium">Total Balance</p>
          <h2 className="text-[36px] font-light text-[#313216] tracking-tighter leading-none">₹1,24,500</h2>
        </div>
        
        <div className="flex gap-6 border-b border-[#3A31251A] pb-6">
          <div className="space-y-0.5">
            <p className="text-[10px] text-[#9F8C6B] uppercase font-medium">Available</p>
            <p className="text-[14px] text-[#313216] font-medium font-mono">₹1,24,500</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] text-[#9F8C6B] uppercase font-medium">Pending</p>
            <p className="text-[14px] text-[#9F8C6B] font-medium font-mono">₹0</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 h-[48px] bg-[#3C1F0F] text-white rounded-[12px] text-[14px] font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#3C1F0F44] active:scale-[0.98] transition-all">
            <ArrowUpRight size={18} /> Send
          </button>
          <button className="flex-1 h-[48px] border-2 border-[#3C1F0F] text-[#3C1F0F] rounded-[12px] text-[14px] font-medium flex items-center justify-center gap-2 active:bg-[#3C1F0F0D] transition-all">
            <ArrowDownLeft size={18} /> Request
          </button>
        </div>
      </section>

      {/* Linked Accounts Summary */}
      <section>
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {BANK_ACCOUNTS.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccount(acc.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-full border transition-all ${
                selectedAccount === acc.id 
                  ? 'bg-[#3C1F0F] border-[#3C1F0F] text-white shadow-md' 
                  : 'bg-[#D0CBC3] border-[#9F8C6B33] text-[#313216]'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                selectedAccount === acc.id ? 'bg-white text-[#3C1F0F]' : 'bg-[#C1BCB1] text-[#7F5D38]'
              }`}>
                {acc.logo}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-medium leading-none">{acc.number}</p>
                <p className={`text-[12px] font-mono ${selectedAccount === acc.id ? 'text-white/80' : 'text-[#9F8C6B]'}`}>{acc.balance}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Transaction History */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-medium text-[#313216]">Transactions</h2>
          <button className="p-2 text-[#9F8C6B] hover:text-[#313216]">
            <Filter size={18} />
          </button>
        </div>

        <div className="space-y-6">
          {TRANSACTIONS.map((group) => (
            <div key={group.date} className="space-y-1">
              <div className="bg-[#9F8C6B1A] px-3 py-1 -mx-6 mb-2">
                <span className="text-[11px] font-medium text-[#7F5D38] uppercase tracking-widest">{group.date}</span>
              </div>
              <div className="space-y-0 divide-y divide-[#9F8C6B22]">
                {group.items.map((item, idx) => (
                  <TransactionListItem 
                    key={`${group.date}-${idx}`}
                    item={item} 
                    isExpanded={expandedId === `${group.date}-${idx}`}
                    onToggle={() => toggleExpand(`${group.date}-${idx}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-4">
          <p className="text-[12px] text-[#9F8C6B]">End of transactions</p>
        </div>
      </section>
    </div>
  );
}

function TransactionListItem({ item, isExpanded, onToggle }: { item: any, isExpanded: boolean, onToggle: () => void }) {
  const isNegative = item.amount < 0;
  const catColor = item.category.includes('Food') ? '#7F5D38' : item.category.includes('Shop') ? '#3A3125' : item.category.includes('Bill') ? '#313216' : '#9F8C6B';
  const Icon = item.category.includes('Food') ? Utensils : item.category.includes('Shop') ? ShoppingBag : item.category.includes('Bill') ? Zap : MoreHorizontal;

  return (
    <div className="py-1">
      <div 
        onClick={onToggle}
        className="flex items-center justify-between py-4 group cursor-pointer active:bg-[#D0CBC333] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${catColor}26` }}
          >
            <Icon size={18} style={{ color: catColor }} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#313216]">{item.merchant}</p>
            <p className="text-[12px] text-[#9F8C6B]">{item.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`text-[13px] font-mono font-medium ${isNegative ? 'text-[#3C1F0F]' : 'text-[#313216]'}`}>
              {isNegative ? '-' : '+'}{Math.abs(item.amount).toLocaleString()}
            </p>
          </div>
          <ChevronRight size={16} className={`text-[#9F8C6B] transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-14 pr-4 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#9F8C6B]">Reference ID</span>
                <span className="font-mono text-[#313216]">{item.ref}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#9F8C6B]">Status</span>
                <span className="text-[#3A4A1E] font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#3A4A1E]" /> {item.status}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#9F8C6B]">Category</span>
                <span className="text-[#313216]">{item.category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
