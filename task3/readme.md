# 문제3 풀이과정

### 여러단계 결재요청 필요 테이블

- user 테이블은 해당 시스템을 사용하는 사용자의 정보를 담고있는 테이블입니다.
사용자는 requester와 approver의 권한을 가질 수 있습니다. 
```sql
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role ENUM('requester', 'approver') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

- approval_request 테이블은 결재 요청의 기본정보를 저장한느 테이블입니다.
결재를 요청한 사용자를 참조하며 '대기중, 승인, 반려' 3가지의 상태를 가질 수 있습니다.
```sql
CREATE TABLE approval_request (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  content VARCHAR(50) NOT NULL,
  status ENUM('WAITING', 'APPROVED', 'REJECTED') DEFAULT 'WAITING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
)
```

- approval_step 테이블은 결재 요청의 각 단계에 대한 정보를 관리합니다.
연관된 결재요청의 기본정보와 승인자를 참조합니다. step에 결재 단계를 저장하고 '대기중, 승인, 반려, 활성화 되지 않음' 4가지의 상태를 가질 수 있습니다.
```sql
CREATE TABLE approval_step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  approval_request_id INT NOT NULL,
  user_id INT NOT NULL,
  step INT NOT NULL,
  status ENUM('WAITING', 'APPROVED', 'REJECTED', 'NOT_ACTIVED'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (approval_request_id) REFERENCES approval_request(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
```


### 결재 요청의 시나리오

1. 결재 요청 생성
- 요청자가 결재 요청을 생성합니다.
- 요청은 approval_request 테이블에 저장되며, 초기 상태는 'WAITING'입니다.

2. 결재 단계 생성
- 각 결재 요청에 대해 단계별 승인자와 순서를 정의합니다.
- 모든 단계의 상태는 기본적으로 'NOT_ACTIVED'로 설정됩니다.
- 단, 첫 번째 단계는 활성화 상태로 시작하며 상태는 'WAITING'입니다.

3. 결재 진행
- 활성화된 단계의 승인자가 결재를 진행합니다.
  - 승인: 해당 단계 상태가 'APPROVED'로 변경됩니다. 다음 단계가 'WAITING'으로 활성화됩니다.
  - 반려: 해당 단계 상태가 'REJECTED'로 변경됩니다. 결재 요청(approval_request) 상태도 'REJECTED'로 설정되며 프로세스가 종료됩니다.

4. 최종 단계
- 모든 결제 단계가 승인(APPROVED)이면 결재 요청의 상태를 승인(APPROVED)으로 변경하며 프로세스가 종료됩니다.
