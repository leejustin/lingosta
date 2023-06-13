import React, {useEffect, useState} from 'react';
import {useUser} from '../../providers/UserProvider';
import {UserTranslation} from '../../models';
import Textbox from './Textbox';
import {BsTranslate} from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';
import {useGroup} from '../../providers/GroupProvider';
import axios from 'axios';
import {createTranslation, deleteTranslation, getUserTranslations,} from '../../helpers/TranslationHelper';
import {toast, Toaster} from 'react-hot-toast';
import PrevTranslationsList from './PrevTranslationsList';
import ViewOnly from './ViewOnly';
import GroupModal from '../Group/GroupModal';

const TranslateContainer: React.FC = () => {
  const {user} = useUser();
  const {activeGroup} = useGroup();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isViewOnlyOpen, setIsViewOnlyOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setisGroupModalOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [translations, setTranslations] = useState<any>(null);
  const [translationsList, setTranslationsList] = useState<UserTranslation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState<UserTranslation | undefined>();

  const handleSave = async (selectedTerms: any) => {
    const userTranslation: UserTranslation = {
      ownerId: user!.$id,
      groupId: activeGroup!.id,
      terms: selectedTerms,
      rawData: input,
      sourceLanguage: activeGroup!.language,
    };

    try {
      await createTranslation(userTranslation);

      setInput('');
      setIsOpen(false);
      toast.success('Successfully saved!');

      setTranslationsList((prevTranslationsList) => [...prevTranslationsList, userTranslation]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleTranslate = async () => {
    try {
      if (input.trim() === '') {
        toast.error('Please enter a sentence');
        return;
      }

      setIsLoading(true);
      setIsOpen(true);

      const response = await axios.post(`/api/translations`, {
        type: activeGroup!.language,
        sentence: input,
      });
      const translationsData = response.data;
      setTranslations(translationsData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userTranslationsList = async () => {
    if (!user || !activeGroup) {
      return;
    }

    try {
      const response = await getUserTranslations(user!.$id, activeGroup!.id);
      setTranslationsList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (translationId: string) => {
    try {
      await deleteTranslation(translationId);
      toast.success('Successfully deleted.');

      setTranslationsList((prevTranslations) =>
        prevTranslations.filter((translation) => translation.id !== translationId)
      );
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  useEffect(() => {
    userTranslationsList();
    if (activeGroup) {
      setisGroupModalOpen(false);
    } else {
      setisGroupModalOpen(true);
    }
  }, [user, activeGroup]);

  return (
    <div className="mx-auto p-5 max-w-4xl">
      <Toaster/>
      <div className="mt-8 text-center justify-center items-center space-y-4">
        <div className="flex gap-2 items-center font-bold text-xl">
          <label>
            <BsTranslate size={20}/>
          </label>
          Translate
        </div>
        <Textbox input={input} handleInput={handleInput}/>
        <Button label="Lingosta" onClick={handleTranslate}/>
      </div>
      {translationsList && (
        <PrevTranslationsList
          translationsList={translationsList}
          setSelectedTranslation={setSelectedTranslation}
          setIsViewOnlyOpen={setIsViewOnlyOpen}
          handleDelete={handleDelete}
        />
      )}
      {!isOpen ? null : (
        <TranslateModal
          isLoading={isLoading}
          handleSave={handleSave}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          input={input}
          translations={translations}
        />
      )}
      {!isViewOnlyOpen ? null : (
        <ViewOnly
          isLoading={isLoading}
          isViewOnlyOpen={isViewOnlyOpen}
          setIsViewOnlyOpen={setIsViewOnlyOpen}
          translations={selectedTranslation}
        />
      )}
      {!activeGroup && isGroupModalOpen && (
        <GroupModal isOpen={isGroupModalOpen} closeModal={() => {}}/>
      )}
    </div>
  );
};

export default TranslateContainer;
