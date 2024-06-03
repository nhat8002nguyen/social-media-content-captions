import { createNewAccessCode } from '@src/api';
import '@src/App.css';
import { PhoneInput, PrimaryButton } from '@src/components/atoms';
import { sleep } from '@src/utilities';
import * as localStorage from '@src/utilities/localforageUtils';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface LoginInputs {
  phonePrefix: string
  phoneNumber: string
}

function Login() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await createNewAccessCode(data)

      await localStorage.setItem("phonePrefix", data.phonePrefix)
      await localStorage.setItem("phoneNumber", data.phoneNumber)

      setSuccess(true)
      await sleep(1000)
      navigate("/verify")
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  // Fetch initial values for Form
  useEffect(() => {
    const fetchInitialValues = async () => {
      const phoneNumber = await localStorage.getItem("phoneNumber")
      const phonePrefix = await localStorage.getItem("phonePrefix")

      if (phoneNumber && phonePrefix) {
        reset({ phoneNumber, phonePrefix });
      }
    };

    fetchInitialValues();
  }, [reset]);

  return (
    <main className="App h-screen py-40 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      <div className='flex flex-col items-center w-160 gap-8'>
        <div>
          <h1 className='text-big-title font-nunito'>
            Welcome to <span className='text-primary-color-r'>Skipli</span> AI
          </h1>
          <div>
            <p>Enter a mobile phone number that you have access to.</p>
            <p>This number will be use to login to SkipliAI.</p>
          </div>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <PhoneInput
            phoneNumberRegister={register("phoneNumber", { required: true })}
            phonePrefixRegister={register("phonePrefix", { required: true })}
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            loading={isSubmitting}
          />
          {errors.phoneNumber?.type === "required" && (
            <p role="alert" className='text-sm text-primary-color-r'>Phone number is required</p>
          )}
          <PrimaryButton loading={isSubmitting} isSuccess={success} text='Send Verification Code' />
        </form>
      </div>
    </main>
  );
}

export default Login;
