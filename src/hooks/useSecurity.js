import { useState, useEffect } from "react"
const useSecurity = (pincode) => {
  const [ isOpenPassword, setIsOpenPassword ] = useState(false)
  const [ isOpenPin, setIsOpenPin ] = useState(false)
  const [ pin, setPin ] = useState({ currentValue: '', new: '', isAvailable: false})
  const [ error, setError ] = useState('')
  const togglePassword = () => setIsOpenPassword(!isOpenPassword)
  const togglePin = () => { 
    setIsOpenPin(!isOpenPin);
    clearPin();
    setError(false)
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
  const checkPin =  (pincode, message) => {
    if(pincode !== pin.currentValue) setError(message);
    return pincode === pin.currentValue
  }
  useEffect(() => {
    if(pincode !== ''){
      setPin((prevState) => ({
        ...prevState,
        isAvailable: pin.currentValue.length === 4 && pin.new.length === 4,
      }));
    } 
    else{
      setPin((prevState) => ({
        ...prevState,
        isAvailable: pin.new.length === 4,
      }));
    }
  }, [pin.currentValue, pin.new, pincode]);

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
    error,
    setError
  }
}
export { useSecurity }

