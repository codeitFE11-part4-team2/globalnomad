import Link from 'next/link';
import Button from '../Button';
import InputItem from './logininputitem';
import Image from 'next/image';

export default function SignInForm() {
  return (
    <div className="flex flex-col gap-[32px]">
      <form className="gap-[32px] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <Button type="submit" color="primary">
          로그인 하기
        </Button>
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이 아니신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-gray-900 text-[16px] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
      <div className="flex gap-[40px] text-xl text-gray-800 font-regular flex justify-center items-center whitespace-nowrap">
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 로그인하기
        <div className="w-[180px] h-[1px] bg-gray-300" />
      </div>
      <div className="flex gap-[16px] flex justify-center items-center ">
        <Image
          src="/icons/logo_google.svg"
          alt="구글 로고"
          width={72}
          height={72}
        />
        <Image
          src="/icons/logo_kakao.svg"
          alt="카카오 로고"
          width={72}
          height={72}
        />
      </div>
    </div>
  );
}
