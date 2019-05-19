# todolist 🐳 

Install Node.js and npm
Refer https://nodejs.org/ko/download/ or https://nodejs.org/ko/download/package-manager/

Clone this repository
```
git clone https://github.com/HyeonJaaE/todolist.git
```

Start server and connect http://localhost:3000/
```
npm start
```

if you want use your own datebase in localhost create table 
```
CREATE TABLE `test`.`list` (
  `id` INT NOT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `deadline` DATE NULL DEFAULT NULL,
  `createDate` DATE NULL DEFAULT NULL,
  `complete` TINYINT(4) NULL DEFAULT 0,
  `priority` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));
```

And edit code with your database info in routes/index.js file
```
var db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
  dateStrings: 'date'
});
```

