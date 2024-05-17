let slider = document.querySelector('.sliderContenedor');
let sliderInd = document.querySelectorAll('.sliderTest');
let contador = 1;
let tamanoWidth = sliderInd[0].clientWidth;
let intervalo = 2000;

window.addEventListener("resize", function(){
    tamanoWidth = sliderInd[0].clientWidth; 
})

setInterval(function tiempo(){
    slides();
}, intervalo);

function slides(){
    slider.style.transform = 'translate(' + (- tamanoWidth * contador) + 'px)';
    slider.style.transition = 'transform 1s';
    contador++;

    if(contador === sliderInd.length){
        contador = 0;
        setTimeout(function(){
            slider.style.transform = 'translate(0px)';
            slider.style.transition = 'transform 0s';
        }, intervalo)
    }
}