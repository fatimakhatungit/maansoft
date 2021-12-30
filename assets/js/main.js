/* ===================================================================
    
    Author          : Kazi Sahiduzzaman
    Template Name   : MaanSoft It Solution HTML Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
    "use strict";

    $(document).on('ready', function() {


		/* ==================================================
			# Data Background
		 ===============================================*/

		$("[data-background]").each(function(){
			$(this).css("background-image","url(" + $(this).attr("data-background") +")");
		});
		/* ==================================================
			# Fun Factor Init
		===============================================*/
			$('.timer').countTo();
			$('.fun-fact').appear(function() {
				$('.timer').countTo();
			}, {
				accY: -100
			});
		
		/* ==================================================
			# Wow Init
		 ===============================================*/
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();

		/* ==================================================
			# Smooth Scroll
		 =============================================== */


		$('a.smooth-menu').on('click', function(event) {
			var $anchor = $(this);
			var headerH = '85';
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

		 /* ==================================================
			# Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();

		/* ==================================================
			# Accordion Menu
		 =============================================== */

		  $(document).on('click','.panel-group .panel',function(e) {
			e.preventDefault();
			$(this).addClass('panel-active').siblings().removeClass('panel-active');
		});

		/* ==================================================
			# imagesLoaded active
		===============================================*/
		$('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

			/* Filter menu */
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({
					filter: filterValue
				});
			});

			/* filter menu active class  */
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			/* Filter active */
			var $grid = $('#portfolio-grid').isotope({
				itemSelector: '.pf-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.pf-item',
				}
			});

			/* Filter active */
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.blog-item',
				}
			});

		});

		/* ==================================================
            # Feedback Carousel
         ===============================================*/
		
        $('.feed-sldr').owlCarousel({
            loop: true,
            margin:30,
            nav: false,
            navText: [
                "<i class='icofont-long-arrow-left'></i>",
                "<i class='icofont-long-arrow-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }

        });
		
        /* ==================================================
            # Partner Carousel
         ===============================================*/
		
        $('.partner-sldr').owlCarousel({
            loop: true,
            margin:90,
            nav: false,
            navText: [
                "<i class='icofont-long-arrow-left'></i>",
                "<i class='icofont-long-arrow-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
        
        
		
        /* ==================================================
            # Hero Slider Carousel
         ===============================================*/
		
        $('.hero-slider').owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
			autoplayTimeout:5000,
            items: 1,
            navText: [
                "<i class='ti-angle-left'></i>",
                "<i class='ti-angle-right'></i>"
            ],
        });
		
		
		/* ==================================================
			# Magnific popup init
		 ===============================================*/
		$(".popup-link").magnificPopup({
			type: 'image',
			// other options
		});

		$(".popup-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			// other options
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		$('.magnific-mix-gallery').each(function() {
			var $container = $(this);
			var $imageLinks = $container.find('.item');

			var items = [];
			$imageLinks.each(function() {
				var $item = $(this);
				var type = 'image';
				if ($item.hasClass('magnific-iframe')) {
					type = 'iframe';
				}
				var magItem = {
					src: $item.attr('href'),
					type: type
				};
				magItem.title = $item.data('title');
				items.push(magItem);
			});

			$imageLinks.magnificPopup({
				mainClass: 'mfp-fade',
				items: items,
				gallery: {
					enabled: true,
					tPrev: $(this).data('prev-text'),
					tNext: $(this).data('next-text')
				},
				type: 'image',
				callbacks: {
					beforeOpen: function() {
						var index = $imageLinks.index(this.st.el);
						if (-1 !== index) {
							this.goTo(index);
						}
					}
				}
			});
		});


	


		/* ==================================================
			Preloader Init
		 ===============================================*/
		$(window).on('load', function() {
			// Animate loader off screen
			$(".se-pre-con").fadeOut("slow");
		});


		

		/* ==================================================
			Contact Form Validations
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function() {

				var action = $(this).attr('action');

				$("#message").slideUp(750, function() {
					$('#message').hide();

					$('#submit')
						.after('<img src="assets/img/logo/ajax-loader.gif" class="loader" />')
						.attr('disabled', 'disabled');

					$.post(action, {
							name: $('#name').val(),
							email: $('#email').val(),
							subject: $('#subject').val(),
							website: $('#website').val(),
							comments: $('#comments').val()
						},
						function(data) {
							document.getElementById('message').innerHTML = data;
							$('#message').slideDown('slow');
							$('.contact-form img.loader').fadeOut('slow', function() {
								$(this).remove();
							});
							$('#submit').removeAttr('disabled');
						}
					);
				});
				return false;
			});
		});


		/* ==================================================
			# Price Range
			===============================================*/

		/* ==================================================
			# Scroll to top
		 =============================================== */
        //Get the button
        var mybutton = document.getElementById("scrtop");

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
          } else {
            mybutton.style.display = "none";
          }
        }
		
		/* ==================================================
			# Price Range
		 =============================================== */
		
		priceOpt();
		
		/* ==================================================
			# Color Change Option And rtl
		 =============================================== */
		// Color Option
		Filaous_bgColor_Options();
        
    }); // end document ready function
})(jQuery); // End jQuery

