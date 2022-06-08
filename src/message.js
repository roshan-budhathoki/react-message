import React, {useState, useRef, useCallback} from 'react'
import Image from './images/male.png';
import useMessage from './useMessage';
export const Message = () => {
    const [pageNumber, setPageNumber] = useState(50);
    const { 
        messages,
        hasMore,
        loading,
        error
    } = useMessage(pageNumber);

    const observer = useRef();
    const lastMessageElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber - 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    const displayMessage = messages.map(user => 
            (
                <div className={`flex ${user.id % 2 === 0 ? '' : 'flex-row-reverse'} m-5`} key={user.id} ref={lastMessageElementRef}>
                    <div className='relative'>
                        <img src={Image} alt="personImage" className='h-16 rounded-full'></img>
                        <div className={`h-3 w-3 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} bg-green-500 -mt-5 absolute rounded-full ml-12`}></div>                
                    </div>
                    <div className={`ml-5 p-5 ${user.id % 2 === 0 ? 'bg-slate-300' : 'bg-indigo-500 text-slate-100'}  rounded-lg`}>
                        {user.id}
                    </div>
                </div>
            )
        )
    return (
        <div className='h-[97vh]'>
            <div className='flex justify-between p-5 border-slate-400 m-2 shadow-md h-[10%]'>
                <div className='font-bold text-2xl font-mono text-indigo-500'>React Message</div>
                <div className='flex w-36 justify-between'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-8 text-indigo-500'>
                        <path fill='#6366f1' d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-8'>
                        <path fill="#6366f1" d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Zm.5,6a1,1,0,0,1-.34.75,1.05,1.05,0,0,1-.82.25A17,17,0,0,1,4.07,5.22a1.09,1.09,0,0,1,.25-.82,1,1,0,0,1,.75-.34h3a1,1,0,0,1,1,.79q.06.41.15.81a11.12,11.12,0,0,0,.46,1.55l-1.4.65a1,1,0,0,0-.49,1.33,14.49,14.49,0,0,0,7,7,1,1,0,0,0,.76,0,1,1,0,0,0,.57-.52l.62-1.4a13.69,13.69,0,0,0,1.58.46q.4.09.81.15a1,1,0,0,1,.79,1Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-8'>
                        <path fill="#6366f1" d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"/>
                    </svg>
                </div>
            </div>
            <div className='bg-blue-50 mt-2 ml-2 mr-2 mb-16 p-3 h-[90%] flex flex-col-reverse bg-scroll overflow-y-scroll'>
                {displayMessage}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error'}</div>
            </div>
        </div>
    )
}
