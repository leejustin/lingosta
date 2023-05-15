'use client'
import useUser from "../hooks/useUser"

export default function Home() {

  const { user, logout } = useUser();


  return (
    <div>
      {user && (
        <div className="flex justify-between">
          hello {user.email}
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  )
}
