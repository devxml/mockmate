import { Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { LoadingScreen } from "../../../components/ui/LoadingScreen"

const Protected = ({ children }) => {
  const { loading, user } = useAuth()

  if (loading) {
    return <LoadingScreen message="Loading your workspace..." />
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default Protected
