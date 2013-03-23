var photo_picker = function() {
  $('input[name="photo_picker"]').on('change', function(e) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var files = e.target.files;
      
      if (!files[0].type.match('image.*')) {
        alert('You must upload an image file.');
        return false;
      }
  
      var reader = new FileReader();
  
      reader.onload = (function(theFile) {
        return function(e) {
          $('#uploaded_img').attr('src', e.target.result).load(function(e) {
            var canvas = $('#uploaded_img_canvas')[0];
            
            canvas.width = $(this).width();
            canvas.height = $(this).height();
        
            canvas.getContext('2d').drawImage($('#uploaded_img')[0], 0, 0, $(this).width(), $(this).height());
          });
        };
      })(files[0]);

      reader.readAsDataURL(files[0]);
  
      var canvas = $('#uploaded_img_canvas')[0];
  
      $('#uploaded_img_canvas').on('click', function(e) {
        var x = e.offsetX || e.originalEvent.layerX;
        var y = e.offsetY || e.originalEvent.layerY;
    
        rgb = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    
        rgb_string = rgb[0] + ', ' + rgb[1] + ', ' + rgb[2];
    
        $('#color_swatch').css('background', 'rgb('+rgb_string+')');
    
        $('#rgb_value').text('RGB: ' + rgb_string);
      });
  
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  });
}

$(function() {
    photo_picker();
});