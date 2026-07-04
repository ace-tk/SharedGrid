CREATE TABLE IF NOT EXISTS blocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  row_index INT NOT NULL,
  col_index INT NOT NULL,
  owner_name VARCHAR(100) NULL,
  owner_color VARCHAR(20) NULL,
  claimed BOOLEAN NOT NULL DEFAULT FALSE,
  claimed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_row_col (row_index, col_index),
  INDEX idx_claimed (claimed)
);
