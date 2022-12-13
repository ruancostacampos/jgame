const DetectColision = (elemA, elemB) => {

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

export {DetectColision}