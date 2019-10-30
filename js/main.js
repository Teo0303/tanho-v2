jQuery(document).ready(function($) {
  
	'use strict';

        var top_header = $('.parallax-content');
        top_header.css({'background-position':'center center'}); // better use CSS

        $(window).scroll(function () {
        var st = $(this).scrollTop();
        top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
        });


        $('.counter').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          
          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },

          {

            duration: 8000,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }

          });  
          
        });


        $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        

  
        $(tabgroup).children('div').hide();
        $(target).show();
      
        })



        $(".pop-button").click(function () {
            $(".pop").fadeIn(300);
            
        });

        $(".pop > span").click(function () {
            $(".pop").fadeOut(300);
        });



        // navigation click actions 
        $('.scroll-link').on('click', function(event){
            event.preventDefault();
            var sectionID = $(this).attr("data-id");
            scrollToID('#' + sectionID, 750);
        });
        // scroll to top action
        $('.scroll-top').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop:0}, 'slow');         
        });
        // mobile nav toggle
        $('#nav-toggle').on('click', function (event) {
            event.preventDefault();
            $('#main-nav').toggleClass("open");
        });
        
        autoPlayAdd();
    
});


function changeAdd(type){
   


}

var Index = 0;
function autoPlayAdd(){
       var i;
      var x = document.getElementsByClassName("add-item");
      console.log(x);
      for (i = 0; i < x.length; i++) {
        if ((Index) == 1) {
            $("#firstadd").attr('checked', true).trigger('click');
          }
          else if ((Index)== 2){
            $("#secondadd").attr('checked', true).trigger('click');
          }
        x[i].style.display = "none"; 
      }
      Index++;
      if (Index > x.length) {Index = 1}    
      x[Index-1].style.display = "block"; 
      //x[Index-1].checked =  true;
      setTimeout(autoPlayAdd, 2000); // Change image every 2 seconds  

}

$('.first').append('<img src="./img/underline.png" class="underline" style="width:100%; height:5px !important"/>');
   
function markActive(that){
    $('.underline').remove();
    $('.'+that+'').append('<img src="./img/underline.png" class="underline" style="width:100%; height:5px !important"/>');
    
}
// scroll function
function scrollToID(id, speed){
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#main-nav');
    $('html,body').animate({scrollTop:targetOffset}, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}
if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}
