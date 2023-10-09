import { useState, useEffect } from "react"
const useSecurity = () => {
  const [ isOpenPassword, setIsOpenPassword ] = useState(false)
  const [ isOpenPin, setIsOpenPin ] = useState(false)
  const [ newPin, setNewPin ] = useState({ password: '', passwordRepeat: '', isAvailable: false})
//   const [ newPasswordConfirm, setNewPassordConfirm ] = useState('')
  const togglePassword = () => setIsOpenPassword(!isOpenPassword)
  const togglePin = () => { 
    setIsOpenPin(!isOpenPin);
    clearPin();
  };
  const clearPin = () => {
        setNewPin({ password: '', passwordRepeat: '', isAvailable:false})
  }
  const handlePinChange = (e) => {
    e.preventDefault()
    console.log(e.target.name, e.target.value)
    setNewPin((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
  }
  useEffect(()=> {
    if(newPin.password === '' || newPin.passwordRepeat === '') {
        setNewPin((prevState) => {
            return {
              ...prevState,
              isAvailable: false,
            };
        });
    }
    else {
        setNewPin((prevState) => {
            return {
              ...prevState,
              isAvailable: true,
            };
        });
    }
  }, [newPin.password, newPin.passwordRepeat])
  console.log(newPin.isAvailable)
  return {
    isOpenPassword,
    isOpenPin,
    togglePassword,
    togglePin,
    clearPin,
    handlePinChange,
    newPin,
    isAvailable: newPin.isAvailable
  }
}
export { useSecurity }

