import { useState } from 'react';
import AutoComplete from 'components/AutoComplete';
import Dropdown from 'components/Dropdown';

import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function UserSelector({ roles, users, selected }) {
  const [userList, setUserList] = useState(users);

  const updateUser = (user, role) => {
    const itemIndex = userList.findIndex(saved => saved.id === user.id);
    const list = [...userList];

    list[itemIndex] = {
      ...list[itemIndex],
      role: role
    }

    setUserList(list);
  }

  const addUser = (user, role, id) => {
    const newUser = { full_name: user, role: role, id: id };
    const list = [...userList, newUser];

    setUserList(list);
    selected(newUser);
  }

  const removeUser = (user) => {
    setUserList((current) =>
      current.filter((participant) => participant.user !== user)
    );
  };

  return (
    <>
      <AutoComplete
        options={roles}
        handleAdd={addUser} />
      <div className='flex flex-col gap-4'>
        {userList.map((user, index) =>
          <div key={index}>
            <div className='flex flex-row items-center gap-3'>
              <div className='p-2 bg-black rounded-full'>
                {(() => {
                  switch (user.role) {
                    case 'artist':
                      return <MicrophoneIcon className='h-5 w-5 text-brand-gold' />
                    case 'listener':
                      return <MusicalNoteIcon className='h-5 w-5 text-white' />
                    case 'feat':
                      return <MegaphoneIcon className='h-5 w-5 text-green-500' />
                    case 'producer':
                      return <ComputerDesktopIcon className="h-5 w-5 text-violet-500" />
                  }
                })()}
              </div>
              <div className='flex flex-row w-full items-center justify-center'>
                <div className='grow flex items-center'>
                  <span className='!mb-0 text-ellipsis !text-white'>
                    {user.full_name}
                  </span>
                </div>
                <Dropdown
                  list={roles}
                  remove={() => removeUser(user)}
                  selected={user.role}
                  set={(role) => { updateUser(user, role) }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}