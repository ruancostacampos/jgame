import PlayerTank from "./PlayerTank.js";
import { detectColision, leftPxToNumber, topPxToNumber, colideWithBorder } from './Utils.js'

let container = document.getElementById('container')
let borders = new Array()

borders.push(document.getElementById('topBorder'),
    document.getElementById('leftBorder'),
    document.getElementById('rightBorder'),
    document.getElementById('bottomBorder')
)

let playerTank = new PlayerTank(document.getElementById('playerTank'))
let enemyTanks = new Array()

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        playerTank.moveUp(enemyTanks)
    }
    else if (e.keyCode == '40') {
        playerTank.moveDown(enemyTanks)
    }
    else if (e.keyCode == '37') {
        playerTank.moveLeft(enemyTanks)
    }
    else if (e.keyCode == '39') {
        playerTank.moveRight(enemyTanks)
    }
    else if (e.keyCode == '32') {
        shot(playerTank)
    }

}

function shot(player) {


    // Store the player facing property
    const facing = player.facing
    //Create 'bullet' block
    let newBullet = document.createElement('div')
    newBullet.classList.add('block')

    //Move the bullet to the front of cannon 
    if (facing === 'up') {
        newBullet.style.top = `${player.top - 22}px`
        newBullet.style.left = `${player.left + 22}px`
    }

    if (facing === 'left') {
        newBullet.style.top = `${player.top + 22}px`
        newBullet.style.left = `${player.left - 22}px`
    }

    if (facing === 'right') {
        newBullet.style.top = `${player.top + 22}px`
        newBullet.style.left = `${player.left + 66}px`
    }

    if (facing === 'down') {
        newBullet.style.top = `${player.top + 66}px`
        newBullet.style.left = `${player.left + 22}px`
    }

    //Add the bullet to the container
    container.appendChild(newBullet)

    if (detectBorderColision(newBullet)) {
        newBullet.remove()
        return
    }


    let startColiding
    enemyTanks.forEach( (tank, index) => {

        tank.elem.childNodes.forEach((block) => {
            if (detectColision(newBullet, block)) {
                newBullet.remove()
                tank.elem.remove()
                enemyTanks.splice(index, 1)
                startColiding = true
            }
        })

    });

    if(startColiding){
        return
    }



    // Function who run move the bullet
    const colision = setInterval(() => {

        if (facing === 'up') {
            newBullet.style.top = `${topPxToNumber(newBullet) - 22}px`
        }

        if (facing === 'left') {
            newBullet.style.left = `${leftPxToNumber(newBullet) - 22}px`
        }

        if (facing === 'right') {
            newBullet.style.left = `${leftPxToNumber(newBullet) + 22}px`
        }

        if (facing === 'down') {
            newBullet.style.top = `${topPxToNumber(newBullet) + 22}px`
        }

        //Stop and remove bullet when reach container top border limit
        if (detectBorderColision(newBullet)) {
            newBullet.remove()
            clearInterval(colision)
            return
        }

        //Stop and remove bullet when reach enemy
        enemyTanks.forEach( (tank, index) => {

            tank.elem.childNodes.forEach((block) => {
                if (detectColision(newBullet, block)) {
                    newBullet.remove()
                    tank.elem.remove()
                    enemyTanks.splice(index, 1)
                    clearInterval(colision)
                }
            })

        });

        return

    }, 40)



}

const detectBorderColision = (elem) => {
    return detectColision(elem, borders[0]) ||
        detectColision(elem, borders[1]) ||
        detectColision(elem, borders[2]) ||
        detectColision(elem, borders[3])
}

const spawnEnemyTank = () => {

    let initialTop
    let initialLeft

    const sortPosition = () => {

        initialTop = 2
        initialLeft = 2
        
        let random = Math.floor(Math.random() * 12)
        
        for(let i = 0; i < random; i++){
            initialTop = initialTop + 22
        }


        random = Math.floor(Math.random() * 7)
        
        for(let i = 0; i < random; i++){
            initialLeft = initialLeft + 22
        }

    }

    sortPosition()

    let newTankDiv = document.createElement('div')
    newTankDiv.classList.add('enemyTank')
    let enemyTank = new PlayerTank(newTankDiv)
    container.appendChild(newTankDiv)

    
    while(true){

        let colided = false

        //Verify if existing tanks colides with new tank
        enemyTanks.forEach( (tank) => {
            if(detectColision(tank.elem, enemyTank.elem)){
                colided = true
            }
        })

        //Verify if colides with player tank
        if(!colided && detectColision(playerTank.elem, enemyTank.elem) ){
            console.log('Colidiu com o player')
            colided = true
        }

        if(colided){
            sortPosition()
            newTankDiv.style.top = `${initialTop}px`
            newTankDiv.style.left = `${initialLeft}px`
        }else{
            enemyTanks.push(enemyTank)
            break;
        }

    }
}



const game = setInterval(() => {

    let currentEnemies = enemyTanks.length
    console.log(enemyTanks)

    if (currentEnemies < 1) {
        spawnEnemyTank()
    }



}, 500)

game
