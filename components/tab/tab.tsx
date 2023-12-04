import React, { FC } from 'react';
import { TabProps } from '@/components/tab/tab.types';
import { useSnapshot } from 'valtio';
import state from '@/store';

const Tab: FC<TabProps> = ({ onClick, tab, isFilterTab, isActive }) => {
  const snap = useSnapshot(state);
  const activeStyles =
    isFilterTab && isActive
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : {
          backgroundColor: 'transparent',
          opacity: 1,
        };
  return (
    <div
      key={tab.name}
      style={activeStyles}
      className={`tab-btn ${
        isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'
      }`}
      onClick={onClick}>
      <img
        className={`${
          isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12'
        } object-contain`}
        src={tab.icon}
        alt={'tab-icon'}
      />
    </div>
  );
};
export default Tab;
