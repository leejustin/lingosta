import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import LanguageSelection from "./LanguageSelection";
import {Language} from "../../../common";
import { useGroup } from "../../providers/GroupProvider";
import { useUser } from "../../providers/UserProvider";

const GroupModal = ({isOpen, closeModal}) => {
  const {createGroup} = useGroup();
  const {user} = useUser();

  const [groupName, setGroupName] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setGroupName("");
    setErrorMessage("");
  }, [isOpen])

  const handleSubmit = async () => {
    if (!groupName) {
      setErrorMessage("Please enter a group name.");
      return;
    } else if (!selectedLanguage) {
      setErrorMessage("Please select a language.");
      return;
    }

    const result = await createGroup({
      name: groupName,
      ownerId: user.$id,
      language: selectedLanguage,
    });

    if (result) {
      console.log(`Created group ${result.name} with id ${result.id}`);
      closeModal();
    }
  }

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
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a Group
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Groups organize your translations together.
                    </p>
                  </div>
                  <div className="z-20">
                    <div className="w-full">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={"Group name"}
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                      />
                    </div>
                    <LanguageSelection setLanguage={setSelectedLanguage}/>
                  </div>
                  {errorMessage && (<div>
                    <p className="text-red-700">{errorMessage}</p>
                  </div>)}
                  <div className="mt-4 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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

export default GroupModal;
