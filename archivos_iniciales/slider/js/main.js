jQuery(document).ready(function($){
   $(ul1).responsiveSlider({
   
    auto: true,
    sliderDelay: 4000,
    easing: "easeInOutCubic",
    rollverModer: false ,
    buttonBar: true,

   });

   $(ul2).responsiveSlider({
   
      auto: true,
      sliderDelay: 3000,
      easing: "easeInOutCubic",
      rollverModer: false ,
      buttonBar: true,
      buttonBarClass : "botoneraSec"
  
     });

});
