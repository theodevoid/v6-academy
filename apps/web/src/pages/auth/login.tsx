import Link from 'next/link';

import { UserLoginForm } from '~/features/auth/components';

const LoginPage = () => {
  return (
    <>
      <main className="container flex flex-col items-center justify-center text-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/auth/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
