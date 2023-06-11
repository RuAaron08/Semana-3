
(function($) {
    $.widget("custom.responsiveSlider" , {
      widgetEventPrefix:"car" ,
      options:{

        sliderWidth: 1000,
        sliderHeight: 600,
        auto : true,
        sliderDelay: 3000,
        easing: "linear",
        rolloverMode: true ,
        buttonBar: true ,
        buttonBarClass:"",

      } ,
      _create: function(){
        var _slider = this;
        this.element.css("padding" , "0");
         
     _slider.contenedor = this.element;

       _slider._build();

       _slider._buildButtonBar();
       clearInterval(_slider.loop);
       $(window).resize(function(){
        _slider.loop = setInterval(function(){
          clearInterval(_slider.loop);
          this.location.reload(false);

        }, 30);

       });

          
      } ,
        
      _setSize : function(){
        
       this.options.sliderWidth = $(this.slides.get(0)).outerWidth(false);
       this.options.sliderHeight = $(this.slides.get(0)).outerHeight(false);

      } ,
       
      //funcion que organiza la estructura de slides

      _build:function(){
        var _slider = this;
        _slider.indice = 0;
        _slider.marginLeft = 0;

        _slider.slides = _slider.contenedor.find("li");

        _slider._setSize();

        _slider.contenedor.addClass("responsiveSlider_Ul")
         .width(_slider.slides.length * _slider.options.sliderWidth)
         .height(_slider.options.sliderHeight);

        _slider.slides.addClass("responsiveSlider_Li")
        .width(_slider.options.sliderWidth)
        .height(_slider.options.sliderHeight);

       _slider.sliderContainer = $("<div class='responsiveSlider_sliderContainer'></div"); 
       _slider.contenedor.before(_slider.sliderContainer);
       _slider.sliderContainer.append(_slider.contenedor)
       .width(_slider.options.sliderWidth)
       .height(_slider.options.sliderHeight);

       _slider._setTimer();
       _slider._setControlOver();

      } ,

      //funcion que crea la botonera
      _buildButtonBar: function(){
        var _slider = this;
        if(_slider.options.buttonBar){
          var _botonera = $("<div class= 'responsiveSlider_buttonBar'><ul></ul></div>");
          _slider.buttonBar = _botonera;
          _botonera.addClass(_slider.options.buttonBarClass);
          var _ul =_botonera.find("ul");
          _slider.slides.each(function(index){
            _li= $("<li data-ref='"+ index +"'></li>");
            _ul.append(_li);

            if(index == 0){
              _li.addClass("active");
            }

            _li.click(function(){
                 var _indice= $(this).data("ref");
                 _slider.indice= _indice;
             _slider.marginLeft = -_indice * _slider.options.sliderWidth;
             _slider.contenedor.stop() .animate(

              {marginLeft: _slider.marginLeft + "px"},
                  {
                      duration: 1000,
                      specialEasing: {marginLeft:_slider.options.easing},
                      complete: function(){
                       _slider._activeButton();
                      }

                      }
             );
             
            });
            clearInterval(_slider.timerInterval);
            _slider._setTimer();


        });
           _ul.width(_slider.slides * _li.outerWidth(true));
          _slider.sliderContainer.append(_botonera);


        }

      } ,
      
      //funcion que ejecuta el control tiempo
      _setTimer: function(){
        var _slider = this;
        if(_slider.options.auto){
           
            _slider.timerInterval = setInterval(function(){
             _slider.indice ++;
             _slider.marginLeft -= _slider.options.sliderWidth;
            _slider.contenedor.stop() .animate(

                {
                    marginLeft: _slider.marginLeft + "px"},
                    {
                        duration: 1000,
                        specialEasing: {marginLeft:_slider.options.easing},
                        complete: function(){
                        if(_slider.indice >= _slider.slides.length){
                          _slider.indice = 0;
                          _slider.marginLeft = 0;
                          _slider.contenedor.css("marging-left" , "0px");
                        }
                        _slider._activeButton();
                        }
                    }
                
            );


            }, _slider.options.sliderDelay);

        }


      } ,
        
     //controla el rollover sobre el widget
     
     _setControlOver : function(){
      var _slider = this;
      _slider.sliderContainer.mouseenter(function(){
        if(_slider.options.rolloverMode){

       clearInterval(_slider.timerInterval);
        }

     });
      _slider.sliderContainer.mouseleave(function(){

        if(_slider.options.rolloverMode){
        _slider._setTimer();
        }
      });


     } ,

     //activa los botones de la botoners

     _activeButton : function(){
       var _slider = this;
       if(_slider.options.buttonBar){
        _slider.buttonBar.find("li.active").removeClass("active");
        _slider.buttonBar.find("li[data-ref='" + _slider.indice +"']").addClass("active");

       }
     },



    });


}(jQuery));