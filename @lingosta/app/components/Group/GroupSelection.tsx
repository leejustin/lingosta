import {Menu, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {HiPlusCircle, HiChevronDown} from "react-icons/hi";
import {useGroup} from "../../providers/GroupProvider";
import {useUser} from "../../providers/UserProvider";
import {getLanguageEmoji, UserGroup} from "../../../common";
import GroupModal from "./GroupModal";

const GroupSelection = () => {
  const {userGroups, activeGroup, setActiveGroup} = useGroup();
  const {setUserConfigs} = useUser();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  const handleActiveGroup = (group: UserGroup) => {
    setActiveGroup(group);
    setUserConfigs({
      activeGroupId: group.id
    });
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-75 transition">
            { activeGroup ? <span className="ml-2">{getLanguageEmoji(activeGroup.language)} {activeGroup.name}</span> : <span>Select Group</span>}
            <HiChevronDown
              className="ml-2 -mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
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
          <Menu.Items
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {userGroups?.filter((group: UserGroup) => group.id !== activeGroup.id).map((group: UserGroup) => (
                <Menu.Item key={group.id}>
                  {({active}) => (
                    <button
                      onClick={() => handleActiveGroup(group)}
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                    >
                      <div className="mr-2 h-5 w-2 whitespace-nowrap" aria-hidden="true">
                        <span>{getLanguageEmoji(group.language)} {group.name}</span>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({active}) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openCreateModal}
                  >
                    <HiPlusCircle className="mr-2 h-5 w-5" aria-hidden="true"/>
                    Create Group
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <GroupModal isOpen={isCreateModalOpen} closeModal={closeCreateModal} />
    </div>
  )
}

export default GroupSelection