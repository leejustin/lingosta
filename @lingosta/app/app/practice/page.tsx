"use client";
import React from 'react';
import { useUser } from '../../providers/UserProvider';
import PracticeContainer from '../../components/Practice/PracticeContainer';

const Practice = () => {
    const { user } = useUser();

    if (!user) {
        return (
          <div className="mt-8 p-5 text-center text-xl font-semibold animate-pulse">
              Loading...
          </div>
        );
    }

    return (
      <div>
          <PracticeContainer />
      </div>
    );
};

export default Practice;
