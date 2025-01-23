import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'Facebook',
    icon: '/icons/icon-facebook.svg',
    href: 'https://facebook.com',
  },
  {
    name: 'Twitter',
    icon: '/icons/icon-twitter.svg',
    href: 'https://twitter.com',
  },
  {
    name: 'Youtube',
    icon: '/icons/icon-youtube.svg',
    href: 'https://youtube.com',
  },
  {
    name: 'Instagram',
    icon: '/icons/icon-instagram.svg',
    href: 'https://instagram.com',
  },
];

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full">
      {/* 상단 푸터 */}
      <div className="w-full h-[120px] bg-[#FAFBFC] mx-auto" />

      {/* 하단 푸터 */}
      <div className="flex flex-col items-center bg-nomad-black h-[160px] pt-[32px] pb-[64px]">
        <div className=" md:w-[522.11px] w-[290px] lg:w-[1200px] flex flex-col md:flex-row justify-between items-center text-lg gap-6 md:gap-0">
          <div className="flex w-full justify-between md:contents">
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
          </div>
          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
