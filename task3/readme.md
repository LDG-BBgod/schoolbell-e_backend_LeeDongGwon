# 문제3 풀이과정

```sql
/* 사용자의 정보를 관리하는 테이블 */
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role ENUM('requester, approver, admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

/* 결재 요청 정보를 관리하는 테이블 */
CREATE TABLE approval_request (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  content VARCHAR(50) NOT NULL,
  status ENUM('WAITING', 'APPROVED', 'REJECTED') DEFAULT 'WAITING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
)

/* 결재 단계별 상태를 관리하는 테이블 */
CREATE TABLE approval_step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  approval_request_id INT NOT NULL,
  user_id INT NOT NULL,
  step INT NOT NULL,
  status ENUM('WAITING', 'APPROVED', 'REJECTED', 'NOT_ACTIVED'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES approval_request(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)
```
