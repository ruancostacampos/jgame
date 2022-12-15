import {
colideWithLeftBorder,
colideWithRightBorder,
colideWithTopBorder,
colideWithBottomBorder,
detectColision
}
    from "./Utils.js"

export default class PlayerTank {

    constructor(playerTankElem) {
        this.playerTankElem = playerTankElem
        this.loading = true
        this.load()
        console.log('PlayerTank Carregado')
        this.facing = 'top'
        this.human = true
    }


    load() {

        let blocks = new Array();
        for (let i = 0; i < 6; i++) {
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

    get elem() {
        return this.playerTankElem
    }

    get blockChilds() {
        return this.playerTankElem.childNodes
    }

    get top() {
        return parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
    }

    get left() {
        return parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
    }


    moveUp(enemyTanks) {

        if (this.facing === 'up') {

            if (colideWithTopBorder(this.elem)) {
                return
            }
            this.verifyColisionWithTank(this.facing, enemyTanks)

        } else {

            let sucess = this.verifyRotateColision(enemyTanks, 'up')
            console.log(sucess)
            if (sucess) {
                this.facing = 'up'
            }

        }

        return
    }

    moveRight(enemyTanks) {


        if (this.facing === 'right') {

            if (colideWithRightBorder(this.elem)) {
                return
            }

            this.verifyColisionWithTank(this.facing, enemyTanks)

        } else {

            let sucess = this.verifyRotateColision(enemyTanks, 'right')
            console.log(sucess)
            if (sucess) {
                this.facing = 'right'
            }

        }

        return
    }


    moveLeft(enemyTanks) {

        if (this.facing === 'left') {

            if (colideWithLeftBorder(this.elem)) {
                return
            }

            this.verifyColisionWithTank(this.facing, enemyTanks)

        } else {

            let sucess = this.verifyRotateColision(enemyTanks, 'left')

            if (sucess) {
                this.facing = 'left'
            }

        }

        return

    }

    moveDown(enemyTanks) {

        if (this.facing === 'down') {

            if (colideWithBottomBorder(this.elem)) {
                return
            }

            this.verifyColisionWithTank(this.facing, enemyTanks)

        } else {


            let sucess = this.verifyRotateColision(enemyTanks, 'down')
            if (sucess) {
                this.facing = 'down'
            }
        }


        return

    }

    verifyColisionWithTank(facing, enemyTanks) {

        if (facing === 'left') {

            let oldLeft = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
            this.playerTankElem.style.left = `${oldLeft - 22}px`

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.left = `${oldLeft}px`
                return
            }
        }

        if (facing === 'right') {

            let oldLeft = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('left'))
            this.playerTankElem.style.left = `${oldLeft + 22}px`

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.left = `${oldLeft}px`
                return
            }
        }

        if (facing === 'up') {

            let oldTop = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
            this.playerTankElem.style.top = `${oldTop - 22}px`

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.top = `${oldTop}px`
                return
            }
        }

        if (facing === 'down') {

            let oldTop = parseFloat(getComputedStyle(this.playerTankElem).getPropertyValue('top'))
            this.playerTankElem.style.top = `${oldTop + 22}px`

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.top = `${oldTop}px`
                return
            }

        }


    }

    verifyBlockColision(enemyTanks) {

        let colided = false

        this.elem.childNodes.forEach((playerBlock) => {

            enemyTanks.forEach((tank) => {

                tank.elem.childNodes.forEach((block) => {
                    if (detectColision(playerBlock, block)) {
                        colided = true
                        return
                    }
                })

            })

        })

        if (colided) {
            return true
        }

        return false
    }

    verifyRotateColision(enemyTanks, direction) {

        let oldRotate = this.elem.style.transform

        if (direction === 'right') {

            this.elem.style.transform = "rotate(90deg)"

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.transform = oldRotate
                return false
            } else {
                return true
            }
        }

        if (direction === 'left') {

            this.elem.style.transform = "rotate(-90deg)"

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.transform = oldRotate
                return false
            } else {
                return true
            }
        }

        if (direction === 'up') {

            this.elem.style.transform = "rotate(0deg)"

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.transform = oldRotate
                return false
            } else {
                return true
            }
        }

        if (direction === 'down') {

            this.elem.style.transform = "rotate(180deg)"

            if (this.verifyBlockColision(enemyTanks)) {
                this.playerTankElem.style.transform = oldRotate
                return false
            } else {
                return true
            }
        }

    }

}