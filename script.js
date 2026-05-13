document.addEventListener('DOMContentLoaded', () => {
    const pagination = document.getElementById('pagination');
    const searchForm = document.getElementById('search-form');

    // [1] 페이징 클릭 이벤트 (이벤트 위임 활용)
    pagination.addEventListener('click', (e) => {
        // 클릭된 요소가 a 태그인지 확인
        const target = e.target.closest('.page-link');
        if (!target) return;

        // href="#"에 의한 최상단 스크롤 이동 방지
        e.preventDefault();

        const pageNum = target.getAttribute('data-page');
        if (pageNum) {
            updateURLParams('page', pageNum);
            
            // 시각적인 활성화 상태 변경
            updatePaginationUI(pageNum);
        }
    });

    // [2] 검색 폼 제출 이벤트
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value;
        
        // 검색 시 키워드를 URL에 넣고 페이지는 1로 리셋
        updateURLParams('keyword', keyword);
        updateURLParams('page', 1);
    });

    /**
     * URL의 쿼리 스트링(파라미터)을 업데이트하는 핵심 함수
     */
    function updateURLParams(key, value) {
        const url = new URL(window.location);
        
        if (value && value !== 'next') {
            url.searchParams.set(key, value);
        } else if (value === 'next') {
            // 'next' 클릭 시 현재 페이지 + 1 (예시)
            const current = parseInt(url.searchParams.get('page')) || 1;
            url.searchParams.set('page', current + 1);
        } else {
            url.searchParams.delete(key);
        }

        // 페이지 새로고침 없이 주소창만 변경
        window.history.pushState({}, '', url);

        // 크롤링 연습을 위해 콘솔에 현재 상태 출력
        console.log(`[파라미터 변경] ${key} = ${value}`);
    }

    /**
     * 페이지 번호 UI를 강조 처리
     */
    function updatePaginationUI(currentPage) {
        document.querySelectorAll('.page-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === String(currentPage)) {
                link.classList.add('active');
            }
        });
    }
});
