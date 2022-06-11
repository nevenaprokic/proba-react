
export const userType = {
    CLIENT: "CLIENT",
    INSTRUCTOR: "INSTRUCTOR",
    COTTAGE_OWNER:"COTTAGE_OWNER" ,
    SHIP_OWNER: "SHIP_OWNER",
    ADMIN : "ADMIN",
    OWNER : "OWNER"
}

Object.freeze(userType);

export const offerType = {
    ADVENTURE: 1,
    COTTAGE: 2 ,
    SHIP: 3,
    COTTAGE_OWNER: 4,
    SHIP_OWNER: 5,
    INSTRUCTOR: 6
}

Object.freeze(offerType);

export const offerTypeByUserType = {
    INSTRUCTOR: offerType.ADVENTURE,
    COTTAGE_OWNER: offerType.COTTAGE ,
    SHIP_OWNER: offerType.SHIP
}

Object.freeze(offerTypeByUserType);

export const loyaltyCategory = {
    REGULAR : "REGULAR",
    SILVER: "SILVER",
    GOLD: "GOLD",
    CASUAL_CLIENT: "CASULA_CLIENT",
    CLOSE_CLIENT: "CLOSE_CLIENT",
    BEST_CLIENT: "BEST_CLIENT"
}

















