(function ($) {

  "use strict";

  // PRE LOADER
  $(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets    
  });


  // MENU
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });


  // HOME SLIDER & COURSES & CLIENTS
  $('.home-slider').owlCarousel({
    animateOut: 'fadeOut',
    items: 1,
    loop: true,
    dots: false,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
  })

  $('.owl-courses').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: false,
    autoplay: false,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      }
    }
  });

  $('.owl-client').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      }
    }
  });


  // SMOOTHSCROLL
  $(function () {
    $('.custom-navbar a, #home a').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  });

})(jQuery);

// get file apk
const apiUrl = 'https://api-apk.binnotech.site'
function getOneFile() {
  // xhr
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `${apiUrl}/api/get-one-file-random-apk`, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var file = JSON.parse(xhr.responseText);
      console.log(file);
      // if(!file || !file.file_path?.lenght) return alert('Không có file apk nào');

      downloadURI(file.file_path, 'Xenhapgiare.apk')
      $('#link').attr('href', file.file_path)
    }
  }
}
getOneFile()
function downloadURI(uri, name) {
  var link = document.createElement("a");
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute('download', name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

var urlParams = new URLSearchParams(window.location.search);

// get query string value
var app = urlParams.get('app');

if (!app || app != 'true') {
  $('body').css('padding', '0')
  $('body').html(
    `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 90%; margin: auto; text-align: center">
      <div>
          <img src='./images/ic_launcher.png' style="width: 80%; display: block; margin:auto">
          <p style="padding-top: 20px">Tên file: Xenhapgiare.apk</p>
          <p>Kích thước: 25mb</p>
          <p>Vui lòng tải xuống ứng dụng và cài đặt để xem chi tiết. <br> <a id="link" style="text-decoration: underline; color: blue" href="./XenhapgiareV1.apk" download>Tải ngay bây giờ</a></p> 
      </div>
    </div>
    `
  );
}





