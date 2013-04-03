$(function() {
  var api_base_url = 'http://www.authenticjobs.com/api/?api_key=adb07da1495c357839386c81e6fd3ffb';
  
  $.getJSON(api_base_url + '&method=aj.jobs.search&perpage=20&format=json&callback=?', function(data) {
    console.log(data);
  });
  
});