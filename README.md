# Global Nomad

여행자들을 위한 글로벌 커뮤니티 플랫폼입니다.

## 기술 스택

- Frontend
  - Next.js 15 (App Router)
  - TypeScript
  - TailwindCSS
  - TanStack Query
  - Zustand

## 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- npm 9.6.7 이상

### 설치

```bash
# 저장소 복제
git clone [repository-url]

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

````

### 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: 린트 체크
- `npm run test`: 테스트 실행
- `npm run test:watch`: 테스트 감시 모드
- `npm run test:coverage`: 테스트 커버리지 리포트
- `npm run format`: 코드 포맷팅

## 프로젝트 구조

```
src/
├── app/               # Next.js 페이지 및 레이아웃
├── components/        # 재사용 가능한 컴포넌트
├── styles/           # 글로벌 스타일
├── lib/              # 유틸리티 함수
├── api/              # API 관련 함수
├── hooks/            # 커스텀 훅
├── providers/        # 리액트 컨텍스트 프로바이더
└── store/            # Zustand 스토어
```

## 테스트

Jest와 React Testing Library를 사용하여 테스트를 작성합니다.

```bash
# 전체 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 컨벤션

- 코드 포맷팅: Prettier
- 린팅: ESLint
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

```
````
