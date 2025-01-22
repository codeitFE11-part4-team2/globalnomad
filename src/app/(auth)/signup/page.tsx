// import Header from '@/components/common/Header';
import Signupform from '../../../components/signup/signupform';
import Container from '@/components/login/container';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SignUpPage() {
  return (
    <div>
      <Container
        color="white"
        addClassName="max-w-[640px] w-full mx-auto mt-[25px] "
      >
        <div className="flex flex-col gap-[30px]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/logo_big.svg"
              alt="노마드 로고"
              width={340}
              height={160}
              className="block mx-auto"
            />
          </Link>
          <Signupform />
        </div>
      </Container>
    </div>
  );
}
