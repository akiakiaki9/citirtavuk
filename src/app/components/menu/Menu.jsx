'use client';

import { useState } from 'react';
import { menuItems } from '@/app/utils/data';
import Image from 'next/image';
import './Menu.css';

export default function Menu() {
    const [selectedWeight, setSelectedWeight] = useState({});
    const [addedToCart, setAddedToCart] = useState({});
    const [imageErrors, setImageErrors] = useState({});

    const handleWeightChange = (itemId, weightOption) => {
        setSelectedWeight(prev => ({
            ...prev,
            [itemId]: weightOption
        }));
    };

    const addToCart = (item) => {
        const selected = selectedWeight[item.id];
        if (!selected) {
            alert('Пожалуйста, выберите вес порции');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        const existingItemIndex = cart.findIndex(
            cartItem => cartItem.id === item.id && cartItem.weight === selected.weight
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                weight: selected.weight,
                weightLabel: selected.label,
                price: selected.price,
                quantity: 1,
                image: item.image
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('storage'));

        setAddedToCart(prev => ({ ...prev, [item.id]: true }));
        setTimeout(() => {
            setAddedToCart(prev => ({ ...prev, [item.id]: false }));
        }, 2000);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
    };

    const handleImageError = (itemId) => {
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
    };

    return (
        <section id="menu" className="menu">
            <div className="menu-container">
                <div className="menu-header">
                    <h2 className="menu-title">Наше меню</h2>
                    <p className="menu-subtitle">Выберите блюдо и вес порции</p>
                </div>
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <div key={item.id} className="menu-card">
                            <div className="menu-card-image">
                                {!imageErrors[item.id] && item.image ? (
                                    <div className="product-image-container">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={300}
                                            className="product-image"
                                            onError={() => handleImageError(item.id)}
                                            priority={item.id === 1}
                                        />
                                    </div>
                                ) : (
                                    <div className="image-placeholder">
                                        <span className="placeholder-icon">
                                            {item.category === 'wings' ? '🍗' : '🍽️'}
                                        </span>
                                        <p className="placeholder-text">Фото скоро появится</p>
                                    </div>
                                )}
                            </div>
                            <div className="menu-card-content">
                                <h3 className="menu-item-name">{item.name}</h3>
                                <p className="menu-item-description">{item.description}</p>

                                <div className="weight-selector">
                                    <label>Выберите вес:</label>
                                    <div className="weight-buttons">
                                        {item.weightOptions.map((option) => (
                                            <button
                                                key={option.weight}
                                                className={`weight-btn ${selectedWeight[item.id]?.weight === option.weight ? 'active' : ''}`}
                                                onClick={() => handleWeightChange(item.id, option)}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="menu-item-footer">
                                    <div className="price-info">
                                        {selectedWeight[item.id] ? (
                                            <>
                                                <span className="menu-item-price">{formatPrice(selectedWeight[item.id].price)}</span>
                                                <span className="price-per-kg">
                                                    {formatPrice(Math.round(selectedWeight[item.id].price / selectedWeight[item.id].weight * 1000))}/кг
                                                </span>
                                            </>
                                        ) : (
                                            <span className="menu-item-price-placeholder">Выберите вес</span>
                                        )}
                                    </div>
                                    <button
                                        className={`add-to-cart-btn ${addedToCart[item.id] ? 'added' : ''}`}
                                        onClick={() => addToCart(item)}
                                    >
                                        {addedToCart[item.id] ? '✓ Добавлено' : '➕ В корзину'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}