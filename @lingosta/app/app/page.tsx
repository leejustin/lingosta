'use client';

import Link from "next/link"
import { useUser } from "../providers/UserProvider"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const { user } = useUser();
  const router = useRouter();

  if(user) { 
    router.push('/translate');
  }

  return (
    <div className="mx-auto p-5">
      <div className="mx-auto w-full py-8 max-w-4xl text-center justify-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-normal text-gray-900">
            Lingosta - Language Learning
          </h1>
          <button className="py-4 px-6 rounded-3xl text-white bg-teal-500 hover:bg-teal-600 transition">
            <Link href='/signup'>
              Start Learning
            </Link>        
          </button>
        </div>
        {/* Section 1 */}
        <div className="mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-left p-4 space-y-4">
            <h2 className="text-3xl font-bold mb-4">AI-Powered Platform for Relevant Language-Learning</h2>
            <p className="leading-relaxed">
              Lingosta is a unique language learning app designed to help you learn languages without relying on speaking or
              listening exercises. Our approach is focused on non-verbal learning techniques, making it easier and more
              engaging for learners of all levels.
            </p>
            <button className="py-2 px-6 rounded-3xl text-white bg-teal-500 hover:bg-teal-600 transition">
              <Link href='/signup'>
                Get Started
              </Link>
            </button>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Image src="/learning.svg" width={1240} height={720} alt='learning' />
          </div>
        </div>
        {/* Section 2  */}
        <div className="mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 p-4">
            <Image src="/world.svg" width={1240} height={720} alt='learning' />
          </div>
          <div className="w-full md:w-1/2 text-left p-4">
            <h2 className="text-xl font-bold mb-4">Translate Sentences and Practice Flash Cards</h2>
            <p className="leading-relaxed">
              With Lingosta, you can easily translate sentences from English into various languages such as Spanish, French,
              German, Italian, Portuguese (Brazilian), Russian, Chinese (Simplified), Japanese, and Korean. The translated words
              are automatically turned into flash cards, providing you with a seamless interface to create flash cards that are
              highly relevant to your language learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
