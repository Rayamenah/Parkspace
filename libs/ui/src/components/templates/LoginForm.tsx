'use client'
import { useFormLogin } from '@parkspace/forms/src/login'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        const result = await signIn('credentials', {
          email,
          password,
          redirects: false,
        })

        if (result?.ok) {
          replace('/')
        }
        if (result?.error) {
          alert('login failed try again.')
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
          // optional
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
