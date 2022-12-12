import PlayerTank from "./PlayerTank.js";

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
        let newBullet = document.createElement('div')
        newBullet.classList.add('block')
        document.getElementById('container').appendChild(newBullet)
        console.log(player.top)
        newBullet.style.top = `${player.top - 22}px`
        newBullet.style.left = `${player.left + 22}px`

        for(let i; i<6; i++){
            setInterval( () => {}, 1000)
        }

    }
    
}

window.requestAnimationFrame(update)