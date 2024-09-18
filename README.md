# moim (모임)

## Introduce

> 밤 8시, 문득 선선해진 날씨에 가을 바람을 맞으며 잠깐 한강에서 자전거를 타고 싶지만 혼자 타는건 지루하고 장기적인 모임은 부담스럽다면?
> 간단하고 빠르게 모임을 만들고 취미를 즐겨보세요!

Next.js에 대한 관심은 오래전부터 있었고, 이를 통해 다양한 기술을 경험하고 배워보고 싶다는 생각이 있었습니다.
그래서 이번 사이드 프로젝트에서는 단순히 만들어진 API를 가져다 쓰는 것에서 벗어나, Next.js의 강점을 살려 프론트엔드뿐만 아니라 백엔드 로직까지 직접 구현해보자는 결심을 하게 되었습니다.
이를 통해 단순히 화면을 만드는 것 이상의, 작지만 하나의 완성된 프로젝트를 처음부터 끝까지 스스로 만들어가는 과정을 경험하고 싶었습니다.

- 배포 URL: https://moim-nyongho.vercel.app
- 테스트 ID: test@gmail.com
- 테스트 PW: Q1w2e3r4!!

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=nextjs,ts,tailwind,prisma,supabase&theme=light)](https://skillicons.dev)

- Next.js: React를 중심으로 SSR, CSR, SSG, ISR을 필요에 따라 선택적으로 사용할 수 있으며 자체적 시스템을 통해 성능 최적화와 SEO에도 강점을 갖기 때문에 사용했습니다.
- Typescript: 정적 타입을 제공하여 코드의 오류를 런타임 전에 발견할 수 있고 이로인해 코드의 가독성과 유지보수성이 크게 증가하기 때문에 사용했습니다.
- TailwindCSS: Utility-First CSS Framework로, 빠르고 효율적인 스타일링이 가능합니다. 코드가 지저분해보일 수 있지만 스타일 정의를 위해 별도의 CSS 파일을 작성할 필요없이 빠르게 클래스 이름으로 UI를 구축할 수 있다는 것이 더 큰 장점으로 다가왔기에 사용했습니다.
- ShadcnUI: Headless UI로 커스텀이 용이하고 TailwindCSS와 완벽한 호환을 이룹니다. UI의 기능을 제공하지만 아주 기본적인 스타일만 적용되어 있기에 재사용성이 높고 컴포넌트 라이브러리가 아닌, 재사용 가능한 컴포넌트이기에 의존성을 설치할 필요도 없으며 이로인해 번들 사이즈가 크게 줄어드는 효과도 있기에 사용했습니다.
- Prisma: Node.js 환경에서 작동하는 타입 안전 ORM으로, TypeScript와의 궁합이 뛰어납니다. 데이터베이스 스키마를 타입으로 정의하고, 쿼리를 타입 안전하게 작성할 수 있어, 데이터베이스 작업이 훨씬 직관적이고 안전하게 이루어지기에 사용했습니다.
- Supabase: 실시간 채팅 기능을 위해 제공하기 위해 선택했습니다. API Request 횟수에 대한 비용 부담이 없는 것이 주요 선택 요인이었습니다.
- AWS S3: 이미지 업로드와 저장을 위해 선택했습니다. 초기 비용 부담이 적다는 점이 주요 선택 요인이었습니다.

## 🗂️ Folder Structure

```
├── actions
│   ├── chats
│   ├── community
│   ├── create-account
│   ├── gatherings
│   ├── login
│   └── profile
├── app
│   ├── (auth)
│   ├── (tabs)
│   ├── chats
│   ├── gatherings
│   └── user
├── components
│   ├── chats
│   ├── common
│   ├── community
│   ├── create-account
│   ├── gatherings
│   ├── login
│   ├── profile
│   └── ui
├── constants
├── hooks
├── lib
├── prisma
│   └── migrations
├── public
│   ├── assets
│   └── fonts
└── schemas
    ├── community
    ├── create-account
    ├── gatherings
    ├── login
    └── profile
```

## 🌴 Features

### [로그인]

- 이메일을 통한 로그인
- Google 및 Github OAuth 로그인 지원
- 이메일 회원가입

|                                                  이메일                                                   |                                                OAuth                                                 |                                             회원 가입                                              |
| :-------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| ![이메일 로그인](https://github.com/user-attachments/assets/e0364cd4-486d-4225-bc6b-365e27374788) | ![OAuth 로그인](https://github.com/user-attachments/assets/52e74f13-a787-4455-999a-1c80a8c0e851) | ![회원가입](https://github.com/user-attachments/assets/3f8f2ee7-8489-4696-8cb4-adcd86757623) |

### [홈]

- 모임 게시물 읽기 및 작성
- 모임 참가 기능 (다음의 경우 참가 불가):
  - 모집 완료 시
  - 방장이 모집 중지 시
  - 모임 시간 만료 시
  - 이미 참가한 경우
- 모임장과 1:1 채팅 가능
- 모임 멤버 확인 가능
- Parallel Routes와 Intercepting Routes를 활용한 공유 가능한 모달 구현

![홈](https://github.com/user-attachments/assets/f908e9c1-c7b7-4ef5-942b-a5d2e816e449)

### [커뮤니티]

- 커뮤니티 게시물 읽기, 작성, 수정, 삭제
- 좋아요 및 댓글 기능
  - 낙관적 업데이트 적용 (useOptimistic)
  - 작성자일 경우 삭제 가능

|                                                   작성                                                    |                                                      수정 & 삭제                                                      |                                          좋아요 & 댓글                                           |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| ![커뮤니티 작성](https://github.com/user-attachments/assets/20abc6ad-ae3a-4397-967f-8dfa00751ec6) | ![커뮤니티 수정 및 삭제](https://github.com/user-attachments/assets/b18e197e-f632-4f16-9d04-bc34b1c4dc55) | ![커뮤니티](https://github.com/user-attachments/assets/a4e50b16-5d75-409c-81dd-7b4c25bdef07) |

### [채팅]

![채팅 실시간 읽음 기능](https://github.com/user-attachments/assets/166c7840-72fd-48ad-8183-b0f848060429)

- 실시간 1:1 채팅
  - 실시간 읽음 확인 기능

### [마이페이지]

![마이페이지](https://github.com/user-attachments/assets/60875706-c1ef-4ff1-9662-541bf21fa61b)

- 참가한 모임 리스트 (방장일 경우 모임 수정 및 삭제 가능)
- 작성한 커뮤니티 글 리스트
- 프로필 사진 및 닉네임 변경
- 비밀번호 변경
- 로그아웃

### [유저 프로필]

![유저 프로필](https://github.com/user-attachments/assets/e31acd03-7d8c-4d21-82d2-2ca3f86421a6)

- 참가한 모임 리스트
- 작성한 커뮤니티 글 리스트

# Related Posts

- [Supabase의 실시간 채팅에서 읽음 기능을 구현한 과정](https://nyongho.com/blog/supabase-realtime-chat-read-receipts)
- [Next.js에서 인스타그램과 같은 모달을 구현해보자](https://nyongho.com/blog/nextjs-instagram-style-modal)
- [Link 컴포넌트는 일단 쓰는게 좋겠지?](https://nyongho.com/blog/should-i-use-link-component)
