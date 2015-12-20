CREATE TABLE analytics(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  country VARCHAR(3),
  device ENUM('DESKTOP', 'MOBILE', 'TABLET'),
  page VARCHAR(1024),
  query VARCHAR(1024),
  clicks DOUBLE,
  impressions DOUBLE,
  ctr DOUBLE,
  position DOUBLE,
  report_from DATE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE locks(
  report_date DATE PRIMARY KEY
);