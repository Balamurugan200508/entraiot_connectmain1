import React from 'react';

export default function Sidebar({ activeTab, onTabClick }) {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'metrics', label: 'METRICS' },
    { id: 'activities', label: 'WORKFLOW' },
    { id: 'collaboration', label: 'COLLAB' },
    { id: 'reports', label: 'REPORTS' },
    { id: 'projects', label: 'PROJECTS' }
  ];

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-5">
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabClick(item.id)}
            className="group flex items-center gap-3.5 focus:outline-none cursor-pointer"
          >
            {/* Label - visible if active or when group is hovered */}
            <span className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 ${
              isActive ? 'opacity-100 translate-x-0 text-brand-purple font-bold' : 'text-gray-500'
            }`}>
              {item.label}
            </span>
            
            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-5 h-5">
              {isActive ? (
                <>
                  {/* Outer Pulsing/Ring Indicator */}
                  <span className="absolute w-4.5 h-4.5 rounded-full border border-brand-purple/70 animate-pulse"></span>
                  {/* Inner Solid Active Circle */}
                  <span className="w-2 h-2 rounded-full bg-brand-purple ring-4 ring-brand-purple/20 scale-110"></span>
                </>
              ) : (
                /* Inactive Circle */
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 transition-all duration-300 group-hover:bg-gray-400 group-hover:scale-125"></span>
              )}
            </div>
          </button>
        );
      })}
    </aside>
  );
}
