'use client'

import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useSnapshot} from "valtio";
import {headContentAnimation, headTextAnimation, slideAnimation} from "@/utils/motion";
import state from "@/store";
import CustomButton from "@/components/button";

const Home = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className={'home'} {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img src={'./threejs.png'} alt={'logo'} className={'w-8 h-8 object-contain'}/>
                    </motion.header>
                    <motion.div className={'home-content'} {...headContentAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className={'head-text'}>
                                LET&apos;S <br className={'xl:block hidden'}/> DO IT

                            </h1>

                        </motion.div>
                        <motion.div {...headContentAnimation} className={'flex flex-col gap-5'}>
                            <p className={'max-w-md font-normal text-gray-600 text-base'}> Create your unique and
                                exclusive shirt with our brand-new 3D customization tool.
                                <strong>
                                    Unleash your imagination
                                </strong> &nbsp; and define your own style.
                            </p>
                            <CustomButton type={'filled'} title={'Customize it'} onClick={() => state.intro = false}
                                          customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
                            />
                        </motion.div>

                    </motion.div>
                </motion.section>

            )}

        </AnimatePresence>
    )

}
export default Home;