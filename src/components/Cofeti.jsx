import React from 'react';

const Cofeti = () => {
  return (
    <div className="absolute transition-all z-0 w-full h-screen">
      <div className="relative z-0 w-[60px] h-[60px] bg-[#e05beb] rounded-full left-[10%] top-[15%]" />
      <div className="relative z-0 w-[60px] h-[60px] bg-[#935CEC] rounded-full left-[30%] top-[30%]" />
      <div className="relative z-0 w-[60px] h-[60px] bg-[#FB0606] rounded-full left-[20%] top-[55%]" />
      <div className="absolute z-0 w-[60px] h-[60px] bg-[#5CEC6A] rounded-full right-[21%] bottom-[55%]" />
      <div className="absolute z-0 w-[60px] h-[60px] bg-[#5F5CEC] rounded-full right-[10%] bottom-[20%]" />
    </div>
  );
}

export default Cofeti;
