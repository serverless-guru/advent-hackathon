import Image from 'next/image';

export const Header = () => {

    return <div className="text-white ">
        <div className={'flex items-center justify-between'}>
            <img src="assets/icons/Logo.svg" alt="Vercel Logo" width={175} height={25}/>
            <div className={'text-xs mt-3 flex items-center gap-[52px]'}>
                <div className={'cursor-pointer'}>Challenge</div>
                <div className={'cursor-pointer'}>Event Timeline</div>
                <div className={'cursor-pointer'}>Prizes and Rules</div>
                <div className={'py-[12px] font-black bg-[#F53F3B] cursor-pointer rounded-[100px] px-[16px]'}>Join the
                    Challenge
                </div>
            </div>
        </div>
        <div className={'flex  justify-start '}>
            <div className={'ml-[25px]  flex flex-col gap-[20px] items-center'}>
                <Image
                    src="assets/icons/linea.svg"
                    alt="My SVG"
                    width={2}
                    height={112}
                />
                <Image
                    src="assets/icons/linea-tree.svg"
                    alt="My SVG"
                    width="12" height="16"
                />
                <Image
                    src="assets/icons/linea-message.svg"
                    alt="My SVG"
                    width="16" height="16"
                />
                <Image
                    src="assets/icons/linea-flash.svg"
                    alt="My SVG"
                    width="12" height="16"
                />
                <Image
                    src="assets/icons/linea-down.svg"
                    alt="My SVG"
                    width="2" height="307"
                />
            </div>
            <div className={'ml-[45px] mt-[65px] flex flex-col'}>
                <div className={'text-6xl'}>Serverless Christmas</div>
                <div className={'text-6xl'}>Challenge</div>
                <div className={'text-[10px] mt-[36px] py-[4px] px-[8px] rounded-[100px] max-w-[104px] bg-[#c4ac7c36]'}>
                    <span className={'font-bold'}>Remote</span> Hackathon
                </div>
                <div className={'flex mt-[27px]  gap-[43px]'}>
                    <div className={'text-xl flex flex-col gap-[4px]'}>
                        <div>Get ready for the festive season with</div>
                        <div>an extraordinary Hackathon! Festive</div>
                        <div>Codes & Winter Nodes: Dive into the</div>
                        <div> Serverless Christmas Challenge 2023!</div>
                    </div>
                    <div className={'flex text-xl flex-col'}>
                        <div>
                            <div>December&nbsp;<span className={'font-bold'}>01</span>,&nbsp;2023</div>
                            <div className={'text-sm'}>Officially Begins</div>

                        </div>
                        <div className={'mt-[28px]'}>
                            <div>January&nbsp;<span className={'font-bold'}>21</span>,&nbsp;2024</div>
                            <div className={'text-sm'}>Demo Day</div>
                        </div>
                    </div>

                </div>
                <div className={'mt-[57px] rounded-[100px] pl-[8px] pr-[4px] bg-gradient-to-r from-pink-300 to-yellow-500 max-w-[420px] h-[40px] flex items-center justify-between'}>
                    <div className={'text-[11px] font-bold text-[#000100] '}>Dive in for a chance to innovate in Santa's virtual world!</div>
                    <div className={'flex gap-[4px] py-[8px] px-[23.5px] bg-[#F53F3B] cursor-pointer rounded-[100px] items-center'}>
                        <div className={'text-[11px]'}>Register</div>
                        <Image
                            src="assets/icons/export.svg"
                            alt="My SVG"
                            width={16}
                            height={16}
                        />
                    </div>
                </div>

                {/*<div className={'flex  gap-[20px] items-center'}>*/}

                {/*  <div>sponsors</div>*/}
                {/*    <Image*/}
                {/*        src="assets/icons/linea-message.svg"*/}
                {/*        alt="My SVG"*/}
                {/*        width="16" height="16"*/}
                {/*    />*/}
                {/*    <Image*/}
                {/*        src="assets/icons/linea-flash.svg"*/}
                {/*        alt="My SVG"*/}
                {/*        width="12" height="16"*/}
                {/*    />*/}

                {/*</div>*/}
            </div>
            <div className={'ml-[65px] relative '}>
                <img src="assets/images/Bubble.png" className={'mt-[70px]'} alt="Bubble" width={400} height={621}/>
                <div className="absolute  bottom-[-35px] left-[-150px]   right-0 bg-gradient-to-t from-[#CBA965] to-transparent w-[767px]  h-[148px]"></div>
            </div>
        </div>


    </div>
}
