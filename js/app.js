// debounce do lodash 
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// mudar tab ao click 
$('[data-group]').each(function(){ //select todos os itens /atribubtos  do data group
    var $allTarget = $(this).find('[data-target]'),
    $allClick = $(this).find('[data-click]'),
    activeClass= 'active';
   
    $allTarget.first().addClass(activeClass)
    $allClick.first().addClass(activeClass)

    $allClick.click(function(e){
        e.preventDefault();

        var id= $(this).data('click'),
        $target = $('[data-target="' +id +'"]');

        $allClick.removeClass(activeClass);
        $allTarget.removeClass(activeClass);
        
        $target.addClass(activeClass);
        $(this).addClass(activeClass);
    });
}); 

// scroll suave link interno
$('.menu-nav a[href^="#"]').click(function(e){ // seleciona todos os a com link interno 
    e.preventDefault();
    var id= $(this).attr('href'),
    tamanhoMenu = $('.menu').innerHeight(),
    targetOffSet = $(id).offset().top;
   
    $('html, body').animate({
        scrollTop: targetOffSet - tamanhoMenu //68  top - 68 que é altura do menu que esta fixed 
    },600);

});

// voltar p o topo 
$('.logo').click(function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0  // nao tem ponto e virgula do objeto 
    },700);
});

// mudar p active um menu de acordo com a area
$('section').each(function(){
    // altura total da sess
    var height = $(this).height(),
        offsetTop = $(this).offset().top,
        menuAltura = $('.menu').innerHeight(),
        id = $(this).attr('id'), // identifica onde esta o id da sess
        $itemMenu = $('a[href="#' + id + '"]'); // identifica qual id da section marcado com #

    // evento de scroll quando o usuario estver em cima da sessao
    $(window).scroll( debounce (function(){
        var scrollTop = $(window).scrollTop();
        if(offsetTop - menuAltura < scrollTop && offsetTop + height - menuAltura > scrollTop) { //off set é a distancia do elemento ao topo 
            $itemMenu.addClass('active');
        }   else{
            $itemMenu.removeClass('active');
        }
    },200));
});
// ativar o menu mobile 
$('.mobile-btn').click(function(){
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

// animação slide 

function slider(sliderName , velocidadeDoSlide) {
    var sliderClass='.' + sliderName,
         activeClass = 'active',
        rotate= setInterval(rotateSlide,velocidadeDoSlide);

    $(sliderClass + ' > :first').addClass(activeClass);

    // parar o slide quando o mose estiver por cima do slid
    $(sliderClass).hover(function(){
        clearInterval(rotate);
    },function(){
        rotate= setInterval(rotateSlide,velocidadeDoSlide);
    })

    function rotateSlide() {
        var activeSlide = $( sliderClass + '> .' + activeClass),
            proximoSlide = activeSlide.next();
        
        if(proximoSlide.length == 0) {
            proximoSlide = $(sliderClass + '> :first');
        }    
        activeSlide.removeClass(activeClass);
        proximoSlide.addClass(activeClass);
    }

// setInterval(rotateSlide,2000); // ativa a função com intervalo de 2seg 
}
slider('introducao', 2000);




// animação com SCROOOLLLL usando IFEE
(function(){
var $target = $('[data-anime="scroll"]'),
animationClass = 'animate',
offset= $(window).height()*3/4;

function animaScroll() {
   var documentTop = $(document).scrollTop();
    
   $target.each(function (){
       var itemTop = $(this).offset().top;
       if(documentTop > itemTop - offset){
           $(this).addClass(animationClass);
       }else{
           $(this).removeClass(animationClass);
       }

   })
} 
$(document).scroll(debounce( function(){
   animaScroll();
},200));

animaScroll();
})();
