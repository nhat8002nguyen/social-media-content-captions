import { createCaptionsFromIdeas, saveGeneratedContent, unsaveContent } from '@src/api';
import '@src/App.css';
import { PrimaryButton, SecondaryButton } from '@src/components/atoms';
import ShareModal from '@src/components/molecules/ShareModel';
import useAuth from '@src/hooks/useAuth';
import { DashboardLayout } from '@src/pages/dashboard/layout';
import { getSavedPhoneNumber, sleep } from '@src/utilities';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';

interface Caption {
  id: string
  content: string
  topic: string
  saved: boolean
}

export interface ScratchGenerationInputs {
  socialNetwork: string,
  subject: string,
  tone: string
}

export default function InspiredCaptionCreate() {
  const [success, setSuccess] = useState(false)
  const { isAuthenticated } = useAuth()
  const [captions, setCaptions] = useState<Caption[]>([])
  const [isContentSaving, setIsContentSaving] = useState(false)
  const { state } = useLocation()
  const [sharedData, setSharedData] = useState<{ topic: string, content: string }>({ topic: "", content: "" })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ScratchGenerationInputs>()

  const onSubmit: SubmitHandler<ScratchGenerationInputs> = async (data) => {
    try {
      if (!state.idea) {
        throw new Error("Idea not found, please go back!")
      }
      setCaptions([])
      const captions = await createCaptionsFromIdeas({
        idea: state.idea
      })
      if (captions.length === 0) {
        throw new Error("Something was wrong, please try again!")
      }
      setCaptions(() => captions.map((c, i) => ({
        id: i.toString(),
        content: c,
        topic: state.idea,
        saved: false
      })))

      setSuccess(true)
      await sleep(1000)
      setSuccess(false)

    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  const handleSaveContent = async (c: Caption) => {
    try {
      setIsContentSaving(true)
      const result = await saveGeneratedContent({
        phoneNumber: await getSavedPhoneNumber(),
        topic: c.topic,
        data: c.content,
      })
      if (result.success) {
        setCaptions(prev => prev.map(cap => {
          if (cap.id === c.id) {
            cap.id = result.captionId
            cap.saved = true
          }
          return cap
        }))
      }
    } catch (err) {
      console.error(err)
      alert(err)
    } finally {
      setIsContentSaving(false)
    }
  }

  const handleUnsaveContent = async (c: Caption) => {
    try {
      const result = await unsaveContent({ captionId: c.id })
      if (result.success) {
        setCaptions(prev => prev.map(cap => {
          if (cap.id === c.id) {
            cap.saved = false
          }
          return cap
        }))
      }
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  const handleClickShare = (c: Caption) => {
    setSharedData({ topic: c.topic, content: c.content })
    setIsModalOpen(true)
  }

  return (
    <>
      {
        isAuthenticated === null ? "" : isAuthenticated === false ? <Navigate to={"/login"} replace /> :
          <main className="App min-h-screen bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
            <div>
              <DashboardLayout>
                <div className='md:py-24 md:px-16 lg:w-3/4 flex flex-col gap-8'>
                  <h1 className='text-2xl sm:text-xl text-left'>{state.idea ? state.idea : "Idea not found"}</h1>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className='flex justify-end'>
                      <PrimaryButton text='Generate Caption' className='lg:w-1/3 md:w-2/3' loading={isSubmitting} isSuccess={success} />
                    </div>
                  </form>
                  <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl sm:text-xl text-left font-bold'>{`Captions generated for you (${captions.length > 0 ? captions.length : 0})`}</h1>
                    <div className='flex flex-col gap-4'>
                      {captions.map(c =>
                        <div key={c.id} className='flex flex-col bg-white px-4 py-2 gap-4 rounded-lg'>
                          <div>
                            <p className='text-left'>
                              {c.content}
                            </p>
                          </div>
                          <div className='flex gap-4 justify-end'>
                            <PrimaryButton text='Share' className='h-8' onClick={() => handleClickShare(c)} />
                            {!c.saved
                              ? <SecondaryButton
                                text='Save'
                                className='h-8'
                                onClick={() => handleSaveContent(c)}
                                disabled={isContentSaving}
                              />
                              : <SecondaryButton
                                text='Unsaved'
                                className='h-8'
                                onClick={() => handleUnsaveContent(c)}
                                disabled={isContentSaving}
                              />
                            }
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </DashboardLayout>
            </div>
            <ShareModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              topic={sharedData?.topic}
              content={sharedData?.content}
            />
          </main>
      }
    </>
  );
}