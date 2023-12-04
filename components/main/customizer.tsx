import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useSnapshot } from 'valtio';
import state from '@/store';
import { fadeAnimation, slideAnimation } from '@/utils/motion';
import { DecalTypes, EditorTabs, FilterTabs } from '@/utils/constants';
import Tab from '@/components/tab/tab';
import CustomButton from '@/components/button';
import ColorPicker from '@/components/color-picker';
import FilePicker from '@/components/file-picker';
import { reader } from '@/utils/helpers';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [fileState, setFileState] = useState<File | null>(null);
  const [promptState, setPromptState] = useState<string>('');
  const [isGeneratingImgState, setIsGeneratingImgState] =
    useState<boolean>(false);

  const [activeEditorTabState, setActiveEditorTabState] = useState<string>('');
  const [activeFilterTabState, setActiveFilterTabState] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTabState) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return (
          <FilePicker
            file={fileState}
            readFile={readFile}
            onFileChange={(file) => setFileState(file)}
          />
        );
      // case 'aipicker':
      //   return (
      //     <AIPicker
      //       handleSubmit={handleSubmitAI}
      //       prompt={promptState}
      //       generating={isGeneratingImgState}
      //       setPrompt={(prompt) => setPromptState(prompt)}
      //     />
      //   );
      default:
        return null;
    }
  };

  const readFile = (type: string) => {
    if (fileState)
      reader(fileState).then((result) => {
        if (result) {
          handleDecals(type, result);
        }
      });
  };

  const handleDecals = (type: any, result: any) => {
    // @ts-ignore
    const decalType = DecalTypes[type];
    // @ts-ignore
    state[decalType.stateProperty] = result;

    // @ts-ignore
    if (!activeFilterTabState[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTabState[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTabState[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    // after setting state we need to update the UI

    setActiveFilterTabState((prevState) => ({
      ...prevState,
      // @ts-ignore
      [tabName]: !prevState[tabName],
    }));
  };

  const handleSubmitAI = async (type: string) => {
    if (!promptState) return alert('Please enter a prompt');
    try {
      // call our backend api
      setIsGeneratingImgState(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptState }),
      });
      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.image}`);
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    } finally {
      setIsGeneratingImgState(false);
      setActiveEditorTabState('');
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key={'custom'}
            className={'absolute top-0 left-0 z-10'}
            {...slideAnimation('left')}>
            <div className={'flex items-center min-h-screen'}>
              <div className={'editortabs-container'}>
                {EditorTabs.map((tab, index) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    onClick={() => setActiveEditorTabState(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className={'absolute z-10 top-5 right-5'}
            {...fadeAnimation}>
            <CustomButton
              type={'filled'}
              customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
              title={'Go Back'}
              onClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div
            className={'filtertabs-container'}
            {...slideAnimation('up')}>
            {FilterTabs.map((tab, index) => (
              <Tab
                isFilterTab
                // @ts-ignore
                isActive={activeFilterTabState[tab.name]}
                key={tab.name}
                tab={tab}
                onClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default Customizer;
