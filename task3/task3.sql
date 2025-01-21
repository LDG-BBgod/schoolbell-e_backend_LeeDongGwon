/* 사용자의 정보를 관리하는 테이블 */
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 고유키
  name VARCHAR(50) NOT NULL,         -- 사용자 이름                 
  email VARCHAR(50) UNIQUE NOT NULL, -- 사용자 이메일
  role ENUM('requester', 'approver') NOT NULL, -- 사용자 역할
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- 생성 시간
)

/* 결재 요청 정보를 관리하는 테이블 */
CREATE TABLE approval_request (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 고유키
  user_id INT NOT NULL,               -- 결재를 요청한 사용자 고유키
  title VARCHAR(50) NOT NULL,         -- 요청한 결재 제목
  content VARCHAR(50) NOT NULL,       -- 요청한 결재 내용
  status ENUM('WAITING', 'APPROVED', 'REJECTED') DEFAULT 'WAITING', -- 요청 상태
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성시간
  FOREIGN KEY (user_id) REFERENCES user(id)
)

/* 결재 단계별 상태를 관리하는 테이블 */
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
