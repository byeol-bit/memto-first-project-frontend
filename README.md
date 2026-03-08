<div align="center">
  <img src="https://capsule-render.vercel.app/render?type=waving&color=auto&height=200&section=header&text=MEMTO&fontSize=90" />
  
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
  <br>
  <img src="https://img.shields.io/github/stars/byeol-bit/memto-first-project-frontend?style=flat-square">
  <img src="https://img.shields.io/github/issues/byeol-bit/memto-first-project-frontend?style=flat-square">
  <img src="https://img.shields.io/github/last-commit/byeol-bit/memto-first-project-frontend?style=flat-square">
</div>

## 📌 목차
• [개요](#-개요) • [팀원 및 역할](#-팀원-및-역할) • [개발 과정](#-개발-과정) • [성장 및 회고](#-성장-및-회고) • [마무리](#-마무리)

---

## 📖 개요

### 🚀 프로젝트 시작 계기
> "유투브나 블로그 등 영상이나 글을 통해 맛집 정보를 접하는데서 끝나지않고 해당 맛집을 기록해두고싶다."
> "내가 좋아하는 먹방유투버, 인플루언서가 광고가 아닌 실제로 어딜 자주가고 애용하는지 알고싶다."  
`find hiddenMaster`는 맛집고수가 최근에 어딜가고, 평소에 어디를 많이 가는지 알고싶다는 궁금증에서 시작하게 되었습니다.
> 첫 프로젝트인 만큼 신기술, 완벽한 설계보다 다양한 기술사용, 프로젝트 완료를 목표로 했습니다.

### 📅 초기 플랜
- **1차 스프린트(26.01.13~26.01.19:** 선정된 기획서 보강 및 미팅일정, 역할 분배
- **2차 스프린트(26.01.20~26.01.26):** 기초 개발환경 구축, 핵심 UI 목업 제작
- **3~6차 스프린트(26.01.27~26.02.23):** 프론트,백 개발 및 API 연동
- **7차 스프린트(26.02.24~26.03.05):** 에러 수정 및 테스트 반복 수행
  
---

## 👥 팀원 및 역할

| 이름 | 역할 | 담당 부분 |
| :--- | :---: | :--- |
| **강영아** | FE Dev | 맛집목록, 맛집상세 페이지, 피드 페이지, 검색 기능, 좋아요 |
| **양희진** | FE Dev | 고수목록, 고수상세 페이지, 팔로잉,팔로워 페이지, 검색 기능 |
| **서영식** | FE Dev | 마이페이지, 회원가입, 인증 로직 |
| **한재민** | BE Dev | 고수 API, 인증 API, 팔로우,팔로잉 API |
| **장건영** | BE Dev | 맛집 API, 피드 API, 좋아요 API, 방문기록 API |
| **박상선** | FE Dev | 지도 페이지, 경로 표시, 맛집탑5, 랜덤고수, 일정관리 및 프로젝트 취합 |
<img width="717" height="594" alt="image" src="https://github.com/user-attachments/assets/ffb6e379-b156-4371-91eb-9e46560ee95f" />

---

## 📈 성장 및 회고

### 🏆 수행 후 발전 사항
- **박상선:** 카카오맵 API를 활용한 실시간 차량 경로 시각화 및 커스텀 마커 구현 능력을 확보했으며, React 기반 사이드바 구조 설계 역량을 강화했습니다.
- **강영아:** React Query와 Tailwind CSS를 도입하여 무한 스크롤 등 복잡한 기능을 효율적으로 구현하고, 단순한 UI 구현을 넘어 서버와의 통신 및 협업까지 고민할 줄 아는
              FE 개발자로서 한 뼘 더 도약할 수 있었습니다.
- **양희진:** 사용자에게 더 빠른 피드백을 주기위해 낙관적 업데이트(Optimistic Update)방식을 사용한다는 것을 알게되었고, 효율적인 서버 데이터 관리와 팀 소통의 중요성을 체득했습니다.
- **서영식:** 초기 개발 환경 설정의 어려움을 극복하고 프로젝트 구조를 파악하기 시작했으며, AI 의존도를 낮추고 스스로 코드를 분석·수정할 수 있는 수준으로 성장했습니다.

### ⚠️ 아쉬웠던 점
> [!IMPORTANT]
> **박상선** > 도커(Docker) 기반 배포 및 GitHub Actions를 통한 CI/CD 자동화 미적용, 체계적인 문서 및 일정 관리 툴 활용 부족이 아쉬움으로 남습니다.
> **강영아** > 한정된 일정으로 인해 초기 기획 기능을 일부 축소해야 했던 점과 리팩토링 및 테스트 코드 도입 시간을 충분히 확보하지 못한 점이 아쉽습니다.
> **양희진** > 초기 설계 미흡으로 발생한 불필요한 API 요청과 성능 최적화 단계까지 도달하지 못한 점, 그리고 기술 의사 결정 과정의 기록 누락이 아쉽습니다.
> **서영식** > 비전공자로서 초반 기술 이해도가 낮아 팀원들에게 미안함을 느꼈으며, 이 과정에서 겪은 심리적 압박과 스트레스로 인해 체중이 10kg이나 감소할 만큼 힘든 시간을 보냈습니다.
               하지만 이를 계기로 더 단단해진 실력을 갖추고자 노력하고 있습니다.

---

## 🏁 마무리

### 🎯 초기 플랜 이수 확인
- [x] 핵심 기능(MVP) 구현 완료
- [x] 카카오맵 API를 활용한 맛집 이동 경로 시각화
- [x] React Query를 이용한 서버 상태 관리 및 낙관적 업데이트 적용
- [x] Tailwind CSS 기반의 반응형 UI 및 생산성 향상
- [ ] Docker 및 GitHub Action을 활용한 CI/CD 구축 (차기 과제)
- [ ] 전체 코드 리팩토링 및 유닛 테스트 도입 (차기 과제)

**전체적으로 초기 계획의 80% 이상을 성공적으로 이수하였으며, 첫 프로젝트인 만큼 다들 실력이 쌓이기 전인데 기술,환경,소통문제 등 다양한 어려움에 직면했을 때
  팀원들과 소통하며 해결책을 찾아내고 끝까지 완주를 한 과정 자체가 가장 큰 수확이었습니다.**

---
