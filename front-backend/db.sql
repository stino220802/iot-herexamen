CREATE TABLE future_proof (
 
 sensor_id INT,
 value INT,
 created_at timestamp DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE lastknown(
 ID INT, 
 name VARCHAR(250), 
 external_ip VARCHAR(250), 
 created_at timestamp DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE user_data (
id VARCHAR(250) NOT NULL, 
username VARCHAR(250) NOT NULL, 
email VARCHAR(250),
password CHAR(60), 
admin TINYINT(1) default 0
	
); 
