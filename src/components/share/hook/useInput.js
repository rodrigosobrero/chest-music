import React, { useState } from 'react'

const useInput = () => {
    const [input, setInput] =  useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleMessage = (e) => setMessage(e.target.value)

    const handleCheck = (e) => setIsChecked(e.target.checked);

    const handleToggle = () => setIsToggled(!isToggled);
  
    const handleChange = (e) => setInput(e.target.value);  

    return { handleToggle, handleCheck, handleChange, value, isChecked, input, setValue, isToggled, handleMessage, message }
}

export default useInput