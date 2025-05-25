'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { BiHide, BiShow } from 'react-icons/bi'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { signUpUser } from '@/services/authService'
import { signUpSchema, SignUpSchemaType } from '@/utils/validation'
import Image from 'next/image'

import '@/styles/Login.css';

export default function SignUpForm(){
    const [showPassword, setShowPassword] = useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema)
    });

    const router = useRouter();

    const {mutate, isPending: isLoading, isError, error} = useMutation({
        mutationFn: signUpUser,
        onSuccess: () => {
            reset();
            router.push('/login');
        }
    });

    const onSubmit = (data:SignUpSchemaType) => {
        mutate(data);
    }

    return (
      <>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {isError && <p className="error-msg">*{error?.message}</p>}
    
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
            <p className="input-label">Enter your email</p>
            <input
              className="email-user"
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <p className="error-msg">*{errors.email.message}</p>}
          </div>
    
          <div className="input-box">
            <p className="input-label">Create a username</p>
            <input
              className="email-user"
              type="text"
              placeholder="Username"
              {...register('username')}
            />
            {errors.username && <p className="error-msg">*{errors.username.message}</p>}
          </div>
    
          <div className="input-box">
            <div className="password-heading">
              <p className="input-label">Create a strong password</p>
              <IoMdInformationCircleOutline
                className="i-icon"
                title="Must be at least 8 characters, include 1 capital, 1 lowercase, 1 number, and 1 special character"
              />
            </div>
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
    
          <button type="submit" className="sign-up-btn" disabled={isLoading}>
            {isLoading ? 'signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="sign-up-login">
            Have an account? <span onClick={() => router.push('/login')}>Login</span>
        </p>
      </>
    )
}