import React, { useState, useEffect} from 'react'
import { useUser } from '../../providers/UserProvider'
import { useGroup } from '../../providers/GroupProvider';
import { getUserTranslations } from '../../helpers/TranslationHelper';
import FilterList from './FilterList';

const PracticeContainer = () => {

  const { user } = useUser();
  const { activeGroup } = useGroup();

  const [translationsList, setTranslationsList] = useState([]);

  const userTranslationsList = async() => {
    if(!user && !activeGroup) {
        return
    }
    
    try {
        const response = await getUserTranslations(user.$id, activeGroup.id)
        setTranslationsList(response);
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
      userTranslationsList();
  }, [user, activeGroup])


    return (
      <div>
        <FilterList translationsList={translationsList}/>
      </div>
    )
}

export default PracticeContainer