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
      <div className="mx-auto w-full py-8 text-center justify-center space-y-12">
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
            <Image src="/world.svg" width={1240} height={720} alt='learning' />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg p-6 rounded-3xl text-left space-y-2">
            <h3 className="font-bold text-xl">Translate Sentences and Practice Flash Cards</h3>
            <p className="">
              With Lingosta, you can easily translate sentences from English into various languages such as Spanish, French,
              German, Italian, Portuguese (Brazilian), Russian, Chinese (Simplified), Japanese, and Korean. The translated words
              are automatically turned into flash cards, providing you with a seamless interface to create flash cards that are
              highly relevant to your language learning journey.
            </p>
            <p>
              Imagine being able to take sentences or text from someone you follow on Instagram and translate those words to
              build your understanding of how to read relevant content. Many language learning approaches focus on formalized
              language instruction, which may not align with the organic language usage found on social media and the internet.
              Lingosta allows you to have control over the type of text and content you want to spend time learning.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-3xl text-left space-y-2">
            <h3 className="font-bold text-xl">Unlock the Power of Context with Relevant Content</h3>
            <p>
              We understand the importance of learning languages in a context that matters to you. Lingosta enables you to
              explore relevant content and tailor your language learning experience accordingly. By learning words and phrases
              in the context of sentences you&apos;ve translated, you gain a deeper understanding of how language is used in real-life
              situations. This approach enhances your language skills and empowers you to engage with authentic written content
              found in social media, blogs, and websites.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-3xl text-left space-y-2">
            <h3 className="font-bold text-xl">Jumble - Match Translations with Drag and Drop</h3>
            <p>
              Beyond flash cards, Lingosta offers an exercise called &quot;Jumble&quot; that utilizes AI-generated sentences based on words you&apos;ve translated.
              In this exercise, you can match translations using a user-friendly drag and drop interface. Jumble enhances your
              comprehension and retention skills as you engage with dynamically created sentences. It&apos;s a fun and effective way
              to reinforce your language learning progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
