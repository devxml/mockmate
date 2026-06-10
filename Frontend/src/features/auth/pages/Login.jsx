import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { AuthLayout, AuthFooterLink } from "../../../components/layout/AuthLayout"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { LoadingScreen } from "../../../components/ui/LoadingScreen"

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate("/")
  }

  if (loading) {
    return <LoadingScreen message="Signing you in..." />
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your interview prep">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
      <AuthFooterLink text="Don't have an account?" linkText="Create one" to="/register" />
    </AuthLayout>
  )
}

export default Login
