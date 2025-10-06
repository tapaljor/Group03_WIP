export interface Item {
    id: string,
    title: string,
    brand: ElectronicBrand,
    type: ElectronicType,
    condition: ItemCondition,
    sellerID: string,
    sellerName: string,
    description: string,
    address: string,
    price: number,
    postDate: number,
    isSold: boolean,
    buyerID: string,
    buyerName: string,
    soldDate: number,
    images: string[],
}
export enum ItemCondition {
    New = "new",
    LikeNew = "like-new",
    Refurbished = "refurbished",
    Good = "good",
    Fair = "fair",
    ForParts = "for-parts",
}
export enum ElectronicType {
    Smartphone = "Smartphone",
    Tablet = "Tablet",
    Laptop = "Laptop",
    Desktop = "Desktop",
    Smartwatch = "Smartwatch",
    Camera = "Camera",
    Television = "Television",
    Audio = "Audio",
    GamingConsole = "Gaming-console",
    Printer = "Printer",
    Networking = "Networking",
    HomeAppliance = "Home-appliance",
    KitchenAppliance = "Kitchen-appliance", // e.g., rice cooker, blender
    Wearable = "Wearable",
    EScooter = "E-Scooter",
    Other = "Other",
}
export enum ElectronicBrand {
    // Smartphones & Tablets
    Apple = "Apple",
    Samsung = "Samsung",
    Google = "Google",
    OnePlus = "OnePlus",
    Xiaomi = "Xiaomi",
    Oppo = "Oppo",
    Vivo = "Vivo",
    Realme = "Realme",
    Motorola = "Motorola",
    Huawei = "Huawei",
    SonyMobile = "Sony Mobile",
    Nokia = "Nokia",
    AsusMobile = "Asus Mobile",
    LGMobile = "LG Mobile",

    // Computers & Laptops
    Dell = "Dell",
    HP = "HP",
    Lenovo = "Lenovo",
    Asus = "Asus",
    Acer = "Acer",
    Microsoft = "Microsoft",
    MSI = "MSI",
    Razer = "Razer",
    Gigabyte = "Gigabyte",
    Alienware = "Alienware",

    // TVs, Audio & Entertainment
    Sony = "Sony",
    Panasonic = "Panasonic",
    Philips = "Philips",
    LG = "LG",
    TCL = "TCL",
    Hisense = "Hisense",
    Sharp = "Sharp",
    Bose = "Bose",
    JBL = "JBL",
    Sennheiser = "Sennheiser",
    Beats = "Beats",
    HarmanKardon = "Harman Kardon",

    // Gaming & Consoles
    Nintendo = "Nintendo",
    PlayStation = "PlayStation",
    Xbox = "Xbox",
    Sega = "Sega",

    // Home Appliances
    Whirlpool = "Whirlpool",
    GEAppliances = "GE Appliances",
    Bosch = "Bosch",
    Miele = "Miele",
    Electrolux = "Electrolux",
    SamsungAppliance = "Samsung Appliance",
    LGAppliance = "LG Appliance",
    Haier = "Haier",
    Hitachi = "Hitachi",

    // Kitchen Appliances
    Breville = "Breville",
    KitchenAid = "KitchenAid",
    Cuisinart = "Cuisinart",
    InstantPot = "Instant Pot",
    Zojirushi = "Zojirushi",
    PanasonicKitchen = "Panasonic Kitchen",
    PhilipsKitchen = "Philips Kitchen",

    // Cameras & Imaging
    Canon = "Canon",
    Nikon = "Nikon",
    Fujifilm = "Fujifilm",
    Olympus = "Olympus",
    Leica = "Leica",
    GoPro = "GoPro",

    // Networking & Smart Home
    Netgear = "Netgear",
    TPLink = "TP-Link",
    DLink = "D-Link",
    Linksys = "Linksys",
    Ubiquiti = "Ubiquiti",
    Ring = "Ring",
    Arlo = "Arlo",
    Segway = "Segway",

    // Other / Catch-all
    Other = "Other"
}


