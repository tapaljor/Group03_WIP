export interface Auction {
    id: string,
    itemID: string,
    sellerID: string,
    sellerName: string,
    bets: [Bets],
}
export interface Bets {
    id: string,
    buyerID: string,
    buyerName: string,
    amount: number,
}