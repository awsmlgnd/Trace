import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Smartphone, 
  Utensils, 
  Car, 
  ShoppingBag, 
  Zap, 
  MoreHorizontal,
  ArrowDownRight,
  ArrowUpRight,
  ArrowDownLeft,
  Coffee,
  Clock
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell as BarCell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const SPENDING_DATA = [
  { name: 'Food & Drink', value: 4500, color: '#7F5D38', icon: Utensils },
  { name: 'Transport', value: 2500, color: '#9F8C6B', icon: Car },
  { name: 'Shopping', value: 3200, color: '#3A3125', icon: ShoppingBag },
  { name: 'Bills', value: 1800, color: '#313216', icon: Zap },
  { name: 'Other', value: 450, color: '#C1BCB1', icon: MoreHorizontal },
];

const BREAKDOWN_DATA = [
  { month: 'APR', Food: 3200, Transport: 1800, Shopping: 2500, Bills: 1200, Other: 300 },
  { month: 'MAY', Food: 3800, Transport: 2100, Shopping: 2900, Bills: 1500, Other: 400 },
  { month: 'JUN', Food: 3500, Transport: 2000, Shopping: 3100, Bills: 1300, Other: 350 },
  { month: 'JUL', Food: 4200, Transport: 2400, Shopping: 3500, Bills: 1800, Other: 500 },
];

const CATEGORIES = [
  { name: 'Food & Drink', color: '#7F5D38' },
  { name: 'Transport', color: '#9F8C6B' },
  { name: 'Shopping', color: '#3A3125' },
  { name: 'Bills', color: '#313216' },
  { name: 'Other', color: '#C1BCB1' },
];

