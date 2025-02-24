/* 문제 3.1 */
/* 사용자의 정보를 관리하는 테이블 */
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 고유키
  name VARCHAR(50) NOT NULL,         -- 사용자 이름                 
  email VARCHAR(50) UNIQUE NOT NULL, -- 사용자 이메일
  rank INT NOT NULL,                 -- 사용자 직급(ex 1: 교사, 2:교감, 3: 교장)
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

/* 문제 3.2 */
SELECT 
  approval_step.id AS step_id,
  approval_step.step AS step_number,
  approval_step.status AS step_status,
  approval_request.id AS request_id,
  approval_request.title AS request_title,
  approval_request.content AS request_content,
  approval_request.status AS request_status,
  user.name AS user_name,
  user.email AS user_email
FROM
  approval_step
INNER JOIN
  approval_request ON approval_step.approval_request_id = approval_request.id
INNER JOIN
  user ON approval_request.user_id = user.id
WHERE
  approval_step.user_id = ? AND approval_step.status = 'WAITING'