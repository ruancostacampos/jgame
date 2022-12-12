export default class PlayerTank{
 
    constructor(playerTankElem){
        this.playerTankElem = playerTankElem
        this.loading = true
        this.load()
        console.log('PlayerTank Carregado')
        this.facing = 'top'
        this.human = true
    }


    load(){

        let blocks = new Array();
        for(let i = 0; i<6; i++){
            blocks[i] = document.createElement("div")
            blocks[i].classList.add('block')
            this.playerTankElem.appendChild(blocks[i])
        }


        blocks[0].style.top = '44px'
        blocks[0].style.left = '0'
        blocks[1].style.top = '22px'
        blocks[1].style.left = '0px'
        blocks[2].style.top = '22px'
        blocks[2].style.left = '22px'
        blocks[3].style.top = '22px'
        blocks[3].style.left = '44px'
        blocks[4].style.top = '44px'
        blocks[4].style.left = '44px'
        blocks[5].style.top = '0'
        blocks[5].style.left = '22px'

        
    }

    get top(){
        return parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
    }

    get left(){
        return parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
    }

    moveUp(){
        
        if(this.facing === 'top'){
            let currentTop = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
            this.playerTankElem.style.top = `${currentTop - 20}px`
        }else{
            this.playerTankElem.style.transform = 'rotate(0deg)'
            this.facing = 'top'
        }
        
    }

    moveLeft(){

        if(this.facing === 'left'){
            let currentLeft = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
            this.playerTankElem.style.left = `${currentLeft + 20}px`
        }else{
            this.playerTankElem.style.transform = 'rotate(90deg)'
            this.facing = 'left'
        }

    }


    moveRight(){

        if(this.facing === 'right'){
            let currentLeft = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
            this.playerTankElem.style.left = `${currentLeft - 20}px`
        }else{
            this.playerTankElem.style.transform = 'rotate(-90deg)'
            this.facing = 'right'
        }

    }

    moveDown(){

        if(this.facing === 'down'){
            let currentTop = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
            this.playerTankElem.style.top = `${currentTop + 20}px`
        }else{
            this.playerTankElem.style.transform = 'rotate(180deg)'
            this.facing = 'down'
        }

    }

}