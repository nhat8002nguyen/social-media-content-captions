import { getUserGeneratedContents, unsaveContent } from '@src/api';
import '@src/App.css';
import { PrimaryButton, SecondaryButton } from '@src/components/atoms';
import ShareModal from '@src/components/molecules/ShareModel';
import useAuth from '@src/hooks/useAuth';
import { DashboardLayout } from '@src/pages/dashboard/layout';
import { getSavedPhoneNumber } from '@src/utilities';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

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

export default function Profile() {
  const { isAuthenticated } = useAuth()
  const [topicContents, setTopicContents] = useState<Map<string, Caption[]>>(new Map())
  const [sharedData, setSharedData] = useState<{ topic: string, content: string }>({ topic: "", content: "" })
  const [isModalOpen, setIsModalOpen] = useState(false);


  // load generated content from server
  useEffect(() => {
    const fetchGeneratedContent = async () => {
      try {
        const captions = await getUserGeneratedContents({ phoneNumber: await getSavedPhoneNumber() })

        const temp = new Map<string, Caption[]>(topicContents)
        captions.forEach(c => {
          if (temp.has(c.topic)) {
            temp.get(c.topic)?.push({
              id: c.id,
              topic: c.topic,
              content: c.data,
              saved: true
            })
          } else {
            temp.set(c.topic, [{
              id: c.id,
              topic: c.topic,
              content: c.data,
              saved: true
            }])
          }
        })

        setTopicContents(temp)
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }

    fetchGeneratedContent()
  }, [])

  const handleUnsaveContent = async (c: Caption) => {
    try {
      const result = await unsaveContent({
        captionId: c.id
      })
      if (result.success) {
        const temp = new Map<string, Caption[]>(topicContents)
        let contents = temp.get(c.topic)
        if (!contents) {
          return
        }

        contents = contents.filter(cap => cap.id !== c.id)
        if (contents.length === 0) {
          temp.delete(c.topic)
        } else {
          temp.set(c.topic, contents)
        }
        setTopicContents(temp)
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
                <div className='md:py-24 md:px-16 lg:w-full xl:w-3/4 flex flex-col gap-8'>
                  <h1 className='text-2xl sm:text-xl text-left font-bold'>Saved Content</h1>
                  {Array.from(topicContents).length > 0 ? <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-8'>
                      {Array.from(topicContents).map(entry =>
                        <div className='flex flex-col gap-4'>
                          <h3 className='text-lg sm:text-lg text-left font-bold'>{entry[0]}</h3>
                          {entry[1].map(c =>
                            <div key={c.id} className='flex flex-col bg-white px-4 py-2 gap-4 rounded-lg'>
                              <div>
                                <p className='text-left'>
                                  {c.content}
                                </p>
                              </div>
                              <div className='flex gap-4 justify-end'>
                                <PrimaryButton text='Share' className='h-8' onClick={() => handleClickShare(c)} />
                                <SecondaryButton
                                  text='Unsaved'
                                  className='h-8'
                                  onClick={() => handleUnsaveContent(c)}
                                />
                              </div>
                            </div>)}
                        </div>)}
                    </div>
                  </div>
                    : <div className='text-left'>
                      Content not found
                    </div>}
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