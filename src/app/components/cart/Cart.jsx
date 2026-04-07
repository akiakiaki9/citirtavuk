'use client';

import { useState, useEffect } from 'react';
import { 
    FiX, 
    FiShoppingCart, 
    FiTrash2, 
    FiMinus, 
    FiPlus, 
    FiShoppingBag,
    FiPhone,
    FiUser,
    FiSend
} from 'react-icons/fi';
import './Cart.css';

export default function Cart({ isOpen, onClose }) {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const telegramUsername = 'Citirtovuk'; // Username получателя

    useEffect(() => {
        if (isOpen) {
            loadCart();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setShowModal(false);
            setName('');
            setPhone('');
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
        calculateTotal(cart);
    };

    const calculateTotal = (cart) => {
        const sum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    const updateQuantity = (itemId, weight, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(itemId, weight);
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const itemIndex = cart.findIndex(i => i.id === itemId && i.weight === weight);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
            window.dispatchEvent(new Event('storage'));
        }
    };

    const removeItem = (itemId, weight) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const filtered = cart.filter(i => !(i.id === itemId && i.weight === weight));
        localStorage.setItem('cart', JSON.stringify(filtered));
        loadCart();
        window.dispatchEvent(new Event('storage'));
    };

    const clearCart = () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            localStorage.setItem('cart', '[]');
            loadCart();
            window.dispatchEvent(new Event('storage'));
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
    };

    // Формирование текста заказа для Telegram
    const formatOrderMessage = () => {
        const orderItemsList = cartItems.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            return `${index + 1}. ${item.name} (${item.weightLabel}) x${item.quantity} - ${itemTotal.toLocaleString()} сум`;
        }).join('\n');

        const currentDate = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `🛍 НОВЫЙ ЗАКАЗ!

👤 Клиент: ${name || 'Не указан'}
📞 Телефон: ${phone}
💰 Общая сумма: ${total.toLocaleString()} сум
🕐 Время заказа: ${currentDate}

📦 Состав заказа:
${orderItemsList}

✅ Статус: Ожидает подтверждения`;
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        
        if (!phone) {
            alert('Пожалуйста, введите номер телефона');
            return;
        }

        if (!phone.match(/^[\d\s+()-]{9,}$/)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        setIsSubmitting(true);

        try {
            const messageText = formatOrderMessage();
            
            // Открываем чат с конкретным пользователем Telegram с готовым сообщением
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(messageText)}`;
            
            // Открываем Telegram в новой вкладке
            window.open(telegramUrl, '_blank');
            
            // Сохраняем заказ в localStorage
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const newOrder = {
                id: Date.now(),
                date: new Date().toISOString(),
                name: name,
                phone: phone,
                items: cartItems,
                total: total,
                status: 'pending'
            };
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Очищаем корзину
            localStorage.setItem('cart', '[]');
            
            alert('✅ Заказ отправлен! Скоро с вами свяжутся для подтверждения.');
            
            // Закрываем всё
            setTimeout(() => {
                onClose();
                setShowModal(false);
                setName('');
                setPhone('');
                loadCart();
            }, 1500);
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOrderClick = () => {
        if (cartItems.length === 0) return;
        setShowModal(true);
    };

    return (
        <>
            {/* Основная корзина */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-overlay" onClick={onClose}></div>
                <div className="cart-content">
                    <div className="cart-header">
                        <div className="cart-header-title">
                            <FiShoppingCart className="cart-icon" />
                            <h2>Корзина</h2>
                        </div>
                        <button className="cart-close" onClick={onClose} aria-label="Закрыть">
                            <FiX />
                        </button>
                    </div>

                    <div className="cart-body">
                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <div className="empty-icon">
                                    <FiShoppingBag />
                                </div>
                                <p>Ваша корзина пуста</p>
                                <p className="empty-subtitle">Добавьте товары, чтобы оформить заказ</p>
                                <button className="continue-shopping" onClick={onClose}>
                                    Продолжить покупки
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartItems.map((item, index) => (
                                        <div key={`${item.id}-${item.weight}`} className="cart-item">
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <p>{item.weightLabel} • {formatPrice(item.price)}</p>
                                            </div>
                                            <div className="cart-item-actions">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                                                    aria-label="Уменьшить количество"
                                                >
                                                    <FiMinus />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                                                    aria-label="Увеличить количество"
                                                >
                                                    <FiPlus />
                                                </button>
                                                <button 
                                                    className="remove-btn" 
                                                    onClick={() => removeItem(item.id, item.weight)}
                                                    aria-label="Удалить товар"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <span>Итого:</span>
                                        <strong>{formatPrice(total)}</strong>
                                    </div>

                                    <button className="checkout-btn" onClick={handleOrderClick}>
                                        <FiSend className="btn-icon" />
                                        Оформить заказ
                                    </button>
                                    <button className="clear-cart-btn" onClick={clearCart}>
                                        <FiTrash2 className="btn-icon" />
                                        Очистить корзину
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Модальное окно для оформления заказа */}
            {showModal && (
                <div className="order-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>
                            <FiX />
                        </button>

                        <div className="modal-header">
                            <FiShoppingBag className="modal-icon" />
                            <h2 className="modal-title">Оформление заказа</h2>
                            <p className="modal-subtitle">
                                Заполните форму и отправьте заказ в Telegram
                            </p>
                        </div>

                        {/* Список заказываемых товаров */}
                        <div className="order-summary">
                            <h3 className="summary-label">Ваш заказ:</h3>
                            <div className="order-items">
                                {cartItems.map((item) => {
                                    const itemTotal = item.price * item.quantity;
                                    return (
                                        <div key={item.id} className="order-item">
                                            <span className="order-item-name">
                                                {item.name} ({item.weightLabel}) x{item.quantity}
                                            </span>
                                            <span className="order-item-price">
                                                {itemTotal.toLocaleString()} сум
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="order-total">
                                <span>Итого:</span>
                                <span className="total-amount">{total.toLocaleString()} сум</span>
                            </div>
                        </div>

                        {/* Форма заказа */}
                        <form onSubmit={handleOrderSubmit} className="order-form">
                            <div className="form-group">
                                <FiUser className="form-icon" />
                                <input
                                    type="text"
                                    placeholder="Ваше имя (необязательно)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <FiPhone className="form-icon" />
                                <input
                                    type="tel"
                                    placeholder="Номер телефона *"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    'Отправка...'
                                ) : (
                                    <>
                                        <FiSend style={{ marginRight: '8px' }} />
                                        Отправить в Telegram
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="modal-footer">
                            <p className="footer-note">
                                Нажимая кнопку отправки, вы соглашаетесь на обработку персональных данных
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}