export function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalSpent = SPENDING_DATA.reduce((acc, curr) => acc + curr.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="px-6 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header Row */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[14px] text-[#7F5D38] leading-none uppercase tracking-wider font-medium">Wednesday, 29 Jan</p>
          <h1 className="text-[22px] font-medium leading-tight text-[#313216] tracking-tight">Good morning</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#D0CBC3] flex items-center justify-center text-[#313216] font-medium border border-[#9F8C6B33]">
          M
        </div>
      </header>

      {/* Wallet Connection Status Card */}
      <section className="bg-[#D0CBC3] p-5 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#C1BCB1] flex items-center justify-center text-[#3C1F0F]">
            <Smartphone size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[17px] font-medium text-[#313216]">Wallet Connected</h2>
            <p className="text-[12px] text-[#9F8C6B]">Last synced 2m ago</p>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#3A4A1E]" />
      </section>

      {/* Quick Actions */}
      <section className="flex gap-4">
        <button className="flex-1 h-[48px] bg-[#3C1F0F] text-white rounded-[12px] text-[14px] font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#3C1F0F44] active:scale-[0.98] transition-all">
          <ArrowUpRight size={18} /> Pay
        </button>
        <button className="flex-1 h-[48px] border-2 border-[#3C1F0F] text-[#3C1F0F] rounded-[12px] text-[14px] font-medium flex items-center justify-center gap-2 active:bg-[#3C1F0F0D] transition-all">
          <ArrowDownLeft size={18} /> Receive
        </button>
      </section>

      {/* Spending Overview Card (Hero) */}
      <section className="bg-[#D0CBC3] p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative overflow-visible">
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-1 group">
            <h2 className="text-[17px] font-medium text-[#313216]">This Month</h2>
            <ChevronDown size={18} className="text-[#9F8C6B] group-hover:text-[#313216] transition-colors" />
          </button>
        </div>

        <div className="relative h-[280px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SPENDING_DATA}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {SPENDING_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="transition-opacity duration-300"
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                    style={{ outline: 'none' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.p 
              key={activeIndex !== null ? SPENDING_DATA[activeIndex].value : totalSpent}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[36px] font-light text-[#313216] tracking-tighter"
            >
              ₹{activeIndex !== null ? SPENDING_DATA[activeIndex].value.toLocaleString() : totalSpent.toLocaleString()}
            </motion.p>
            <p className="text-[12px] text-[#9F8C6B] uppercase tracking-widest mt-[-4px]">
              {activeIndex !== null ? SPENDING_DATA[activeIndex].name : 'total spent'}
            </p>
          </div>

          {/* Floating Category Icons */}
          {SPENDING_DATA.map((entry, index) => {
            const total = SPENDING_DATA.reduce((a, b) => a + b.value, 0);
            let cumulative = 0;
            for(let i=0; i<index; i++) cumulative += SPENDING_DATA[i].value;
            const midValue = cumulative + entry.value / 2;
            // 90 is 12 o'clock. We subtract because we go clockwise (decreasing angle in trig)
            const midAngle = 90 - (midValue / total) * 360; 
            const radius = 128; // outerRadius(110) + offset(18)
            const x = Math.cos(midAngle * Math.PI / 180) * radius;
            const y = -Math.sin(midAngle * Math.PI / 180) * radius; // negative because screen y is down

            return (
              <motion.div
                key={`icon-${index}`}
                className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm"
                style={{ 
                  backgroundColor: entry.color,
                  left: `calc(50% + ${x}px - 16px)`,
                  top: `calc(50% + ${y}px - 16px)`,
                  opacity: activeIndex === null || activeIndex === index ? 0.9 : 0.3
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <entry.icon size={14} strokeWidth={2} />
              </motion.div>
            );
          })}
          
          {/* Curved scale labels */}
          <div className="absolute top-[30px] left-[50%] translate-x-[-110px] -rotate-45 text-[10px] text-[#9F8C6B] font-mono">₹0</div>
          <div className="absolute top-[30px] right-[50%] translate-x-[110px] rotate-45 text-[10px] text-[#9F8C6B] font-mono">₹15k</div>
        </div>
      </section>

      {/* Spending Breakdown Graph */}
      <section className="bg-[#D0CBC3] p-6 rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[17px] font-medium text-[#313216]">Spending Breakdown</h2>
          <div className="bg-[#C1BCB1] px-2 py-1 rounded-[8px] text-[10px] text-[#313216] font-medium flex items-center gap-1 border border-[#9F8C6B33]">
            <Clock size={10} /> NOV 2023
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-[12px] text-[#9F8C6B]">{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="text-right mb-4">
          <p className="text-[30px] font-light text-[#313216] leading-none tracking-tight">₹48,200</p>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BREAKDOWN_DATA} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9F8C6B', fontSize: 10 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#3A3125] text-white p-2 rounded-lg text-[10px] shadow-lg">
                        <p className="font-medium">{payload[0].payload.month}</p>
                        {payload.map((p: any) => (
                          <p key={p.name}>{p.name}: ₹{p.value}</p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {CATEGORIES.map((cat, idx) => (
                <Bar 
                  key={cat.name}
                  dataKey={cat.name.split(' ')[0]} 
                  stackId="a" 
                  fill={cat.color} 
                  barSize={36}
                  stroke="#D0CBC3"
                  strokeWidth={2}
                  radius={idx === CATEGORIES.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Insights Row */}
      <section>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth snap-x">
          <InsightCard 
            icon={<ArrowDownRight className="text-[#313216]" size={18} />}
            headline="Spending down 12%"
            detail="Compared to last month"
          />
          <InsightCard 
            icon={<Coffee className="text-[#7F5D38]" size={18} />}
            headline="Top category: Food"
            detail="₹3,200 this month"
          />
          <InsightCard 
            icon={<Zap className="text-[#313216]" size={18} />}
            headline="Fastest payment"
            detail="Auto-pay, ₹450"
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-medium text-[#313216]">Recent Activity</h2>
          <button className="text-[12px] text-[#7F5D38] font-medium">See All</button>
        </div>
        <div className="space-y-0 divide-y divide-[#9F8C6B33]">
          <TransactionRow 
            merchant="Starbucks Coffee"
            category="Food & Drink"
            date="Today, 09:41"
            amount="-₹450"
            isNegative
          />
          <TransactionRow 
            merchant="Apple Subscription"
            category="Shopping"
            date="Yesterday, 20:15"
            amount="-₹999"
            isNegative
          />
          <TransactionRow 
            merchant="UPI Deposit"
            category="Other"
            date="28 Jan, 14:30"
            amount="+₹5,000"
            isNegative={false}
          />
        </div>
      </section>
    </div>
  );
}

function InsightCard({ icon, headline, detail }: { icon: React.ReactNode, headline: string, detail: string }) {
  return (
    <div className="flex-shrink-0 w-[160px] bg-[#D0CBC3] p-4 rounded-[16px] space-y-3 snap-start shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="w-8 h-8 rounded-lg bg-[#C1BCB1] flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-[14px] font-medium text-[#313216] leading-tight">{headline}</h3>
        <p className="text-[11px] text-[#9F8C6B] leading-snug">{detail}</p>
      </div>
    </div>
  );
}

function TransactionRow({ merchant, category, date, amount, isNegative }: { 
  merchant: string, 
  category: string, 
  date: string, 
  amount: string, 
  isNegative: boolean 
}) {
  const catColor = CATEGORIES.find(c => category.includes(c.name.split(' ')[0]))?.color || '#9F8C6B';
  const Icon = category.includes('Food') ? Utensils : category.includes('Shop') ? ShoppingBag : category.includes('Bill') ? Zap : MoreHorizontal;

  return (
    <div className="flex items-center justify-between py-4 group cursor-pointer active:bg-[#D0CBC333] transition-colors">
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${catColor}26` }} // 15% opacity
        >
          <Icon size={18} style={{ color: catColor }} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#313216]">{merchant}</p>
          <p className="text-[12px] text-[#9F8C6B]">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-[13px] font-mono font-medium ${isNegative ? 'text-[#3C1F0F]' : 'text-[#313216]'}`}>
          {amount}
        </p>
      </div>
    </div>
  );
}
