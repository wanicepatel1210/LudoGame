$(document).ready(function() {
    $(".file-upload").on('change', function(){
      if (this.files && this.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.profile-pic').attr('src', e.target.result);
          }

          reader.readAsDataURL(this.files[0]);
      }
    });

    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});
