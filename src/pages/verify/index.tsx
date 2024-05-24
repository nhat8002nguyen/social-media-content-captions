import {ReactComponent as SkipliLogo } from '@src/shared/icons/skipli-logo.svg';
import '@src/App.css';
import { PrimaryButton, PrimaryInput } from '@src/components/atoms';

function Verify() {
  return (
    <main className="App h-screen py-16 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      <div className='flex flex-col items-center w-160 gap-8'>
        <SkipliLogo width={80} height={80} />
        <div>
          <h1 className='text-big-title font-nunito'>
            Welcome to <span className='text-primary-color-r'>Skipli</span> AI
          </h1>
          <div>
            <p>Skipli AI has sent an OTP code to: <span className='font-bold'>+1 2346789121</span></p>
          </div>
        </div>
        <form className='flex flex-col gap-4'>
          <PrimaryInput loading={false} placeholder='Enter your code'/>
          <PrimaryButton text='Submit' />
        </form>
      </div>
    </main>
  );
}

export default Verify;