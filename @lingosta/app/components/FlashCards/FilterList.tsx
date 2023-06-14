import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Highlighter from 'react-highlight-words';
import Button from '../Button';
import { TranslationsContext } from '../../providers/SelectedTranslationsProvider';

const FilterList = ({ translationsList }) => {
  const [selectedTranslations, setSelectedTranslations] = useContext(
    TranslationsContext
  );
  const [checkedTranslations, setCheckedTranslations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (translationsList) {
      setCheckedTranslations(translationsList.map(() => true));
    }
  }, [translationsList]);

  const handleBundleTranslations = () => {
    const selected = translationsList?.filter(
      (_, index) => checkedTranslations[index]
    );
    setSelectedTranslations(selected);

    // TODO: store translations in a provider rather than rely on local storage
    localStorage.setItem('selectedTranslations', JSON.stringify(selected));
    router.push('/practice/cards');
  };

  return (
    <div className="my-4 mx-auto max-w-4xl">
      <div className="max-w-lg items-center flex mx-auto">
        <Button label="Begin practice" onClick={handleBundleTranslations} />
      </div>
      <div className="mt-4 text-lg font-semibold">Select translations to practice:</div>
      <div className="mx-auto grid grid-flow-row gap-4 mt-2">
        {translationsList.map((data, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <div className="flex w-full justify-between shadow-md h-24 p-6 rounded-3xl bg-slate-300">
              <div className="flex items-center">
                <p className="text-md md:text-lg">
                  <Highlighter
                    highlightClassName="bg-teal-400"
                    searchWords={data.terms.map((term) => term.source)}
                    autoEscape={true}
                    textToHighlight={data.rawData}
                  />
                </p>
              </div>
              <span className="text-xs md:text-sm ml-2">
                {new Date(data.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <input
              type="checkbox"
              checked={checkedTranslations[index]}
              onChange={(e) => {
                const newCheckedTranslations = [...checkedTranslations];
                newCheckedTranslations[index] = e.target.checked;
                setCheckedTranslations(newCheckedTranslations);
              }}
              className="w-12 h-6 accent-teal-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
