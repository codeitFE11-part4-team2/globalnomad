import Link from 'next/link';
import Button from '../Button';
import InputItem from '../login/logininputitem';
import Image from 'next/image';

export default function SignUpForm() {
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
          label="닉네임"
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요"
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="8자 이상 입력해 주세요"
        />
        <InputItem
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
        <Button type="submit" color="primary">
          회원가입 하기
        </Button>
      </form>
      <p className="flex gap-[10px] font-medium text-gray-900 text-[16px] mx-auto mt-8px">
        회원이신가요?
        <Link href="/login" aria-label="로그인으로 이동">
          <span className="text-gray-900 text-[16px] font-medium underline">
            로그인하기
          </span>
        </Link>
      </p>
      <div className="flex gap-[40px] text-xl text-gray-800 font-regular flex justify-center items-center whitespace-nowrap">
        <div className="w-[180px] h-[1px] bg-gray-300" />
        SNS 계정으로 회원가입하기
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
