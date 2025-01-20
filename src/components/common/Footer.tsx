import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 w-full">
      {/* 상단 푸터 */}
      <div className="w-full h-[120px] bg-white mx-auto" />

      {/* 하단 푸터 */}
      <div className="flex flex-col items-center bg-nomad-black h-[160px] px-[104px] pt-[32px] pb-[64px]">
        <div className="w-[1200px] flex justify-between items-start text-lg">
          <div className="text-[#676767] text-lg font-regular leading-[18px] text-center">
            ©codeit - 2023
          </div>
          <div className="flex gap-[30px]">
            <Link
              href="/privacy-policy"
              className="text-[#676767] text-lg font-regular leading-[18px] hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/faq"
              className="text-[#676767] text-lg font-regular leading-[18px] hover:underline"
            >
              FAQ
            </Link>
          </div>

          <div className="flex space-x-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Image
                src="/icons/icon-facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Image
                src="/icons/icon-twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <Image
                src="/icons/icon-youtube.svg"
                alt="YouTube"
                width={20}
                height={20}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Image
                src="/icons/icon-instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="hover:opacity-80"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
