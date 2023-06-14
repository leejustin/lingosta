import React, { useState, useEffect } from 'react';
import { useUser } from '../../providers/UserProvider';
import { useGroup } from '../../providers/GroupProvider';
import { getUserTranslations } from '../../helpers/TranslationHelper';
import FilterList from './FilterList';
import Loading from '../Loading';

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
    return <Loading />
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
