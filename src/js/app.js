import sayHello from './lib/sayHello.js';
import 'slick-carousel';
import 'magnific-popup';

sayHello();

// начать повторы loader
$('.loader').addClass('is-active');
  
$(document).ready(function() {

  var jdata = $.getJSON( 'https://jsonplaceholder.typicode.com/photos', function( data ) {
    var items = [];
    var item=0;

    $.each( data, function( key, val ) {

      if (item<=200) {

        // $('.slider-for').append(
        //   '<div><a href="' + val['url'] + '" class="with-caption image-link"><img src="' + val['url'] + '" alt="'+ val['title'] +'" draggable="false" /></a></div>');

        // $('.slider-nav').append(
        //   '<div><img src="' + val['thumbnailUrl'] + '" alt="'+ val['title'] +'" draggable="false" /></div>');

        $('.slider-for').append(
          '<div><a class="gallery__link" href="' + val['url'] + '" class="with-caption image-link" style=\"display: block; background: url(' + val['url'] + ') center center / cover; width: 100%; display: inline-block;\"  title=\"'+ val['title'] +'\"></a></div>');

        $('.slider-nav').append(
          '<div><div class="gallery__img-nav" style=\"display: block; background: url(' + val['url'] + ') center center / cover; width: 100%; display: inline-block;\"  title=\"'+ val['title'] +'\"></div></div>');

        item++;
      }
    });
  });


  $.when(jdata).done(function() {

    var num_for = 0;
    $('.slider-for').each(function() {
      num_for ++;

      $(this).addClass( 'slider-for-' + num_for ).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        infinite: false,
        asNavFor: '.slider-nav.slider-nav-' + num_for
      });

    });

    var num_nav = 0;
    $('.slider-nav').each(function() {
      num_nav ++;

      $(this).addClass( 'slider-nav-' + num_nav ).slick({
        slidesToShow: 11,
        slidesToScroll: 11,
        asNavFor: '.slider-for.slider-for-' + num_nav,
        dots: false,
        infinite: false,
        focusOnSelect: true,

        responsive: [
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              arrows: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          }
        ]

      });

    });


    // Popup
    $('.gallery__link').magnificPopup({
      type: 'image',
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',

      image: {
        verticalFit: true,
        titleSrc: function(item) {
          var caption = item.el.attr('title');
          return caption;
        }
      },

      gallery: {
        enabled: true
      }
    });

    $('.loader').removeClass('is-active');    

  });

});
