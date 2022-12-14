import PlayerTank from "./PlayerTank.js";
import { DetectColision } from './Utils.js'

let container = document.getElementById('container')
let playerTank = new PlayerTank(document.getElementById('playerTank'))
let enemyTank = new PlayerTank(document.getElementById('enemyTank'))

let lastTime

function update(time) {

    if (lastTime != null) {
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
        playerTank.moveLeft()
    }
    else if (e.keyCode == '39') {
        playerTank.moveRight()
    }
    else if (e.keyCode == '32') {
        shot(playerTank)
    }

}

function shot(player) {
    // Store the player facing property
    const facing = player.facing

    console.log(facing)
    
    //Create 'bullet' block
    let newBullet = document.createElement('div')
    newBullet.classList.add('block')

   //Move the bullet to the front of cannon 
    if(facing === 'top'){
        newBullet.style.top = `${player.top - 22}px`
        newBullet.style.left = `${player.left + 22}px`
    }
    
    if(facing === 'left'){  
        newBullet.style.top = `${player.top + 22}px`
        newBullet.style.left = `${player.left - 22}px`
    }

    if(facing === 'right'){  
        newBullet.style.top = `${player.top + 22}px`
        newBullet.style.left = `${player.left + 66}px`
    }

    if(facing === 'down'){  
        newBullet.style.top = `${player.top + 66}px`
        newBullet.style.left = `${player.left + 22}px`
    }
    //Add to the container
    container.appendChild(newBullet)

   
    // // Catch child nodes of enemies (every block)
    let enemyBlocks = enemyTank.blockChilds


    // Function who run move the bullet
    const colision = setInterval(() => {

        //Stop and remove bullet when reach container top border limit
        // if ((topPxToNumber(newBullet) - 20) < -2) {
        //     newBullet.remove()
        //     clearInterval(colision)
        // }

        if(facing === 'top'){
            newBullet.style.top = `${+newBullet.style.top.replace('px', '') - 15}px`
        }

        if(facing === 'left'){
            newBullet.style.left = `${+newBullet.style.left.replace('px', '') - 15}px`
        }

        if(facing === 'right'){
            newBullet.style.left = `${+newBullet.style.left.replace('px', '') + 15}px`
        }

        if(facing === 'down'){
            newBullet.style.top = `${+newBullet.style.top.replace('px', '') + 15}px`
        }

        enemyBlocks.forEach(block => {
            if (DetectColision(newBullet, block)) {
                newBullet.remove()
                clearInterval(colision)
            }
        });

    }, 50)



}

// Convert string ex: '120px' to 120
function topPxToNumber(elem) {
    return +elem.style.top.replace('px', '')
}

window.requestAnimationFrame(update)