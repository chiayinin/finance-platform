import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* SignIn */}
      <div className="h-full lg:flex flex-col justify-center items-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl">
            歡迎回來 <strong className="text-indigo-500">好金主 SaaS 平台</strong>
          </h1>
          <p className="text-base">
            登入或註冊帳號，繼續使用好金主 SaaS 儀表板！
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <span className="loader"></span>
          </ClerkLoading>
        </div>
      </div>
      {/* Logo */}
      <div className="h-full bg-indigo-600 hidden lg:flex justify-center items-center">
        <figure>
          <Image src="/logo.svg" width={100} height={100} alt="好金主 Logo" />
        </figure>
      </div>
    </div>
  )
}
