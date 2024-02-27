// Inicio de variables
let tarjetasDestapadas=0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = timer;
let tiempoRestanteId = null;


// Utilizando documentos HTML
let mostrarMovimiento = document.getElementById('movimiento'); 
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
// Numeros generados aleatorias
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(()=>{return Math.random()-0.5});

//Funcion temporizador 
function contarTiempo(){
   tiempoRestanteId = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: <span>${timer} Seg</span>`
    if (timer == 0){
       clearInterval(tiempoRestanteId); 
       bloquearTarjetas();
    }
    },1000)
}
// funcion de bloqueo de tarjetas
function bloquearTarjetas (){
    for (let i = 0 ; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="img de argentina">`;;
        tarjetaBloqueada.disabled = true;

    }
}

//FUNCION PRINCIPAL..
function destapar(id){
  if (temporizador  == false){
    contarTiempo();
    temporizador = true;
  } 

  tarjetasDestapadas ++;
  if (tarjetasDestapadas == 1){
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="img de argentina">`;

    // deshabilitar primer boton 
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas ==2){
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="img de argentina">`;;

     // deshabilitar segundo boton
     tarjeta2.disabled = true;

     // Movimientos
     movimientos ++;
     mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`;

     if(primerResultado == segundoResultado){
        // encerrar contador de tarjetasdestapadas
        tarjetasDestapadas = 0;
        // aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

        if (aciertos == 8){
            clearInterval( tiempoRestanteId);
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎👍`;
            mostrarMovimiento.innerHTML =  `Movimientos: ${movimientos} 😱`;
            mostrarTiempo.innerHTML = ` Felicitaciones :<span>${ timerInicial-timer} Seg 🎉✨</span>` ;
        }

     } else {
     // mostrar valores y volver a tapar 
     setTimeout(()=>{
        tarjeta1.innerHTML=' ';
        tarjeta2.innerHTML=' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
     },800)

  }
}

}