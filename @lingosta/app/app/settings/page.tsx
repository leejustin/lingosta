"use client";

import {MdLockReset} from "react-icons/md";
import {useState} from "react";
import PasswordUpdateModal from "../../components/Settings/PasswordUpdateModal";

const Settings = () => {

  const [showPasswordUpdateModal, setShowPasswordUpdateModal] = useState(false);

  const closePasswordUpdateModal = () => {
    setShowPasswordUpdateModal(false);
  }

  return (
    <div className="bg-slate-300 mt-6 max-w-lg p-2 rounded-xl">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4" onClick={() => setShowPasswordUpdateModal(true)}>
                <MdLockReset className="h-12 w-12 flex-none rounded-full bg-gray-50"/>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Change Password</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">Update your Lingosta password.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <PasswordUpdateModal closeModal={closePasswordUpdateModal} isOpen={showPasswordUpdateModal}/>
    </div>
  );
}

export default Settings;