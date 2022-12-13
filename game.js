import PlayerTank from "./PlayerTank.js";
import {DetectColision} from './Utils.js'

let container = document.getElementById('container')
let playerTank = new PlayerTank(document.getElementById('playerTank'))
let enemyTank = new PlayerTank(document.getElementById('enemyTank'))

let lastTime

function update(time){

    if(lastTime != null){
        const delta = time - lastTime
        //Update code
    }
    lastTime = time



    window.requestAnimationFrame(update)
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        playerTank.moveUp()
    }
    else if (e.keyCode == '40') {
        playerTank.moveDown()
    }
    else if (e.keyCode == '37') {
       playerTank.moveRight()
    }
    else if (e.keyCode == '39') {
       playerTank.moveLeft()
    }
    else if (e.keyCode == '32') {
        shot(playerTank)
    }

}

function shot(player){

    //Create 'bullet' block
    let newBullet = document.createElement('div')
    newBullet.classList.add('block')
    
    if(player.facing = 'top'){
        //Add to the container
        container.appendChild(newBullet)
        //Move to the front of cannon
        newBullet.style.top = `${player.top - 22}px`
        newBullet.style.left = `${player.left + 22}px`
        // Catch child nodes of enemies (every block)
        let enemyBlocks = enemyTank.blockChilds


        const colision = setInterval( () => {

            if( (pxToNumber(newBullet) - 20) < -2){
                newBullet.remove()
                clearInterval(colision)
            }
            newBullet.style.top = `${newBullet.style.top.replace('px', '') - 15}px`

            enemyBlocks.forEach(block => {
                if( DetectColision(newBullet, block) ){
                    newBullet.remove()
                    clearInterval(colision)
                }
            });
            
        }, 50)

    }
    
}

// Convert string ex: '120px' to 120
function pxToNumber(elem){
    return +elem.style.top.replace('px','')
}

window.requestAnimationFrame(update)