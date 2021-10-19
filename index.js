const FirePixelArray = [] //array dos pixels
const FireWidth = 50 //largura do fogo
const FireHeigth = 50 //altura
const FirePalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},
{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},
{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},
{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},
{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},
{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},
{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//paleta de cor do fogo

function start(){
    //função inicial contendo as outras funções
    createFireDataStructure()
    createFireSource()
    
    setInterval(calculateFirePropagation, 1)
}

function createFireDataStructure(){
    //tamanho do quadrado preenchido por pixels
    const NumberOfPixels = FireWidth * FireHeigth 
    
    //criado o laço apar guardar i de 0 até NumberOfPixels
    for (let i = 0; i < NumberOfPixels; i++){ 
        //implementando a intensidade de fogo
        FirePixelArray[i] = 0 
    } 
}

function calculateFirePropagation(){
    /*algoritmo de funcionamento do fogo
    colocando o valor de intensidade do fogo em cada pixel*/
    for (let column = 0; column < FireWidth; column++){
        for(let row = 0; row < FireHeigth; row++){
            const pixelIndex = column + ( FireWidth * row )
            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixel){
    //somar uma largura para pular uma linha
    const belowPixel = currentPixel + FireWidth
    
    //condicionando para o canva não fazer nada no PixelGhost embaixo da tabela
    if(belowPixel >= FireWidth*FireHeigth){
        return
    }
    
    //fazendo o valor de decaimento do pixel de forma randomica
    const decay = Math.floor(Math.random() *3)
    const belowPixelFireIntensity = FirePixelArray[belowPixel]
    const newFireIntensity = 
    //criando uma condicional pra tabela não ter valores negativos
    belowPixelFireIntensity - decay >= 0? belowPixelFireIntensity - decay : 0

    FirePixelArray[currentPixel - decay] = newFireIntensity
}

function renderFire(){
    const debug = false
    
    //colocando o código no html e criando uma tabela
    let html = '<table cellpadding=0 cellspacing=0>'
    
    //interar nas linhas(row) e depois nas colunas
    for (let row = 0; row < FireHeigth; row++){
        html += '<tr>'
        
        //colocando uma quebra de linha com tabela em html
        for (let column = 0; column < FireWidth; column++){
            const pixelIndex = column + ( FireWidth * row )
            const fireIntensity = FirePixelArray[pixelIndex]
            const color = FirePalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            //implementando a paleta de cores
            if(debug === true){
                html += '<td>'
                html += `<div class = "pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            }else{
                html +=`<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
        }
        html += '</tr>'
    }       
    html += '</table>'
    document.getElementById('fireCanvas').innerHTML = html
}

function createFireSource(){
    /*colocando o valor do fogo (definido em uma paleta de 36 cores)
    definidas em cima*/
    for (let column = 0; column <= FireWidth; column++){
        const overflowPixelIndex = FireWidth * FireHeigth
        const pixelIndex = (overflowPixelIndex - FireWidth) + column

        FirePixelArray[pixelIndex] = 36
    }
}
function destroyFireSource(){
    for(let column = 0; column<= FireWidth; column++){
        const overflowPixelIndex = FireWidth * FireHeigth
        const pixelIndex = (overflowPixelIndex-FireWidth) + column
        FirePixelArray[pixelIndex] = 0
    }
}

function increaseFireSource(){
    for(let column = 0; column<=FireWidth; column++){
        const overflowPixelIndex = FireWidth * FireHeigth
        const pixelIndex = (overflowPixelIndex-FireWidth) + column
        const currentFireIntensity = FirePixelArray[pixelIndex]

        if(currentFireIntensity<36){
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity =  
               currentFireIntensity + increase >= 36? 36 : currentFireIntensity + increase
            
            FirePixelArray[pixelIndex] = newFireIntensity
        }
    }
}
function decreaseFireSource(){
    for(let column = 0; column<=FireWidth; column++){
        const overflowPixelIndex = FireWidth * FireHeigth
        const pixelIndex = (overflowPixelIndex-FireWidth) + column
        const currentFireIntensity = FirePixelArray[pixelIndex]

        if(currentFireIntensity>0){
            const decay = Math.floor(Math.random() * 14)
            const newFireIntensity =  
               currentFireIntensity - decay >= 0? currentFireIntensity - decay : 0
            
            FirePixelArray[pixelIndex] = newFireIntensity
        }
    }
}

/*function toggleDebugMode() {
    if (debug === false) {
      fireWidth = 25
      fireHeight = 17
      debug = true
    } else {
      fireWidth = 60
      fireHeight = 40
      debug = false
    }
  
    createFireDataStructure()
    createFireSource()
  }
*/
start()