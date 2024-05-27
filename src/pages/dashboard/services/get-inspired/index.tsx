import { getPostIdeas } from '@src/api';
import '@src/App.css';
import { PrimaryButton, PrimaryInput, SecondaryButton } from '@src/components/atoms';
import useAuth from '@src/hooks/useAuth';
import { DashboardLayout } from '@src/pages/dashboard/layout';
import { sleep } from '@src/utilities';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

export interface IdeasGenerationInputs {
  topic: string
}

export default function GetInspiredService() {
  const [success, setSuccess] = useState(false)
  const { isAuthenticated } = useAuth()
  const [ideas, setIdeas] = useState<string[]>([])
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IdeasGenerationInputs>()

  const onSubmit: SubmitHandler<IdeasGenerationInputs> = async (data) => {
    try {
      const ideas = await getPostIdeas(data)
      if (ideas.length === 0) {
        throw new Error("Something was wrong, please try again later!")
      }

      setIdeas(ideas)

      setSuccess(true)
      await sleep(1000)
      setSuccess(false)

    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  const handleClickIdea = (idea: string) => {
    navigate("/dashboard/services/get-inspired/captions", { state: { idea } })
  }

  return (
    <>
      {
        isAuthenticated === null ? "" : isAuthenticated === false ? <Navigate to={"/login"} replace /> :
          <main className="App min-h-screen bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
            <div>
              <DashboardLayout>
                <div className='md:py-24 md:px-16 lg:w-full xl:w-3/4 flex flex-col gap-4'>
                  <h1 className='text-2xl sm:text-xl text-left font-bold'>Get Inspired</h1>
                  <div className='text-left flex flex-col gap-2'>
                    <p>Stick staring at a blank page? Tell us what topic you have in mind and Skipli AI will generate a list of post ides and captions for you.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className='text-left flex flex-col gap-2'>
                      <p>What topic do you want a ideas for?</p>
                      <PrimaryInput
                        {...register("topic", { required: true })}
                        inputName='topic'
                        errors={errors}
                        loading={isSubmitting}
                        placeholder='Enter your topic'
                        className='w-full'
                      />
                    </div>
                    <div className='flex justify-end'>
                      <PrimaryButton
                        text='Generate Ideas'
                        className='lg:w-1/3 md:w-2/3'
                        loading={isSubmitting}
                        isSuccess={success}
                      />
                    </div>
                  </form>
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl sm:text-xl text-left font-bold'>{`Ideas generated for you (${ideas.length > 0 ? ideas.length : 0})`}</h1>
                    <div className='flex flex-col gap-4'>
                      {ideas.map((idea, i) =>
                        <div key={i} className='flex flex-col bg-white px-4 py-2 gap-4 rounded-lg'>
                          <div>
                            <p className='text-left'>
                              {idea}
                            </p>
                          </div>
                          <div className='flex gap-4 justify-end'>
                            <SecondaryButton
                              text='Generate Caption'
                              className='h-8'
                              onClick={() => handleClickIdea(idea)}
                            />
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </DashboardLayout>
            </div>
          </main>
      }
    </>
  );
}