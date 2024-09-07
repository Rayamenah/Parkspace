'use client'
import { useFormLogin } from '@parkspace/forms/src/login'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormLogin()

  const router = useRouter()
  const session = useSession()

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        if (session?.data) {
          router.push('/')
          toast('already signed in.')
          return
        }

        const result = await signIn('credentials', {
          email,
          password,
          redirects: false,
          callbackUrl: '/',
        })
        if (result?.ok) {
          reset()
          router.push('/')
          toast('signed in')
        }
        if (result?.error) {
          toast('login failed try again.')
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput type="email" {...register('email')} placeholder="email" />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          {...register('password')}
          placeholder="password"
        />
      </HtmlLabel>
      <Button type="submit">Submit</Button>
      <div className="mt-4 text-sm">
        Do not have a parkspace account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>
      </div>
    </Form>
  )
}
