export const mockOrders = [
    {
        _id: '1005',
        userId: 'demo-user',
        userEmail: 'user@example.com',
        date: '2026-05-29 14:20',
        status: 'Delivered',
        total: 80,
        items: [
            { _id: 'p-100', name: 'Handmade Ceramic Vase', quantity: 1 },
            { _id: 'p-101', name: 'Floral Wall Print', quantity: 2 }
        ]
    },
    {
        _id: '1004',
        userId: 'demo-user',
        userEmail: 'user@example.com',
        date: '2026-05-26 10:05',
        status: 'Processing',
        total: 55,
        items: [
            { _id: 'p-102', name: 'Amber Candle Set', quantity: 1 }
        ]
    },
    {
        _id: '1003',
        userId: 'demo-user',
        userEmail: 'user@example.com',
        date: '2026-05-22 18:45',
        status: 'Shipped',
        total: 40,
        items: [
            { _id: 'p-103', name: 'Macrame Plant Hanger', quantity: 1 }
        ]
    },
    {
        _id: '1002',
        userId: 'guest-user',
        userEmail: 'guest@example.com',
        date: '2026-05-18 09:15',
        status: 'Delivered',
        total: 120,
        items: [
            { _id: 'p-104', name: 'Handwoven Basket', quantity: 1 },
            { _id: 'p-105', name: 'Minimalist Poster', quantity: 3 }
        ]
    }
]

export const mockWishlistItems = [
    {
        _id: 'w-001',
        name: 'Botanical Print Frame',
        price: 38,
        category: 'Art Prints',
        image: 'wishlist-botanical.jpg'
    },
    {
        _id: 'w-002',
        name: 'Sage Soy Candle',
        price: 26,
        category: 'Handmade Candles',
        image: 'wishlist-candle.jpg'
    },
    {
        _id: 'w-003',
        name: 'Clay Trinket Dish',
        price: 18,
        category: 'Handmade Crafts',
        image: 'wishlist-clay-dish.jpg'
    }
]

export const mockSettings = {
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    preferredTheme: 'Warm neutral',
    defaultCurrency: 'MYR'
}