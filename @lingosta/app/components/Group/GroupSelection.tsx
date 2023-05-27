import {Menu, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {VscAdd, VscChevronDown} from "react-icons/all";
import {useGroup} from "../../providers/GroupProvider";
import {useUser} from "../../providers/UserProvider";
import {getLanguageEmoji, UserGroup} from "@lingosta/common";
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

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-10">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
            { activeGroup ? <span className="ml-2">{getLanguageEmoji(activeGroup.language)} {activeGroup.name}</span> : <span>Select Group</span>}
            <VscChevronDown
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
            <div className="px-1 py-1 ">
              {userGroups?.filter((group: UserGroup) => group.id !== activeGroup.id).map((group: UserGroup) => (
                <Menu.Item key={group.id} onClick={() => {
                  // This will need to be refactored if we store more than activeGroupId in the configs
                  setActiveGroup(group);
                  setUserConfigs({
                    activeGroupId: group.id
                  });
                }
                }>
                  {({active}) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
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
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openCreateModal}
                  >
                    <VscAdd className="mr-2 h-5 w-5" aria-hidden="true"/>
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
