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
    //Create 'bullet' block
    let newBullet = document.createElement('div')
    newBullet.classList.add('block')

    //Move the bullet to the front of cannon 
    if (facing === 'top') {
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
    }



    // Function who run move the bullet
    const colision = setInterval(() => {

        if (facing === 'top') {
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
        }

        //Stop and remove bullet when reach enemy
        enemyTanks.forEach(tank => {

            tank.elem.childNodes.forEach((block) => {
                if (detectColision(newBullet, block)) {
                    newBullet.remove()
                    clearInterval(colision)
                }
            })

        });

    }, 80)



}

const detectBorderColision = (elem) => {
    return detectColision(elem, borders[0]) ||
        detectColision(elem, borders[1]) ||
        detectColision(elem, borders[2]) ||
        detectColision(elem, borders[3])
}

const spawnEnemyTank = () => {
    let random = Math.floor(Math.random() * 12)
    let initialTop = 2
    
    for(let i = 0; i < random; i++){
        initialTop = initialTop + 22
    }

    console.log('Initial top -> ' + initialTop)

    random = Math.floor(Math.random() * 7)
    let initialLeft = 2
    
    for(let i = 0; i < random; i++){
        initialLeft = initialLeft + 22
    }

     console.log('Initial left -> ' + initialLeft)

    let newTankDiv = document.createElement('div')
    newTankDiv.classList.add('enemyTank')
    newTankDiv.style.top = `${initialTop}px`
    newTankDiv.style.left = `${initialLeft}px`
    let enemyTank = new PlayerTank(newTankDiv)
    container.appendChild(newTankDiv)
    
    //Verify if the new tank colides with other tanks
    if(enemyTanks.length > 0){
        
        enemyTanks.forEach( (tank) => {
            if( detectColision(tank.elem, enemyTank.elem) ){
                newTankDiv.remove()
                spawnEnemyTank()
                return
            }
        })


    }
    
    if(detectColision(enemyTank.elem, playerTank.elem)){
        newTankDiv.remove()
        spawnEnemyTank()
        return
    }

    enemyTanks.push(enemyTank)
}



const game = setInterval(() => {

    let currentEnemies = enemyTanks.length

    if (currentEnemies < 1) {
        spawnEnemyTank()
        spawnEnemyTank()
    }



}, 500)

game
