import { useState, useEffect } from "react"
const useSecurity = () => {
  const [ isOpenPassword, setIsOpenPassword ] = useState(false)
  const [ isOpenPin, setIsOpenPin ] = useState(false)
  const [ pin, setPin ] = useState({ currentValue: '', new: '', isAvailable: false})
  const togglePassword = () => setIsOpenPassword(!isOpenPassword)
  const togglePin = () => { 
    setIsOpenPin(!isOpenPin);
    clearPin();
  };
  const clearPin = () => {
    setPin({ currentValue: '', new: '', isAvailable:false})
  }
  const handlePinChange = (e) => {
    e.preventDefault()
    setPin((prevState) => {
          return {
            ...prevState,
            [e.target.name]:  e.target.value,
          };
    });
  }
  const checkPin =  (pincode) => {
    return pincode === pin.currentValue
  }
  useEffect(()=> {
    if(pin.currentValue.length !== 6 || pin.new.length !== 6 ) {
      setPin((prevState) => {
            return {
              ...prevState,
              isAvailable: false,
            };
        });
    }
    else {
      setPin((prevState) => {
            return {
              ...prevState,
              isAvailable: true,
            };
        });
    }
  }, [pin.currentValue, pin.new])
  return {
    isOpenPassword,
    setIsOpenPassword,
    isOpenPin,
    setIsOpenPin,
    togglePassword,
    togglePin,
    clearPin,
    handlePinChange,
    pin,
    isAvailable: pin.isAvailable,
    checkPin,
  }
}
export { useSecurity }

