var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var url = require('url')
var d = require('../public/javascripts/createdatevalue')
var template = require('../public/javascripts/template')

/*
var db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
  dateStrings: 'date'
});
*/
var db = mysql.createConnection({
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'bfa4c9d81c03be',
  password: 'ddb07be5',
  database: 'heroku_52c20a3cfded650',
  dateStrings: 'date'
});
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  var queryData = url.parse(req.url, true).query;
  var title = 'MY TO DO LIST';


  db.query('select * from list where TO_DAYS(deadline)-TO_DAYS(curDate()) < 0', function(error, deadres){
    var warn = `
      <div class="createbox"><p>마감된 리스트
      <input type="button" class="hide"></input></p>
      </div>
      <div class="expired">
      `;
    warn = warn + template.BOX(deadres) + `</div>`;

    var body = warn;
    body = body + `
    <div class ="createbox">
      <a href="/create" class="createbutton">새 목록</a>
      <a disabled> - </a>
      <a href="/">최신순</a>
      <a href="/?order=complete">완료된 목록</a>
      <a href="/?order=deadline">마감임박순</a>
      <a href="/?order=priority">우선순위</a>
    </div>
    `;

    var queryString = 'SELECT * FROM list';

    if(queryData.order === 'complete'){ queryString = 'SELECT * FROM list where complete=1'; }
    if(queryData.order === 'deadline'){ queryString = 'SELECT * FROM list where deadline is not null order by TO_DAYS(deadline)-TO_DAYS(curDate())';}
    if(queryData.order === 'priority'){ queryString = 'SELECT * FROM list order by priority';}

    db.query(queryString, function(error, results) {
      if (error) {
        console.log(error);
      }
      var box = template.BOX(results);
      body = body + box;
      res.render('index', { title: title , body: body});
    });
  });

});

router.get('/create', function(req, res) {
  var title = 'CREATE NEW TO DO LIST';
  var list = '';
  var today = d.getToday();
  var inner =
  `
  <form action='/createList' method ="post">
    <div>
      <input type="text" placeholder="title" name="listTitle" maxlength="20" required/>
    </div>
    <div>
      <textarea cols="18" rows="10" placeholder="to do list" name="description" id="text_des"></textarea>
      <p class="data_count"><em id="messagebyte">0</em>/1000 byte</p>
    </div>
    <div>
      <input type="checkbox" id="checkbox">마감기한 추가하기
      <input type="date" name="date" min="${today}" class="date1" disabled/>
    </div>
    <div>
      우선순위
      <select name="priority">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5" selected>5</option>
      </select>
    </div>
    <div style="width:50%; margin:auto;">
      <input type="submit" value="Submit" style="width:100%;">
    </div>
  </form>
  `;
  res.render('index', { title: title , body: inner});
});

router.post('/createList', function(req, res) {

  var listTitle = req.body.listTitle;
  var des = req.body.description;
  var today = d.getToday();
  var deadline = req.body.date;
  var priority = req.body.priority;

  db.query(`SELECT max(id) as maxid FROM list`, function(error, max) {
    db.query(`INSERT INTO list VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [Number(max[0].maxid) + 1, listTitle, des, deadline, today, 0, priority],
      function(error, result) {
        if (error) throw error;
      });
    res.redirect("/");
  });

});

router.get('/update', function(req, res) {
  var queryData = url.parse(req.url, true).query;
  var today = d.getToday();
  var title = 'UPDATE';
  var box = ``;

  db.query(`SELECT * FROM list WHERE id=? `, [queryData.id], function(error, results) {
    if (error) {
      console.log(error);
    }

    box = box +
    `
    <form action='/updateList' method ="post">
      <div>
        <input type="text" placeholder="title" name="listTitle" value="${results[0].title}" required/>
      </div>
      <div>
        <textarea cols="18" rows="10" placeholder="to do list" name="description" id="text_des">${results[0].description}</textarea>
        <p class="data_count"><em id="messagebyte">0</em>/1000 byte</p>
      </div>
      <div>
        <input type="hidden" name="id" value="${results[0].id}">
    `;

    if(results[0].deadline === null){
      box = box +
      `
      <input type="checkbox" id="checkbox">마감기한
      <input type="date" name="date" min="${today}" class="date1" value="${results[0].deadline}" disabled/>
      `;
    }
    else{
      box = box +
      `
      <input type="checkbox" id="checkbox" checked>마감기한
      <input type="date" name="date" min="${today}" class="date1" value="${results[0].deadline}"/>
      `;
    }

    box = box + `
    </div>
    <div>
      우선순위
      <select name="priority">
        <option selected>${results[0].priority}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div style="width:50%; margin:auto;">
      <input type="submit" value="Submit" style="width:100%;">
    </div>
    </form>
    `;

    res.render('index', { title: title , body: box});
  });
});

router.post('/updateList', function(req, res) {
  var listTitle = req.body.listTitle;
  var des = req.body.description;
  var id = req.body.id;
  var deadline = req.body.date;
  var priority =req.body.priority;

  db.query(`UPDATE list SET title=?, description=?, deadline=?, priority=? WHERE id=?`,
    [listTitle, des, deadline, priority, id], function(err, ressult){
    res.redirect("/");
  });
});

router.get('/delete', function(req, res) {
  var queryData = url.parse(req.url, true).query;
  console.log(queryData.id);
  db.query(`DELETE FROM list WHERE id=?`, [queryData.id], function(error, results) {
    if (error) throw error;
    res.redirect("/");
  });
});

router.get('/complete', function(req, res){
  var queryData = url.parse(req.url, true).query;
  db.query(`select * from list where id=?`,[queryData.id], function(error, check){
    var tmp = 0;
    if(check[0].complete === 0) tmp = 1;
    db.query(`UPDATE list SET complete=? WHERE id=?`, [tmp, queryData.id]);
    res.redirect("/");
  });
});

module.exports = router;
