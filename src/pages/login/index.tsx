import {ReactComponent as SkipliLogo } from '@src/shared/icons/skipli-logo.svg';
import '@src/App.css';
import { PhoneInput, PrimaryButton } from '@src/components/atoms';

function Login() {
  return (
    <main className="App h-screen py-16 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      <div className='flex flex-col items-center w-160 gap-8'>
        <SkipliLogo width={80} height={80} />
        <div>
          <h1 className='text-big-title font-nunito'>
            Welcome to <span className='text-primary-color-r'>Skipli</span> AI
          </h1>
          <div>
            <p>Enter a mobile phone number that you have access to.</p>
            <p>This number will be use to login to SkipliAI.</p>
          </div>
        </div>
        <form className='flex flex-col gap-4'>
          <PhoneInput />
          <PrimaryButton text='Send Verification Code' />
        </form>
      </div>
    </main>
  );
}

export default Login;
