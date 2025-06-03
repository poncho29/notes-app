import { useNavigate } from "react-router-dom"

import { useAuth } from "../hooks"

interface Props {
  username: string
}

export const Navbar = ({ username }: Props) => {
  const { logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-emerald-600">Note App</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Hola, {username}</span>
              <button onClick={handleLogout} className="btn btn-secondary text-sm">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
