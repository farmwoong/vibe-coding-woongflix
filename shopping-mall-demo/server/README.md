# Shopping Mall Server

Node.js + Express + MongoDB API 서버입니다.

## 요구 사항

- Node.js 18+
- MongoDB (로컬 또는 Atlas)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.example을 복사 후 .env 생성)
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# 개발 모드 (파일 변경 시 자동 재시작)
npm run dev

# 프로덕션 실행
npm start
```

## 환경 변수

| 변수 | 설명 | 예시 |
|------|------|------|
| PORT | 서버 포트 | 5000 |
| MONGODB_URI | MongoDB 연결 문자열 | mongodb://localhost:27017/shopping-mall |

MongoDB Atlas 사용 시: `mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/shopping-mall`

## API

- `GET /` - 상태 확인
