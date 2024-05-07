import React from 'react';
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon, XMarkIcon, LinkIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

const Toast = ({ type, title, body, close, project_id }) => {
  const icons = {
    invite_accepted: <LinkIcon className='text-brand-gold h-7 w-7' />,
    invite_denied: <XMarkIcon className='text-brand-gold h-7 w-7' />,
    track_uploaded: <CheckCircleIcon className='text-brand-gold h-7 w-7' />,
    version_shared: <MusicalNoteIcon className='text-brand-gold h-7 w-7' />,
    copy: <DocumentDuplicateIcon className='text-brand-gold h-7 w-7'/>,
    invite_default: <MusicalNoteIcon className='text-brand-gold h-7 w-7' />, 
    version_uploaded: <MusicalNoteIcon className='text-brand-gold h-7 w-7' />,
    version_deleted: <TrashIcon className='text-brand-gold h-7 w-7' />
  };

  const icon = icons[type];

  const cutName = (name) => {
    return name.length > 29 ? name.slice(0, 28) + '...' : name;
  }

  const onRedirect = () => {
    if(!project_id) return;

    window.location.replace('/my-chest/treasure/' + project_id)
  }
  return (
    <>
        <div className={`w-[340px] lg:w-[430px]  flex justify-between gap-4 !bg-neutral-silver-600 p-3 !rounded-2xl 
                         ${project_id && 'cursor-pointer'}`} onClick={onRedirect}>
            <div className='flex gap-4'>
              <div className='p-3 rounded-xl bg-neutral-black'>
                  {icon}
              </div>
              <div className='!text-left'>
                  <p className='lg:!text-lg !text-base font-semibold'>{cutName(title)}</p>
                  <p className='!text-base !text-left !text-neutral-silver-200'>{cutName(body)}</p>
              </div>
            </div>
            <button className='p-2 items-center lg:block hidden' onClick={(e) => { e.stopPropagation() ; close()}}>
                <XMarkIcon className='!text-neutral-silver-200 h-6 w-6'/>
            </button>
        </div>
    </>
  )
}

export default Toast