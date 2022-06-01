import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ConnectBtn } from "./ConnectBtn";

export default function ConnectModal({ connectOpen, setConnectOpen }) {
  function closeModal() {
    setConnectOpen(false);
  }
  return (
    <>
      <Transition appear show={connectOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-stone-300 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 flex justify-between items-center ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-stone-900"
                    >
                      You are not connected.
                    </Dialog.Title>
                  </div>

                  <div className="mt-8 w-32 text-center  p-2  bg-stone-800  hover:bg-stone-900 text-stone-200">
                    <ConnectBtn />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
