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
        addClassName="max-w-[640px] w-full mx-auto mt-[25px]
        sm:aspect-[350/885] sm:max-w-[350px] sm:max-h-[885px] 
        md:aspect-[640/1003] md:max-w-[640px] md:max-h-[1003px]  
        lg:aspect-[640/1019] lg:max-w-[640px] lg:max-h-[1019px]  
        "
      >
        <div
          className="flex flex-col gap-[30px]
        sm:gap-[40px] sm:w-[350px] sm:max-h-[707px]
        md:gap-[48px] md:w-[640px] md:max-h-[771px]
        lg:gap-[48px] lg:w-[640px] lg:max-h-[771px]
        "
        >
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/logo_big.svg"
              alt="노마드 로고"
              width={270}
              height={154}
              className="block mx-auto 
              md:w-[340px] md:h-[192px]"
            />
          </Link>
          <Signupform />
        </div>
      </Container>
    </div>
  );
}
