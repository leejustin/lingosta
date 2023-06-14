import React, { useState, useEffect } from 'react';
import { useUser } from '../../providers/UserProvider';
import { useGroup } from '../../providers/GroupProvider';
import { getUserTranslations } from '../../helpers/TranslationHelper';
import FilterList from './FilterList';

const PracticeContainer = () => {
  const { user } = useUser();
  const { activeGroup } = useGroup();

  const [translationsList, setTranslationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserTranslations = async () => {
    if (!user || !activeGroup) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await getUserTranslations(user.$id, activeGroup.id);
      setTranslationsList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTranslations();
  }, [user, activeGroup]);


  if(isLoading) {
    return (
      <div className='px-12 animate-pulse mx-auto items-center text-center py-8 font-bold text-xl'>
        Loading...
    </div>
    )
  }

  if(translationsList.length===0) {
    return (
      <div className='px-12 mx-auto items-center text-center py-8 font-bold text-lg'>
        There are currently no translations to practice for this group.
      </div>
    )
  }

  return (
    <div className='px-5'>
      <FilterList translationsList={translationsList} />
    </div>
  );
};

export default PracticeContainer;
