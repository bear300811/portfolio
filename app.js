document.addEventListener('DOMContentLoaded', () => {
  // 1. 타이핑 효과 (Typewriter Effect) 확실한 초기화
  const textElement = document.getElementById('typewriter')
  const textToType = '기본기에 충실하고, 원리를 파고드는 예비 개발자입니다.'
  let typingIndex = 0

  // 페이지 진입 시 이전 텍스트 확실히 날리기
  textElement.innerHTML = ''

  function type() {
    if (typingIndex < textToType.length) {
      textElement.innerHTML += textToType.charAt(typingIndex)
      typingIndex++
      setTimeout(type, 80) // 타이핑 속도 조절
    }
  }
  // 페이지 로드 후 0.5초 뒤 타이핑 시작
  setTimeout(type, 500)

  // 2. 다크 모드 토글
  const darkModeToggle = document.getElementById('darkModeToggle')
  const body = document.body

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme')
    darkModeToggle.textContent = body.classList.contains('dark-theme')
      ? '☀️'
      : '🌙'
  })

  // 3. 스무스 스크롤 (메뉴 클릭)
  const navLinks = document.querySelectorAll('.nav-menu a')
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetSection = document.querySelector(targetId)
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    })
  })

  // 4. 스크롤 감지 (스킬바 애니메이션 무한 반복 & 네비게이션 하이라이트)
  const sections = document.querySelectorAll('section')
  const skillBars = document.querySelectorAll('.bar-fill')

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')

      if (entry.isIntersecting) {
        // 화면에 들어왔을 때
        navLinks.forEach((link) => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${id}`)
            link.classList.add('active')
        })

        if (id === 'skills') {
          skillBars.forEach((bar) => bar.classList.add('animate'))
        }
      } else {
        // 화면에서 벗어났을 때 (다시 들어오면 애니메이션 재생되도록 리셋)
        if (id === 'skills') {
          skillBars.forEach((bar) => bar.classList.remove('animate'))
        }
      }
    })
  }, observerOptions)

  sections.forEach((section) => sectionObserver.observe(section))

  // 5. 프로젝트 카테고리 필터링 (그룹 타이틀 숨김 처리 포함)
  const filterBtns = document.querySelectorAll('.filter-btn')
  const projectItems = document.querySelectorAll('.project-item')
  const projectGroups = document.querySelectorAll('.project-group')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      const filterValue = btn.getAttribute('data-filter')

      // 1. 아이템 필터링
      projectItems.forEach((item) => {
        const category = item.getAttribute('data-category')
        if (filterValue === 'all' || filterValue === category) {
          item.classList.remove('hide')
        } else {
          item.classList.add('hide')
        }
      })

      // 2. 카테고리가 텅 빈 경우 '개인/팀 프로젝트' 타이틀 숨기기
      projectGroups.forEach((group) => {
        const visibleItems = group.querySelectorAll('.project-item:not(.hide)')
        const title = group.querySelector('.project-group-title')
        if (visibleItems.length === 0) {
          title.style.display = 'none'
        } else {
          title.style.display = 'block'
        }
      })
    })
  })

  // 6. 데이터 기반 모달 (팝업) 처리
  const modal = document.getElementById('projectModal')
  const closeBtn = document.querySelector('.close-btn')
  const detailBtns = document.querySelectorAll('.detail-btn')

  const modalTitle = document.getElementById('modalTitle')
  const modalTech = document.getElementById('modalTech')
  const modalDesc = document.getElementById('modalDesc')

  detailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projectItem = e.target.closest('.project-item')

      const title = projectItem.querySelector('h3').innerText
      const tech = projectItem.getAttribute('data-tech')
      const detail = projectItem.getAttribute('data-detail')

      modalTitle.innerText = title
      modalTech.innerText = tech
      modalDesc.innerText = detail

      modal.style.display = 'block'
    })
  })

  closeBtn.addEventListener('click', () => (modal.style.display = 'none'))
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none'
  })
})
