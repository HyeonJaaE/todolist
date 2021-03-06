module.exports = {
  BOX:function(results){
    var box = `<div class="thumbnails">`;

    for (var i = 0; i < results.length; i++) {
      var tmp = results[i].deadline;
      var imgUrl ='';
      if(tmp === null){ tmp = '없음';  }
      if(results[i].complete === 1){
        imgUrl ='/images/complete.png';
      }else{
        imgUrl ='/images/no_complete.png';
      }

      box = box +
      `
      <div class="box">
        <div class="inner">
          <div class="inner_title">
            <section class="title"><h4>${results[i].title}</h4></section>
            <section class="prio"><h4>${results[i].priority}순위</h4></section>
          </div>
          <div class="inner_des">
            <pre>${results[i].description}</pre>
          </div>
          <div class="inner_deadline">
            <p>마감기한 : ${tmp}</p>
          </div>
          <div class="inner_button">
            <a href="/complete?id=${results[i].id}" class="com" style="background: url(${imgUrl})no-repeat; 	background-position-x:1em;"/>complete</a>
            <a href="/update?id=${results[i].id}" class="up">update</a>
            <a href="/delete?id=${results[i].id}" class="del">delete</a>
          </div>
        </div>
      </div>
      `;
    }
    box = box + `</div>`;
    return box;
  }
}
