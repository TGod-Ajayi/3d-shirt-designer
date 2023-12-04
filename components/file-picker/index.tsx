import React, { FC } from 'react';
import { IFilePickerProps } from '@/components/file-picker/file-picker.types';
import CustomButton from '@/components/button';

const FilePicker: FC<IFilePickerProps> = ({ onFileChange, file, readFile }) => {
  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };
  return (
    <div className={'filepicker-container'}>
      <div className={'flex-1 flex flex-col'}>
        <input
          onChange={(e) => onFileChangeHandler(e)}
          id={'file-upload'}
          type={'file'}
          accept={`image/*`}
        />
        <label htmlFor={'file-upload'} className={'filepicker-label'}>
          Upload File
        </label>
        <p className={'mt-2 text-gray-500 text-xs truncate'}>
          {file ? file.name : 'No file chosen'}
          <span className={'ml-2'}>📁</span>
        </p>
      </div>
      <div className={'mt-4 flex flex-wrap gap-3'}>
        <CustomButton
          customStyles={`text-xs`}
          type={'outlined'}
          title={'Logo'}
          onClick={() => readFile('logo')}
        />
        <CustomButton
          customStyles={`text-xs`}
          type={'filled'}
          title={'Full'}
          onClick={() => readFile('full')}
        />
      </div>
    </div>
  );
};
export default FilePicker;
