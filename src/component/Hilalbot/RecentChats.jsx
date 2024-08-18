import React, { useEffect, useRef, useState } from 'react';
import { GetAllChat } from '../../service/service';


const RecentChats = ({ deleteAllChat ,refresh,updateTitle}) => {

    const [questions, setQuestions] = useState([]);
    const inputRefs =  useRef([]);
    useEffect(() => {
        GetAllChat().then((response) => {
            if (response?.success) {

                setQuestions(response?.data?.history)
            }
        })
        // eslint-disable-next-line 
    }, [refresh]);
    const EditChatSubject = (index) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = { ...updatedQuestions[index], editable: true };
            return updatedQuestions;
        });
        setTimeout(() => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].focus();
            }
        }, 10);
    };

    const handleSubjectChange = (event, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].subject = event.target.value;
        setQuestions(updatedQuestions);
    };
  
    const handleBlur = (index) => {
        const id= questions[index]?._id;
        const data={
            subjectName:questions[index]?.subject
        }
        
        updateTitle(id,data)
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = { ...updatedQuestions[index], editable: false };
            return updatedQuestions;
        });
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
            const id= questions[index]?._id;
            const data={
                subjectName:questions[index]?.subject
            }
            
            updateTitle(id,data)
            setQuestions(prevQuestions => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[index] = { ...updatedQuestions[index], editable: false };
                return updatedQuestions;
            });
        }
    };
    // const DeleteChat = () => {

    // }
    return (
        <div className='text-lightThemeText overflow-y-auto style-3'>
            <div className='flex justify-between items-center mb-7'>
                <h2 className='text-32 font-bold'>
                    Recent chats
                </h2>
                {
                    questions?.length>0 &&
                <span
                    onClick={()=>deleteAllChat(null)}
                    role='button'
                    className='text-lightThemeDelete text-sm font-medium p-3'>
                    Delete all
                </span>
                }
            </div>
            {
                questions?.map((item, index) => (
                    <div key={`item-${index}`}
                        className='py-5 flex gap-2 justify-between border-b-[1px] border-[#D0D5DD] last:border-b-0 text-base font-normal'
                    >
                        {/* <div className='w-full'>{item?.subject}</div> */}
                        {item.editable ? (
                            <input
                                type='text'
                                className='w-full px-2'
                                ref={(input) => inputRefs.current[index] = input}
                                value={item.subject}
                                onChange={(event) => handleSubjectChange(event, index)}
                                onBlur={() => handleBlur(index)}
                                onKeyDown={(event) => handleKeyDown(event, index)}
                            />
                        ) : (
                            <div className='w-full'>{item?.subject}</div>
                        )}
                        <div className='flex gap-3'>
                            <span
                                role='button'
                                onClick={()=>EditChatSubject(index)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M16.8961 10.3476L13.6527 7.10422M4.32812 19.6721L7.07228 19.3672C7.40756 19.33 7.57519 19.3114 7.73188 19.2606C7.87089 19.2156 8.00319 19.152 8.12517 19.0716C8.26266 18.9809 8.38192 18.8617 8.62046 18.6231L19.3286 7.91505C20.2242 7.01943 20.2242 5.56734 19.3286 4.67172C18.4329 3.7761 16.9809 3.77609 16.0852 4.67172L5.37712 15.3798C5.13859 15.6183 5.01932 15.7376 4.92866 15.8751C4.84822 15.9971 4.78464 16.1294 4.73963 16.2684C4.68891 16.4251 4.67028 16.5927 4.63303 16.928L4.32812 19.6721Z" stroke="#667085" strokeWidth="1.62167" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span
                                role='button'
                                onClick={()=>deleteAllChat(item?._id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <mask id="mask0_1206_27548" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_1206_27548)">
                                        <path d="M7.3077 20.4998C6.81058 20.4998 6.38502 20.3228 6.03102 19.9688C5.67701 19.6148 5.5 19.1892 5.5 18.6921V5.99981H5.25C5.0375 5.99981 4.85938 5.9279 4.71563 5.78408C4.57188 5.64028 4.5 5.46208 4.5 5.24948C4.5 5.0369 4.57188 4.85882 4.71563 4.71523C4.85938 4.57163 5.0375 4.49983 5.25 4.49983H8.99997C8.99997 4.25497 9.08619 4.04632 9.25863 3.87388C9.43106 3.70145 9.63971 3.61523 9.88457 3.61523H14.1154C14.3602 3.61523 14.5689 3.70145 14.7413 3.87388C14.9138 4.04632 15 4.25497 15 4.49983H18.75C18.9625 4.49983 19.1406 4.57174 19.2843 4.71556C19.4281 4.85938 19.5 5.03758 19.5 5.25016C19.5 5.46276 19.4281 5.64085 19.2843 5.78443C19.1406 5.92802 18.9625 5.99981 18.75 5.99981H18.5V18.6921C18.5 19.1892 18.3229 19.6148 17.9689 19.9688C17.6149 20.3228 17.1894 20.4998 16.6922 20.4998H7.3077ZM17 5.99981H6.99997V18.6921C6.99997 18.7818 7.02883 18.8556 7.08652 18.9133C7.14422 18.971 7.21795 18.9998 7.3077 18.9998H16.6922C16.782 18.9998 16.8557 18.971 16.9134 18.9133C16.9711 18.8556 17 18.7818 17 18.6921V5.99981ZM10.1542 16.9998C10.3668 16.9998 10.5448 16.9279 10.6884 16.7842C10.832 16.6404 10.9038 16.4623 10.9038 16.2498V8.74979C10.9038 8.5373 10.8319 8.35918 10.6881 8.21543C10.5443 8.07168 10.3661 7.99981 10.1535 7.99981C9.9409 7.99981 9.76281 8.07168 9.61922 8.21543C9.47564 8.35918 9.40385 8.5373 9.40385 8.74979V16.2498C9.40385 16.4623 9.47576 16.6404 9.61958 16.7842C9.76337 16.9279 9.94158 16.9998 10.1542 16.9998ZM13.8464 16.9998C14.059 16.9998 14.2371 16.9279 14.3807 16.7842C14.5243 16.6404 14.5961 16.4623 14.5961 16.2498V8.74979C14.5961 8.5373 14.5242 8.35918 14.3804 8.21543C14.2366 8.07168 14.0584 7.99981 13.8458 7.99981C13.6332 7.99981 13.4551 8.07168 13.3115 8.21543C13.1679 8.35918 13.0961 8.5373 13.0961 8.74979V16.2498C13.0961 16.4623 13.168 16.6404 13.3118 16.7842C13.4557 16.9279 13.6339 16.9998 13.8464 16.9998Z" fill="#667085" />
                                    </g>
                                </svg>
                            </span>

                        </div>

                    </div>
                ))
               
            }
            {
                 questions.length==0 &&
                 <div className='text-xl font-medium text-center mt-28'>No Recenet Chats</div>
            }
        </div>
    );
}

export default RecentChats;
