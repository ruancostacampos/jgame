import PlayerTank from "./PlayerTank.js";

const container = document.getElementById('container')
const playerTank = new PlayerTank(document.getElementById('playerTank'))
const EnemyTank = new PlayerTank(document.getElementById('enemyTank'))

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
    
    if(player.facing = 'top'){

        //Create 'bullet' block
        let newBullet = document.createElement('div')
        newBullet.classList.add('block')
        //Add to the container
        container.appendChild(newBullet)
        //Move to the front of cannon
        newBullet.style.top = `${player.top - 22}px`
        newBullet.style.left = `${player.left + 22}px`

        const colision = setInterval( () => {
            if( (pxToNumber(newBullet) - 20) > container.offsetLeft){
                clearInterval
            }
            newBullet.style.top = `${newBullet.style.top.replace('px', '') - 20}px`
        }, 500)

    }
    
}

// Convert string ex: '120px' to 120
function pxToNumber(elem){
    return +elem.style.top.replace('px','')
}

window.requestAnimationFrame(update)