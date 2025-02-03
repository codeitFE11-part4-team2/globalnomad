import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../common/Button';
import InputItem from './logininputitem';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';
import Link from 'next/link';
import KakaoLoginButton from './KakoLoginButton';

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<LoginResponse>('auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      login(user, token);

      if (isMounted) {
        router.push('/');
      }
    } catch (err) {
      setError('로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[32px]">
      <form className="gap-[32px] flex flex-col" onSubmit={handleSubmit}>
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="nomad-black"
          size="full"
          disabled={loading}
        >
          {loading ? '로그인 중...' : '로그인 하기'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
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
          src="/icons/icon-logo-google.svg"
          alt="구글 로고"
          width={72}
          height={72}
        />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
