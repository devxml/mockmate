import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { AuthLayout, AuthFooterLink } from "../../../components/layout/AuthLayout"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { LoadingScreen } from "../../../components/ui/LoadingScreen"

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return <LoadingScreen message="Creating your account..." />
  }

  return (
    <AuthLayout title="Create account" subtitle="Start preparing for your dream role">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          id="username"
          type="text"
          name="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>
      </form>
      <AuthFooterLink text="Already have an account?" linkText="Sign in" to="/login" />
    </AuthLayout>
  )
}

export default Register
