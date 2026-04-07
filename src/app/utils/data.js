export const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'О нас', href: '#about' },
    { name: 'Меню', href: '#menu' },
    { name: 'Контакты', href: '#contacts' },
];

export const menuItems = [
    {
        id: 1,
        name: 'Крылышки',
        description: 'Хрустящие куриные крылышки по особому рецепту. Подаются с соусом на выбор.',
        price: 25000,
        image: '/images/menu/1.png',
        category: 'wings',
        weightOptions: [
            { label: '300 г', weight: 300, price: 25000 },
            { label: '500 г', weight: 500, price: 40000 },
            { label: '1 кг', weight: 1000, price: 75000 },
            { label: '1.5 кг', weight: 1500, price: 105000 },
            { label: '2 кг', weight: 2000, price: 135000 },
            { label: '2.5 кг', weight: 2500, price: 165000 },
        ]
    },
    {
        id: 2,
        name: 'Филе',
        description: 'Нежное куриное филе в панировке. Сочное и ароматное.',
        price: 30000,
        image: '/images/menu/2.png',
        category: 'fillet',
        weightOptions: [
            { label: '300 г', weight: 300, price: 30000 },
            { label: '500 г', weight: 500, price: 48000 },
            { label: '1 кг', weight: 1000, price: 90000 },
            { label: '1.5 кг', weight: 1500, price: 125000 },
            { label: '2 кг', weight: 2000, price: 160000 },
            { label: '2.5 кг', weight: 2500, price: 195000 },
        ]
    },
];

export const contacts = {
    addresses: [
        {
            location: '5-мкр, напротив Малика ресторан',
            mapLink: 'https://maps.app.goo.gl/Av1qe7dxAh9EshpN6',
            phone: '+998 91 084 00 11',
            embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d64.4289!3d39.7747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzI4LjkiTiA2NMKwMjUnNDQuMCJF!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
        },
        {
            location: 'Горгаз, напротив Hayot market',
            mapLink: 'https://maps.app.goo.gl/u6geGEXHqyTbtsEi9',
            phone: '+998 88 854 00 11',
            embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d64.4321!3d39.7712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzE2LjMiTiA2NMKwMjUnNTUuNSJF!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
        },
    ],
    deliveryNote: 'Доставка от 10.000 сум',
    social: {
        instagram: 'https://www.instagram.com/citir_tavuk_/',
        telegram: 'https://t.me/citirtavuk1',
        youtube: 'https://www.youtube.com/@citir_tavuk',
    },
    tagline: '🐔 Citir Tavuk — халяль, вкусно, быстро!',
};