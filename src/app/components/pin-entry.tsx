import React, { useState, useEffect } from 'react';
import { Lock, Delete, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PinEntryProps {
  onUnlock: () => void;
  onCancel: () => void;
}

export function PinEntry({ onUnlock, onCancel }: PinEntryProps) {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        // Mock verification
        if (newPin === '1234') {
          setTimeout(onUnlock, 200);
        } else {
          setIsError(true);
          setTimeout(() => {
            setPin('');
            setIsError(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#3A3125EB] flex flex-col items-center justify-between py-16 px-8 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="w-16 h-16 rounded-full bg-[#FFFFFF1A] flex items-center justify-center text-white">
          <Lock size={32} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-[17px] font-medium text-white">Enter your PIN</h2>
          <p className="text-[12px] text-[#C1BCB1] opacity-60 italic">Hint: 1234</p>
        </div>

        <motion.div 
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          className="flex gap-4 mt-8"
        >
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-200 ${
                pin.length > i ? 'bg-white' : 'bg-transparent opacity-40'
              } ${isError ? 'border-bark bg-bark' : ''}`}
            />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <KeyPadButton key={num} label={num.toString()} onClick={() => handleKeyPress(num.toString())} />
        ))}
        <div />
        <KeyPadButton label="0" onClick={() => handleKeyPress('0')} />
        <button 
          onClick={handleDelete}
          className="w-[64px] h-[64px] flex items-center justify-center text-white active:bg-[#FFFFFF1A] rounded-[12px] transition-colors"
        >
          <Delete size={24} />
        </button>
      </div>

      <button 
        onClick={onCancel}
        className="text-[14px] text-[#C1BCB199] hover:text-white transition-colors"
      >
        Cancel
      </button>
    </motion.div>
  );
}

function KeyPadButton({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-[64px] h-[64px] rounded-[12px] bg-[#FFFFFF1A] flex items-center justify-center text-white text-[28px] font-semibold active:bg-[#FFFFFF33] transition-all"
    >
      {label}
    </button>
  );
}
