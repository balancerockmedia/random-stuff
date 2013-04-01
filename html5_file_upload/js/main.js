var file_upload = function() {
  $('input[name="file_upload"]').on('change', function(e) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var files = e.target.files;
      
      if (!files[0].type.match('image.*')) {
        alert('You must select an image file.');
        return false;
      }
  
      var data = new FormData();
      
      data.append('file_upload', files[0]);
      
      $.ajax({
        type: "POST",
        url: 'upload.php',
        data: data,
        success: function(data) {
          console.log(data);
        },
        contentType : false,
        processData : false
      });

    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  });
}

$(function() {
    file_upload();
});