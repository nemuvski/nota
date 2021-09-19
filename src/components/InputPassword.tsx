import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import Styles from '@/styles/input-password.style'
import InputText from '@/styles/input-text.component'

const InputPassword = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div css={Styles.root}>
      <InputText css={Styles.input} type={isVisible ? 'text' : 'password'} {...props} />
      <button css={Styles.button} type='button' onClick={() => setIsVisible(!isVisible)} aria-hidden='true'>
        {isVisible ? <IoEyeOff /> : <IoEye />}
      </button>
    </div>
  )
}

export default InputPassword
