-- Create users table
CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password TEXT NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);



-- create feedback table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username)
);






INSERT INTO users (username, password, email, first_name, last_name)
VALUES
('user1', 'password1', 'user1@example.com', 'John', 'Doe'),
('user22', 'password22', 'user22@example.com', 'Janes', 'Does'),
('user33', 'password33', 'user32@example.com', 'Bobs', 'Smiths'),
('user4', 'password4', 'user4@example.com', 'Alice', 'Johnson'),
('user5', 'password5', 'user5@example.com', 'David', 'Lee'),
('user6', 'password6', 'user6@example.com', 'Emily', 'Chen'),
('user7', 'password7', 'user7@example.com', 'Steven', 'Kim'),
('user8', 'password8', 'user8@example.com', 'Karen', 'Ng'),
('user9', 'password9', 'user9@example.com', 'Ryan', 'Wu'),
('user10', 'password10', 'user10@example.com', 'Olivia', 'Tan');

INSERT INTO feedback (title, content, username)
VALUES
('Great job!', 'I really appreciate your hard work on this project.', 'user1'),
('Thank you!', 'I had a great experience using your service.', 'user1'),
('Amazing!', 'I cannot believe how well this product works. Thank you!', 'user2'),
('Highly recommend', 'I highly recommend this company for anyone looking for quality products.', 'user3'),
('Fantastic', 'Your team did a fantastic job on this project. Thank you!', 'user4'),
('Great communication', 'I really appreciate the communication throughout this process.', 'user5'),
('Excellent service', 'Your team provided excellent service throughout this entire process. Thank you!', 'user6'),
('Impressed', 'I am extremely impressed with the work that your team did.', 'user7'),
('Good job', 'Good job on the project. Keep up the good work!', 'user8'),
('Thanks', 'Thanks for all of your hard work on this. It is greatly appreciated.', 'user9'),
('Well done', 'Well done on the project. It looks great!', 'user10'),
('Awesome work', 'I am blown away by the work that your team did. It is truly awesome.', 'user2'),
('Very happy', 'I am very happy with the product that I received from your company. Thank you!', 'user3'),
('Excellent job', 'Your team did an excellent job on this project. I am very happy with the result.', 'user5'),
('Thank you so much', 'Thank you so much for all of your hard work. It really paid off!', 'user7'),
('Incredible', 'The work that your team did on this project is incredible. Thank you!', 'user9'),
('Great experience', 'I had a great experience using your service. Thank you!', 'user2'),
('Amazing job', 'Your team did an amazing job on this project. Thank you!', 'user4'),
('Excellent work', 'Excellent work on the project. I am very impressed!', 'user6'),
('Very impressed', 'I am very impressed with the work that your team did. Thank you!', 'user8'),
('Well executed', 'The project was well executed. Thank you for all of your hard work!', 'user10'),
('Thanks so much', 'Thanks so much for all of your hard work on this project. It is greatly appreciated.', 'user1'),
('Great job as always', 'Your team did a great job as always. Thank you!', 'user3'),
('Exceptional', 'The work that your team did on this project is exceptional);