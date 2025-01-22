'use client';

// import Header from '@/components/common/Header';
import Loginform from '../../../components/login/loginform';
import Container from '@/components/login/container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '@/store';
import { authApi } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login({
        email,
        password,
      });

      console.log('Login response:', response.data);

      const { user, accessToken } = response.data;
      login(user, accessToken);

      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="gray"
        addClassName="max-w-[640px] max-h-[779px] w-full h-auto aspect-[640/779] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-[56px]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/logo_big.svg"
              alt="노마드 로고"
              width={340}
              height={192}
              className="block mx-auto"
            />
          </Link>
          <Loginform />
        </div>
      </Container>
    </div>
  );
}
