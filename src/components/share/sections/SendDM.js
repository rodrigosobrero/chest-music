import React, { useEffect, useState } from 'react'
import Input from 'components/Input'
import Toggle from '../Toggle'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ButtonsContainer from '../ButtonsContainer';
import TagInput from '../TagInput';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';

const SendDM = ({ token , versionId, onCancel }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [selecteds, setSelecteds] = useState([])
  const [limit, setLimit] = useState('')

  const handleChange = (e) => setInput(e.target.value)
  const handleToggle = () => setIsToggled(!isToggled)
  const handleLimitChange = (e) => setLimit(e.target.value)
  const handleCheck = (e) => setIsChecked(e.target.checked)
  const handleMessageChange = (e) => setMessage(e.target.value)
  
  const selectOption = (i) => {
    let aux = selecteds;
    aux.push(filteredUsers[i])
    setInput('')
    setSelecteds(aux)
  }
  
  const removeOption = (id) => {
    let aux = selecteds;
    aux = aux.filter((el) => el.id !== id)
    setSelecteds(aux)
  }

  useEffect(() => {
    if(!token) return;
    if(input.length < 2) {
        if(filteredUsers.length > 0) setFilteredUsers([])
        return;
    }
    axios.get(process.env.REACT_APP_API + 'user/?search=' + input, { headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
        let users = response.data;
        if (selecteds.length > 0) {
            users = users.filter(user => !selecteds.some(selected => selected.id === user?.id));
        }
        setFilteredUsers(users)
    }).catch(({response}) => {
        if(response.data.code === 'firebase-expired-token') {
            signOut(auth)
          } 
    })
  }, [input, token])
  
  const sendToUsers = () => {
    let usersIds = selecteds.map((el) => (el.id))
    let data = {
        "version": versionId,
        "allow_web_play": isChecked,
        "users": usersIds,
        "message": message ? message : 'Chequeá mi nuevo tema'
    }
    if(!isToggled) {
        data.play_limit = parseInt(limit)
     }

    axios.post(process.env.REACT_APP_API + 'shared/user/', data, { headers:{ Authorization: `Bearer ${token}` }})
    .then((response) => {
        navigate(-1)
    })
    .finally(() => {
        setInput('')
        setMessage('')
        setSelecteds([])
        setLimit('')
        setIsChecked(false)
        setIsToggled(false)
    })
  }

  return (
    <>
        <div className='share-container'>
            <div className='hidden md:flex md:flex-row flex-col items-start md:items-center md:w-4/5 gap-5'>
                <div className='w-full md:w-3/4'>
                <Input label={t('share.play_limit')}
                       required={true} 
                       placeholder={t('global.placeholder.only_numbers')} 
                       type='number' 
                       value={limit} 
                       disabled={isToggled}
                       onChange={handleLimitChange} />
                </div>
                <div className='w-full md:w-1/4 flex items-center gap-2.5 '>
                    <Toggle onChange={handleToggle}/>
                    <span className='-mb-7'>{t('share.unlimited')}</span>
                </div>
            </div>
            {/* <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                <input type='checkbox' onChange={handleCheck}/> 
                <label className='text-base font-archivo'>{t('share.allow_web_play')}</label>
                <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
            </div> */}
            <div className='lg:w-4/5 w-full'>
                <TagInput handleChange={handleChange} selectOption={selectOption} selectedsOptions={selecteds} filteredUsers={filteredUsers} input={input} removeOption={removeOption}/>
            </div>
            <div className='lg:w-4/5 w-full'>
                <Input label={t('share.message')} placeholder={t('share.message_example')} onChange={handleMessageChange} value={message}/>
            </div>
        </div>
        <ButtonsContainer primaryButton={t('global.send')} 
                          onClick={sendToUsers} 
                          disabled={!(input === '' || !isToggled) || selecteds.length < 1} 
                          onCancel={onCancel}/>
     </>
  )
}

export default SendDM