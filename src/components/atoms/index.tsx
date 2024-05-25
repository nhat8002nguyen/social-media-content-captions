import { phonePrefixes } from "@src/shared/constants/phonePrefixes"
import React from "react"
import successGif from '@src/shared/images/icons-success.gif'
import { UseFormRegisterReturn } from "react-hook-form"

interface PhoneInputProps extends React.HTMLAttributes<HTMLInputElement> {
  loading?: boolean
  phonePrefixRegister: UseFormRegisterReturn
  phoneNumberRegister: UseFormRegisterReturn
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {
  const { loading, phoneNumberRegister, phonePrefixRegister } = props;

  return (
    <div className="max-w-md w-80 bg-white p-2 rounded-lg shadow-md">
      <div className="flex items-center rounded-lg overflow-hidden">
        <div className="relative">
          <select
            id="phone-prefix"
            className="appearance-none bg-white px-4 py-2 pr-8 border-r border-gray-400 outline-none focus:border-gray-500"
            disabled={loading}
            {...phonePrefixRegister}
          >
            {phonePrefixes.map((p) => <option key={p.code} value={p.code}>{`${p.flag} ${p.code}`}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.707 7.293L10 11.586l4.293-4.293 1.414 1.414-5.707 5.707L4.293 8.707z" />
            </svg>
          </div>
        </div>
        <input
          id="phone-number"
          type="number"
          className="w-full py-2 px-3 text-gray-700 outline-none focus:border-gray-500 no-spinner"
          placeholder="Your phone number"
          disabled={loading}
          {...phoneNumberRegister}
        />
      </div>
    </div>
  )
})

interface PrimaryInputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string
  loading?: boolean
}

export const PrimaryInput = React.forwardRef<HTMLInputElement, PrimaryInputProps>((props, ref) => {
  const { className, placeholder, loading, ...rest } = props;

  return (
    <div className="max-w-md w-80 bg-white p-2 rounded-lg shadow-sm">
      <input
        ref={ref}
        type="text"
        className={`w-full py-2 px-3 text-gray-700 outline-none focus:border-gray-500`}
        disabled={loading}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
})

interface PrimaryButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  text: string
  loading?: boolean,
  isSuccess?: boolean,
}

export const PrimaryButton = React.forwardRef<HTMLInputElement, PrimaryButtonProps>((props, ref) => {
  const { className, text, loading, isSuccess, ...rest } = props;

  return (
    <>
      {!isSuccess ? !loading ? <input type="submit" ref={ref} className={`px-8 bg-gradient-to-r from-primary-color-l to-primary-color-r rounded-md h-12 text-white font-bold cursor-pointer shadow-primary-button active:shadow-none ${loading ? "shadow-none opacity-50 cursor-not-allowed" : ""} ${className}`} {...rest} value={text} />
        : <div className={`flex items-center justify-center bg-gradient-to-r from-primary-color-l to-primary-color-r rounded-md h-12 text-white font-bold shadow-primary-button active:shadow-none ${true ? "shadow-none opacity-70 cursor-not-allowed" : "cursor-pointer"} ${className}`}>
          <div className={`animate-spin rounded-full h-8 w-8 border-t-4 border-white`}></div>
        </div>
        : <div className="flex justify-center">
          <img src={successGif} alt="Success GIF" className="w-10 h-10 object-cover" />
        </div>}
    </>
  );
});