'use client'
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../../../providers/UserProvider';
import Input from '../../../components/Input';
import InfoModal from '../../../components/InfoModal';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../../constants';

const SignUp = () => {
  const { signup } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');
  const [infoModalContent, setInfoModalContent] = useState('');

  const handleSignup = (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    signup(email, password, name);
  };

  const setShowTermsAndConditionsModal = () => {
    setInfoModalTitle('Terms and Conditions');
    setInfoModalContent(TERMS_AND_CONDITIONS);
    setShowInfoModal(true);
  };

  const setShowPrivacyPolicyModal = () => {
    setInfoModalTitle('Privacy Policy');
    setInfoModalContent(PRIVACY_POLICY);
    setShowInfoModal(true);
  };

  return (
    <div>
      <div className="my-10 text-xl w-full text-center max-w-2xl mx-auto">
        Get started with Lingosta.
      </div>
      <div className="mt-5 px-6 md:p-0 flex max-w-lg mx-auto">
        <div className="flex-grow flex flex-col justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl">
          <form onSubmit={handleSignup} className="space-y-2">
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required={true}
              label="Name *"
            />
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              label="Email *"
            />
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              label="Password *"
            />
            <p className="text-xs text-gray-500">
              Make sure it&apos;s at least 8 characters.
            </p>
            <button
              type="submit"
              className="mx-auto mt-4 py-2 w-full font-semibold rounded-lg bg-teal-500 text-white border hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create account
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up for Lingosta, you confirm that you have read, understood, and agreed to our{' '}
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="#"
              onClick={() => setShowPrivacyPolicyModal()}
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="#"
              onClick={() => setShowTermsAndConditionsModal()}
            >
              Terms and Conditions
            </a>
            .
          </p>
        </div>
      </div>
      <div className="mt-5 px-6 md:p-0 flex max-w-lg mx-auto">
        <div className="flex-grow flex flex-col text-center justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl">
          <p className="">
            Already have an account?{' '}
            <Link href="/login" className="cursor-pointer text-teal-500 hover:underline">
              Login.
            </Link>
          </p>
        </div>
      </div>
      <InfoModal
        isOpen={showInfoModal}
        closeModal={() => setShowInfoModal(false)}
        modalTitle={infoModalTitle}
        modalContent={infoModalContent}
      />
    </div>
  );
};

export default SignUp;
