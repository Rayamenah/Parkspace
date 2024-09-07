import { RegisterForm } from '@parkspace/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@parkspace/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
