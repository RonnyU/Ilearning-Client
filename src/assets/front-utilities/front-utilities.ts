declare var jQuery: any;
declare var $: any;

export var FrontUtilities = {
  test: 'Exito JqueryUtilities',
  tabs: function () {
    if ($('.tabs-box').length) {
      $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
        e.preventDefault();
        var target = $($(this).attr('data-tab'));

        if ($(target).is(':visible')) {
          return false;
        } else {
          target
            .parents('.tabs-box')
            .find('.tab-buttons')
            .find('.tab-btn')
            .removeClass('active-btn');
          $(this).addClass('active-btn');
          target
            .parents('.tabs-box')
            .find('.tabs-content')
            .find('.tab')
            .fadeOut(0);
          target
            .parents('.tabs-box')
            .find('.tabs-content')
            .find('.tab')
            .removeClass('active-tab');
          $(target).fadeIn(300);
          $(target).addClass('active-tab');
        }
      });
    }
  },
  lightbox: function () {
    if ($('.lightbox-image').length) {
      $('.lightbox-image').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
          media: {},
        },
      });
    }
  },
  accordion: function () {
    if ($('.accordion-box').length) {
      $('.accordion-box').on('click', '.acc-btn', function () {
        var outerBox = $(this).parents('.accordion-box');
        var target = $(this).parents('.accordion');

        if ($(this).hasClass('active') !== true) {
          $(outerBox).find('.accordion .acc-btn').removeClass('active');
        }

        if ($(this).next('.acc-content').is(':visible')) {
          return false;
        } else {
          $(this).addClass('active');
          $(outerBox).children('.accordion').removeClass('active-block');
          $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
          target.addClass('active-block');
          $(this).next('.acc-content').slideDown(300);
          //console.log($(this).next('.acc-content'));
        }
      });
    }
  },
};
