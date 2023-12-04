import React, { FC } from 'react';
import CustomButton from '@/components/button';
import { IAIPickerProps } from '@/components/ai-picker/ai-picker.types';

const AIPicker: FC<IAIPickerProps> = ({
  generating,
  handleSubmit,
  setPrompt,
}) => {
  return (
    <div className={'aipicker-container'}>
      <textarea
        placeholder={'Ask AI...'}
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        className={'aipicker-textarea'}
      />
      <div className={'flex flex-wrap gap-3'}>
        {generating ? (
          <CustomButton
            type={'outlined'}
            title={'Asking AI...'}
            customStyles={'text-xs'}
            onClick={() => {}}
          />
        ) : (
          <>
            <CustomButton
              type={'outlined'}
              title={'AI Logo'}
              customStyles={'text-xs'}
              onClick={() => handleSubmit('logo')}
            />
            <CustomButton
              type={'outlined'}
              title={'AI Full'}
              customStyles={'text-xs'}
              onClick={() => handleSubmit('full')}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default AIPicker;
