import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function IconModal({heading, subheading, button1, button2, setMessage, isOpen, setOpen, closeModal, handleDeleteBook, selectedBook, setPlaying, setAudioPage, setPage, userId}) {

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                     {heading}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {subheading}
                    </p>
                  </div>

                  <div className="mt-4 flex w-full justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent text-white bg-rose-500 px-4 py-2 text-sm font-medium  hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => { 
                        handleDeleteBook(selectedBook.id, userId); 
                        closeModal();
                        setOpen(false);
                        setMessage({text: "Book Deleted!!", type: "delete"});
                        setPlaying(false);
                        //setAudio("");
                        setAudioPage(0);
                        setPage(0); 
                      }}
                    >
                     {button1}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent text-white bg-teal-500 px-4 py-2 text-sm font-medium  hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {button2}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
