import React from "react"

interface PhoneInputProps {}

export const PhoneInput: React.FC<PhoneInputProps> = () => {
  return (
    <div className="max-w-md w-80 bg-white p-2 rounded-lg shadow-md">
      <div className="flex items-center rounded-lg overflow-hidden">
        <div className="relative">
          <select
            id="phone-prefix"
            className="appearance-none bg-white px-4 py-2 pr-8 border-r border-gray-400 outline-none focus:border-gray-500"
          >
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+91">+91</option>
            <option value="+61">+61</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.707 7.293L10 11.586l4.293-4.293 1.414 1.414-5.707 5.707L4.293 8.707z" />
            </svg>
          </div>
        </div>
        <input
          id="phone-number"
          type="text"
          className="w-full py-2 px-3 text-gray-700 outline-none focus:border-gray-500"
          placeholder="Your phone number"
        />
      </div>
    </div>
  )
}

interface PrimaryInputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string
  loading?: boolean
}

export const PrimaryInput = React.forwardRef<HTMLInputElement, PrimaryInputProps>((props, ref) => {
  const { className, placeholder, loading, ...rest } = props;

  return (
    <div className="max-w-md w-80 bg-white p-2 rounded-lg shadow-md">
        <input
          id="phone-number"
          type="text"
          className={`w-full py-2 px-3 text-gray-700 outline-none focus:border-gray-500`}
          disabled={loading}
          placeholder={placeholder}
          {...rest}
        />
    </div>
  )
})

interface PrimaryButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  loading?: boolean
}

export const PrimaryButton = React.forwardRef<HTMLDivElement, PrimaryButtonProps>((props, ref) => {
  const { className, text, loading, ...rest } = props;

  return (
      <div ref={ref} className={`bg-gradient-to-r from-primary-color-l to-primary-color-r rounded-md h-12 flex flex-col justify-center text-white font-bold cursor-pointer shadow-primary-button active:shadow-none ${loading ? "shadow-none opacity-50 cursor-not-allowed" : ""} ${className}`} {...rest}>
        {text}
      </div>
  );
});