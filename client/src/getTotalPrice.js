const getPrice = (length) => {
    const basePrice = 300
    let totalPrice = basePrice * length
    if (length >= 4 && length < 10) totalPrice = Math.round(totalPrice * 85/100)
    else if (length >= 10 && length < 30) totalPrice = Math.round(totalPrice *= 82/100)
    else if (length >= 30 && length < 50) totalPrice = Math.round(totalPrice *= 78/100)
    else if (length >= 50) totalPrice = Math.round(totalPrice *= 60/100)

    return totalPrice
}

export default getPrice