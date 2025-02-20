# Global Nomad

여행자들을 위한 글로벌 커뮤니티 플랫폼입니다.

## 기술 스택

- Frontend

  - Next.js 15 (App Router)
  - TypeScript
  - TailwindCSS
  - TanStack Query
  - Zustand

- 도구 및 배포
  - GitHub (버전 관리 및 협업)
  - ESLint & Prettier (코드 품질 유지)
  - Vercel (배포 및 CI/CD 자동화)

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
├── app/              # Next.js 페이지 및 레이아웃
├── components/       # 재사용 가능한 컴포넌트
├── styles/           # 글로벌 스타일
├── lib/              # 유틸리티 함수
├── services/         # API 관련 함수
├── hooks/            # 커스텀 훅
├── providers/        # 리액트 컨텍스트 프로바이더
├── types/            # 관련 타입
└── store/            # Zustand 스토어
```

## 배포 가이드

본 프로젝트는 **Vercel**을 통해 배포됩니다.

```bash
npm install -g vercel
vercel
```

## 코드 컨벤션

- **네이밍 규칙**

  - `camelCase`: 일반 변수 (`userName`)
  - `UPPER_SNAKE_CASE`: 상수 (`API_URL`)
  - `PascalCase`: 컴포넌트 (`UserProfile`)

- **파일 및 폴더 구조**
  - `kebab-case`: 일반 폴더 및 파일 (`user-profile.js`)
  - `PascalCase`: 컴포넌트 폴더 및 파일 (`UserProfile.jsx`)

## 기여 가이드

### 브랜치 전략

- `main`: 배포 브랜치
- `develop`: 개발 브랜치
- `feature/{기능명}`: 기능 추가 브랜치

### PR 규칙

1. 모든 PR은 `develop` 브랜치로 요청
2. 변경사항 상세 설명 필수
3. 코드 리뷰 후 승인 시 병합

## 테스트

Jest와 React Testing Library를 사용하여 테스트를 작성합니다.

```bash
# 전체 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 문제 해결 (FAQ)

### `npm install` 오류 해결

```bash
rm -rf node_modules package-lock.json
npm install
```

### 개발 서버 실행 오류

- `.env.local` 파일 확인
- `npm run lint` 실행 후 오류 확인

## 컨벤션

- 코드 포맷팅: Prettier
- 린팅: ESLint
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