/* ==================================================
# Price Range
===============================================*/

function priceOpt() {
	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;
	slider.oninput = function() {
		output.innerHTML = this.value;
	}
}



// maansoft 


//Parallax Scene for Icons

if($('.parallax-scene-2').length){
	var scene = $('.parallax-scene-2').get(0);
	var parallaxInstance = new Parallax(scene);
}
if($('.parallax-scene-3').length){
	var scene = $('.parallax-scene-3').get(0);
	var parallaxInstance = new Parallax(scene);
}



/* ==================================================
# Background Color Option
===============================================*/

function Filaous_bgColor_Options(){
    "use-strict";

    var toggleLinkTag = $('#theme-color-toggle');
    var colorOptionsSidebarToggle = $('#colorChange,.colorChange');
    var rtlSidebar = $('#rtlSidebar');
    var rtlToggle = $('#rtlToggle');
    var colorOptions = $('.color-options-list');
    var colorOptionsWrap = $('.color-options-wrap');
    var optionsItem = colorOptions.find('span');

    optionsItem.first().addClass("active");

    colorOptionsSidebarToggle.on("click",function(){
        colorOptionsWrap.toggleClass("active");
    });

    optionsItem.each(function(){
        var itemBgData = $(this).attr("data-bg-color");
        $(this).css('background-color', itemBgData);
        $(this).css('color', itemBgData);
    });

    optionsItem.on('click',function(){
        var bgActiveColor = $(this).css("background-color");
        var itemSrcData = $(this).attr("data-skins-css-path");
        optionsItem.removeClass("active");
        $(this).addClass("active");
        colorOptionsSidebarToggle.css("background-color",bgActiveColor);
        rtlToggle.css("background-color",bgActiveColor);
        toggleLinkTag.attr("href", itemSrcData);
    });

    var activeBgColor = optionsItem.first().css("background-color");

    rtlToggle.css("background-color", activeBgColor);

    // Rtl Toggle
    rtlToggle.on("click",function() {

        if ( colorOptionsWrap.hasClass("active")){
            colorOptionsWrap.toggleClass("active");
        }
        if($(this).text() == "RTL"){
            $(this).text("LTR").removeClass('rtl-mode').addClass("rtl-mode");
            $('body').removeClass("rtl-mode").addClass("rtl-mode");
        }else {
            rtlSidebar.removeClass("rtl-mode").addClass("ltr-mode");
            $(this).text("RTL").removeClass('rtl-mode').addClass("ltr-mode");
            $('body').removeClass("rtl-mode");
        }
    });
}// JavaScript Document





