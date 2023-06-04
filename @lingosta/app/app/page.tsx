'use client';

import Link from "next/link"
import { useUser } from "../providers/UserProvider"
import { useRouter } from "next/navigation";

export default function Home() {

  const { user } = useUser();
  const router = useRouter();

  if(user) { 
    router.push('/translate');
  }

  return (
    <div className="mx-auto p-5">
      <div className="mx-auto w-full mt-8 max-w-2xl text-center justify-center space-y-6">
        <h1 className="text-5xl md:text-5xl font-bold tracking-normal text-gray-900">
          Welcome to Lingosta
        </h1>
        <p className=" text-lg leading-8 text-gray-600">
          Helping you learn a new language more efficiently!
        </p>
        <div className="">
        <button className='p-4 text-xl font-semibold rounded-xl bg-blue-500 text-white border  hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'>
          <Link href='/signup'>
            Get Started
          </Link>
        </button>
        </div>
      </div>
    </div>
  )
}
