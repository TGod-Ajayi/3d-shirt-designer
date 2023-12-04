'use client';

import React, { FC } from 'react';
import { IButtonProps } from '@/components/button/button.types';
import { useSnapshot } from 'valtio';
import state from '@/store';
import { getContrastingColor } from '@/utils/helpers';

const CustomButton: FC<IButtonProps> = ({
  type,
  title,
  customStyles,
  onClick,
}) => {
  const snap = useSnapshot(state);
  const generateStyles = (type: 'filled' | 'outlined' | 'text') => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outlined') {
      return {
        borderWidth: '1px',
        color: snap.color,
        borderColor: snap.color,
      };
    }
  };
  return (
    <button
      onClick={onClick}
      style={generateStyles(type)}
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}>
      {title}
    </button>
  );
};
export default CustomButton;
