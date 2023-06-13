import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUser } from '../../providers/UserProvider';
import { FaUserCircle } from 'react-icons/fa';
import { TbSettings, TbLogout } from 'react-icons/tb';
import Link from 'next/link';

const SettingsSelection = () => {
  const { logout } = useUser();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center px-2 py-2 text-2xl font-medium text-gray hover:bg-opacity-75">
            <FaUserCircle className="text-black hover:opacity-50 transition" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/settings">
                    <button
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                    >
                      <TbSettings className="mr-2 h-5 w-5" aria-hidden="true" />
                      Settings
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                    onClick={logout}
                  >
                    <TbLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SettingsSelection;
