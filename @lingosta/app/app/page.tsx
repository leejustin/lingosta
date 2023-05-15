'use client'
import useUser from "../hooks/useUser"

export default function Home() {

  const { user } = useUser();


  return (
    <div>
      {user && (
        <div>
          hello {user.name}
        </div>
      )}
    </div>
  )
}
