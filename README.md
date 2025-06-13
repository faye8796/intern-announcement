# 세종학당 문화인턴 배정 공지 페이지

![세종학당](https://img.shields.io/badge/세종학당-문화인턴-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

세종학당 문화인턴들의 파견 학당 배정 결과를 확인할 수 있는 임시 공지 페이지입니다.

## 🚀 주요 기능

- **학생 로그인**: 이름과 생년월일로 간단한 인증
- **배정 결과 확인**: 파견될 세종학당과 전문분야 정보 표시
- **직관적인 UI**: 깔끔하고 사용하기 쉬운 인터페이스
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **인쇄 기능**: 배정 결과를 인쇄 가능

## 📋 사용 방법

### 1. 접속
브라우저에서 페이지에 접속합니다.

### 2. 정보 입력
- **이름**: 등록된 이름을 정확히 입력
- **생년월일**: 등록된 생년월일을 선택

### 3. 배정 결과 확인
"배정 결과 확인" 버튼을 클릭하면 배정된 세종학당 정보가 표시됩니다.

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide Icons
- **Styling**: CSS Grid, Flexbox, CSS Variables

## 📁 프로젝트 구조

```
intern-announcement/
├── index.html          # 메인 HTML 파일
├── css/
│   └── main.css        # 스타일시트
├── js/
│   ├── config.js       # 설정 파일
│   └── app.js          # 메인 애플리케이션 로직
└── README.md
```

## 🗄️ 데이터베이스 구조

이 애플리케이션은 기존 교구 신청 시스템의 `user_profiles` 테이블을 사용합니다:

```sql
user_profiles (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE,
    sejong_institute VARCHAR(100),
    field VARCHAR(50),
    user_type VARCHAR(20) -- 'student'
)
```

## 🔧 설정

### Supabase 연결
`js/config.js` 파일에서 Supabase 연결 정보를 설정합니다:

```javascript
const CONFIG = {
    SUPABASE: {
        URL: 'your-supabase-url',
        ANON_KEY: 'your-anon-key'
    }
};
```

## 🚦 로컬 개발

### 1. 파일 다운로드
```bash
git clone https://github.com/faye8796/intern-announcement.git
cd intern-announcement
```

### 2. 로컬 서버 실행
```bash
# Python을 사용하는 경우
python -m http.server 8000

# Node.js를 사용하는 경우
npx serve .

# Live Server VS Code 확장프로그램 사용
```

### 3. 브라우저에서 접속
```
http://localhost:8000
```

## 📱 반응형 지원

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

## 🖨️ 인쇄 지원

배정 결과 페이지에서 "인쇄하기" 버튼을 클릭하여 결과를 인쇄할 수 있습니다.
인쇄 시 불필요한 버튼들은 자동으로 숨겨집니다.

## 🔒 보안

- Row Level Security (RLS) 적용
- 학생 정보는 이름과 생년월일로만 조회 가능
- 민감한 정보는 표시하지 않음

## 🐛 문제 해결

### 자주 발생하는 문제

1. **로그인이 안 되는 경우**
   - 이름과 생년월일이 정확한지 확인
   - 등록된 정보와 일치하는지 확인

2. **페이지가 로드되지 않는 경우**
   - 인터넷 연결 상태 확인
   - 브라우저 캐시 삭제 후 재시도

3. **스타일이 깨지는 경우**
   - CSS 파일 경로 확인
   - 브라우저 호환성 확인

## 📞 지원

문제가 발생하거나 질문이 있으시면 관리자에게 문의해주세요.

## 📄 라이선스

이 프로젝트는 세종학당 내부 사용을 위한 것입니다.

---

**🎯 목적**: 세종학당 문화인턴 배정 결과를 쉽고 빠르게 확인할 수 있도록 지원  
**🔗 관련 시스템**: [세종학당 문화교구 신청 플랫폼](https://github.com/faye8796/request)