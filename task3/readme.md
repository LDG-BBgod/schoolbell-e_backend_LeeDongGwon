# 문제3 풀이과정

## 3.1

### 여러단계 결재요청 필요 테이블

<br>

- user 사용자 정보를 저장하며 고유 ID, 이름, 이메일, 직급 등을 포함합니다.

```sql
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 고유키
  name VARCHAR(50) NOT NULL,         -- 사용자 이름
  email VARCHAR(50) UNIQUE NOT NULL, -- 사용자 이메일
  rank INT NOT NULL,                 -- 사용자 직급(ex 1: 교사, 2:교감, 3: 교장)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- 생성 시간
)
```

<br>

- approval_request 테이블은 결재 요청의 기본정보를 저장한는 테이블입니다.
  결재를 요청한 사용자를 참조하며 "대기중, 승인, 반려" 3가지의 상태를 가질 수 있습니다.

```sql
CREATE TABLE approval_request (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 고유키
  user_id INT NOT NULL,               -- 결재를 요청한 사용자 고유키
  title VARCHAR(50) NOT NULL,         -- 요청한 결재 제목
  content VARCHAR(50) NOT NULL,       -- 요청한 결재 내용
  status ENUM('WAITING', 'APPROVED', 'REJECTED') DEFAULT 'WAITING', -- 요청 상태
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성시간
  FOREIGN KEY (user_id) REFERENCES user(id)
)
```

<br>

- approval_step 테이블은 결재 요청의 각 단계에 대한 정보를 관리합니다.
  연관된 결재요청의 기본정보와 승인할 사용자를 참조합니다. step에 결재 단계를 저장하고 '대기중, 승인, 반려, 활성화 되지 않음' 4가지의 상태를 가질 수 있습니다.

```sql
CREATE TABLE approval_step (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 고유키
  approval_request_id INT NOT NULL,   -- 연관된 결재요청 고유키
  user_id INT NOT NULL,               -- 승인자 고유키
  step INT NOT NULL,                  -- 결재 단계
  status ENUM('WAITING', 'APPROVED', 'REJECTED', 'NOT_ACTIVED') DEFAULT 'NOT_ACTIVED',  -- 결재 상태
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성시간
  FOREIGN KEY (approval_request_id) REFERENCES approval_request(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
```

### 결재 요청의 시나리오

1. 결재 요청 생성

  - 사용자가 결재 요청을 생성합니다.
  - 요청은 approval_request 테이블에 저장되며, 초기 상태는 'WAITING'입니다.

<br>

2. 결재 단계 생성

  - 결재 요청에 대해 각 단계별 승인자와 순서를 정의합니다.
  - 모든 단계의 상태는 기본적으로 'NOT_ACTIVED'로 설정됩니다.
  - 단, 첫 번째 단계는 활성화 상태로 시작하며 상태는 'WAITING'입니다.

<br>

3. 결재 진행

  - 활성화된 단계의 승인자가 결재를 진행합니다.
    - 승인: 해당 단계 상태가 'APPROVED'로 변경됩니다. 다음 단계가 'WAITING'으로 활성화됩니다.
    - 반려: 해당 단계 상태가 'REJECTED'로 변경됩니다. 결재 요청(approval_request) 상태도 'REJECTED'로 설정되며 프로세스가 종료됩니다.

<br>

4. 최종 단계

  - 모든 결제 단계가 승인(APPROVED)이면 결재 요청의 상태를 승인(APPROVED)으로 변경하며 프로세스가 종료됩니다.

## 3.2

<br>

- 승인자가 처리해야 할 결재 건은 approval_step 테이블에 user_id를 통해 조회할 수 있습니다.
- 결재 건 조회시 결재건에 대한 정보와 요청자의 정보또한 함께 나열하기 위하여 결재 요청의 정보가 담겨있는 approval_request 테이블과 결재를 요청한 사용자의 정보가 담겨있는 user 테이블을 JOIN하여 함께 나열하였습니다. 
- 시나리오상에서 결재 단계의 상태가 NOT_ACTIVED 이면 아직 결재를 할 수 없는 단계이기 때문에 WHERE절에서 상태가 WAITING인 결재건만 가져오도록 하였습니다.