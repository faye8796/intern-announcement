// 배정 공지 페이지 메인 애플리케이션
const AnnouncementApp = {
    // Supabase 클라이언트
    supabase: null,
    
    // 현재 사용자 정보
    currentUser: null,

    // 초기화
    async init() {
        console.log('🚀 Announcement App 초기화 중...');
        
        // Supabase 클라이언트 초기화
        await this.initSupabase();
        
        // 이벤트 리스너 설정
        this.setupEventListeners();
        
        // 초기 페이지 설정
        this.showPage('loginPage');
        
        console.log('✅ Announcement App 초기화 완료');
    },

    // Supabase 클라이언트 초기화
    async initSupabase() {
        try {
            if (!window.supabase || !CONFIG.SUPABASE.URL || !CONFIG.SUPABASE.ANON_KEY) {
                throw new Error('Supabase 설정이 올바르지 않습니다.');
            }
            
            this.supabase = window.supabase.createClient(
                CONFIG.SUPABASE.URL,
                CONFIG.SUPABASE.ANON_KEY
            );
            
            console.log('✅ Supabase 클라이언트 초기화 완료');
        } catch (error) {
            console.error('❌ Supabase 초기화 실패:', error);
            this.showError('시스템 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    },

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 로그인 버튼
        const loginBtn = document.getElementById('studentLoginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.handleLogin());
        }

        // Enter 키 이벤트
        const nameInput = document.getElementById('studentName');
        const birthInput = document.getElementById('studentBirth');
        
        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
        }
        
        if (birthInput) {
            birthInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleLogin();
            });
        }

        // 다시 시도하기 버튼
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.goBack());
        }
    },

    // 로그인 처리
    async handleLogin() {
        const nameInput = document.getElementById('studentName');
        const birthInput = document.getElementById('studentBirth');
        const loginBtn = document.getElementById('studentLoginBtn');

        if (!nameInput || !birthInput || !loginBtn) {
            console.error('필수 요소를 찾을 수 없습니다.');
            return;
        }

        const name = nameInput.value.trim();
        const birthDate = birthInput.value;

        // 입력 검증
        if (!name) {
            alert('이름을 입력해주세요.');
            nameInput.focus();
            return;
        }

        if (!birthDate) {
            alert('생년월일을 선택해주세요.');
            birthInput.focus();
            return;
        }

        // 로딩 상태 표시
        this.showLoading(true);
        loginBtn.disabled = true;

        try {
            // 학생 정보 조회
            const student = await this.findStudent(name, birthDate);
            
            if (student) {
                this.currentUser = student;
                this.showResult(student);
            } else {
                this.showError('입력하신 정보와 일치하는 배정 내역이 없습니다.<br>이름과 생년월일을 다시 확인해주세요.');
            }
        } catch (error) {
            console.error('로그인 처리 중 오류:', error);
            this.showError('정보를 확인하는 중 오류가 발생했습니다.<br>잠시 후 다시 시도해주세요.');
        } finally {
            this.showLoading(false);
            loginBtn.disabled = false;
        }
    },

    // 학생 정보 조회
    async findStudent(name, birthDate) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
            }

            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('name', name)
                .eq('birth_date', birthDate)
                .eq('user_type', 'student')
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // 데이터가 없는 경우
                    return null;
                }
                throw error;
            }

            return data;
        } catch (error) {
            console.error('학생 정보 조회 오류:', error);
            throw error;
        }
    },

    // 결과 페이지 표시
    showResult(student) {
        // 학생 정보 표시
        const studentNameEl = document.getElementById('studentNameDisplay');
        const instituteNameEl = document.getElementById('instituteNameDisplay');
        const fieldEl = document.getElementById('fieldDisplay');

        if (studentNameEl) {
            studentNameEl.textContent = student.name;
        }

        if (instituteNameEl) {
            instituteNameEl.textContent = student.sejong_institute || '세종학당';
        }

        if (fieldEl) {
            fieldEl.textContent = student.field || '전문분야';
        }

        // 결과 페이지로 이동
        this.showPage('resultPage');

        // 입력 필드 초기화
        this.clearForm();
    },

    // 오류 페이지 표시
    showError(message) {
        const errorMessageEl = document.getElementById('errorMessage');
        if (errorMessageEl) {
            errorMessageEl.innerHTML = message;
        }
        
        this.showPage('errorPage');
        this.clearForm();
    },

    // 페이지 전환
    showPage(pageId) {
        // 모든 페이지 숨기기
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // 지정된 페이지 표시
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        console.log('페이지 전환:', pageId);
    },

    // 뒤로 가기
    goBack() {
        this.currentUser = null;
        this.showPage('loginPage');
        
        // 첫 번째 입력 필드에 포커스
        setTimeout(() => {
            const nameInput = document.getElementById('studentName');
            if (nameInput) {
                nameInput.focus();
            }
        }, 100);
    },

    // 폼 초기화
    clearForm() {
        const nameInput = document.getElementById('studentName');
        const birthInput = document.getElementById('studentBirth');

        if (nameInput) nameInput.value = '';
        if (birthInput) birthInput.value = '';
    },

    // 로딩 표시/숨김
    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            if (show) {
                loadingOverlay.classList.add('show');
            } else {
                loadingOverlay.classList.remove('show');
            }
        }
    },

    // 유틸리티: 날짜 포맷팅
    formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 유틸리티: 알림 표시
    showAlert(message) {
        alert(message);
    },

    // 디버그 정보 출력
    debug() {
        if (CONFIG.DEV.DEBUG) {
            console.log('🔍 Debug Info:', {
                currentUser: this.currentUser,
                supabaseConnected: !!this.supabase,
                config: CONFIG
            });
        }
    }
};

// DOM 로드 완료 후 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    AnnouncementApp.init();
    
    // 개발 모드에서 전역 접근 허용
    if (CONFIG.DEV.DEBUG) {
        window.AnnouncementApp = AnnouncementApp;
        console.log('💡 개발 모드: window.AnnouncementApp으로 접근 가능');
    }
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    // 필요한 경우 정리 작업 수행
    console.log('페이지 언로드');
});