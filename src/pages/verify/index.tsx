import { validateAccessCode } from '@src/api';
import '@src/App.css';
import { PrimaryButton, PrimaryInput } from '@src/components/atoms';
import { ReactComponent as SkipliLogo } from '@src/shared/icons/skipli-logo.svg';
import { getSavedPhoneNumber, sleep } from '@src/utilities';
import * as localStorage from '@src/utilities/localforageUtils';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface VerifyInput {
  accessCode: string
}

function Verify() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyInput>()

  const onSubmit: SubmitHandler<VerifyInput> = async (data) => {
    try {
      const phone = await getSavedPhoneNumber()
      const result = await validateAccessCode(phone, data)

      if (result?.success) {
        // Set authenticated to allow accessing protected pages, expired after a time
        localStorage.setItem("expiredTime", new Date(new Date().getTime() + 15 * 60000).getTime())

        setSuccess(true)
        await sleep(1000)
        return navigate("/dashboard")
      }

      throw new Error("Could not validate access code.")
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
        setPhoneNumber(`${phonePrefix} ${phoneNumber}`)
      }
    };

    fetchInitialValues();
  }, []);

  return (
    <main className="App h-screen py-16 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      <div className='flex flex-col items-center w-160 gap-8'>
        <SkipliLogo width={80} height={80} />
        <div>
          <h1 className='text-big-title font-nunito'>
            Welcome to <span className='text-primary-color-r'>Skipli</span> AI
          </h1>
          <div>
            <p>Skipli AI has sent an OTP code to: <span className='font-bold'>{phoneNumber}</span></p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
          <PrimaryInput {...register("accessCode", { required: true })} errors={errors} inputName={"accessCode"} loading={isSubmitting} placeholder='Enter your code' />
          {/* {errors.accessCode?.type === "required" && (
            <p role="alert" className='text-sm text-primary-color-r'>Access code is required</p>
          )} */}
          <PrimaryButton loading={isSubmitting} isSuccess={success} text='Submit' />
        </form>
      </div>
    </main>
  );
}

export default Verify;