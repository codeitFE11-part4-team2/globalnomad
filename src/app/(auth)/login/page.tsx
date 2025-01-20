// import Header from '@/components/common/Header';
import Loginform from '../../../components/login/loginform';
import Container from '@/components/login/container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
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
