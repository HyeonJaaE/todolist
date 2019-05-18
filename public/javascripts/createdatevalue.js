module.exports = {
  getToday:function(){
    var cDate = '';
    var d = new Date();

    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var d = d.getDate();

    if(m < 10){ m = '0' + m };
    if(d < 10){ d = '0' + d };

    cDate = cDate + y + "-" + m + "-" + d;
    return cDate;
  }
}
