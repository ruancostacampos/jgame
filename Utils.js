const detectColision = (elemA, elemB) => {

    //Function by https://codepen.io/Cold_Meson_06

    elemA = elemA.getBoundingClientRect()
    elemB = elemB.getBoundingClientRect()

    const rangeIntersect = function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
    }
    
    const rectIntersect = function (r0, r1) {
        return rangeIntersect(r0.left, r0.right, r1.left, r1.right) && rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)
    }

    return rectIntersect(elemA, elemB)


}

const  topPxToNumber = (elem) => {
    return +elem.style.top.replace('px', '')
}

const  leftPxToNumber = (elem) => {
    return +elem.style.left.replace('px', '')
}

const colideWithBorder = (elem) => {
    console.log(colideWithLeftBorder(elem) || colideWithRightBorder(elem)
    || colideWithTopBorder(elem)  || colideWithBottomBorder(elem))
   return colideWithLeftBorder(elem) || colideWithRightBorder(elem)
   || colideWithTopBorder(elem)  || colideWithBottomBorder(elem)
}

const colideWithLeftBorder = (elem) => {
   if((leftPxToNumber(elem) - 20) < 0){
    console.log('colisão na borda esquerda')
   }
    return (leftPxToNumber(elem) - 20) < 0
}

const colideWithRightBorder = (elem) => {
    if((leftPxToNumber(elem) + 20) > 500){
    console.log('colisão na borda direita')
    }
    return (leftPxToNumber(elem) + 20) > 140
}

const colideWithTopBorder = (elem) => {
    if((topPxToNumber(elem) - 20) < -2){
        console.log('colisão na borda superior')
    }
    return (topPxToNumber(elem) - 20) < -2
}

const colideWithBottomBorder = (elem) => {
    if((topPxToNumber(elem) + 20) > 330){
        'colisão na borda inferior'
    }
    return (topPxToNumber(elem) + 20) > 330
}


export {detectColision, colideWithBorder, leftPxToNumber, topPxToNumber, colideWithLeftBorder, 
colideWithRightBorder, colideWithTopBorder, colideWithBottomBorder}