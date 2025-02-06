import Image from 'next/image';

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image
        src="/images/logo-big.png"
        alt="로딩 중..."
        width={100}
        height={100}
        className="animate-spin"
      />
    </div>
  );
}
