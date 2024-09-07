import { LoginForm } from '@parkspace/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@parkspace/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
