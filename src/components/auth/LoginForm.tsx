'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { BiHide, BiShow } from 'react-icons/bi'
import { useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { loginSchema, LoginSchemaType } from '@/utils/validation'
import { loginUser } from '@/services/authService'

import '@/styles/Login.css';

export default function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {mutate, isError, error, isPending: isLoading} = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
            router.push('/home');
        }
    })

    const onSubmit = (data: LoginSchemaType) => {
        mutate(data);
    }

    return(
      <>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {isError && (
            <p className="error-msg">*{error?.message || 'Login failed'}</p>
          )}
          <div className="website-logo">
            <Image
              src="https://res.cloudinary.com/dvgymshsh/image/upload/v1694350601/music-logo_gykg7f.jpg"
              alt="website logo"
              width={50}
              height={50}
            />
            <p>MusicHub</p>
          </div>

          <div className="input-box">
            <label>Username or Email</label>
            <input
              className="email-user"
              type="text"
              placeholder="Username"
              {...register('username')}
            />
            {errors.username && <p className="error-msg">*{errors.username.message}</p>}
          </div>

          <div className="input-box">
            <label>Password</label>
            <div className="password-container">
              <input
                className="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
              />
              <div
                className="p-icon-container"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <BiShow title="hide password" size={20} />
                ) : (
                  <BiHide title="show password" size={20} />
                )}
              </div>
            </div>
            {errors.password && <p className="error-msg">*{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'logging in...' : 'Login'}
          </button>

          <p className="forgot-password" onClick={() => alert("Sorry buddy, I haven't implemented the feature yet")}>
            Forgot your password?
          </p>
      </form>
      <p className="sign-up-login">
        Don&#39;t have an account?{' '}
        <span onClick={() => router.push('/sign-up')}>Sign up</span>
      </p>
    </>
  )
}