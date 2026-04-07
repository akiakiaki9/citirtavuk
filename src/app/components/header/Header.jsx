'use client';

import { useState, useEffect, useRef } from 'react';
import './Header.css';

export default function Header() {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

    return (
        <section id="home" className="header">
            <div className="video-background">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="bg-video"
                    onLoadedData={() => setIsVideoLoaded(true)}
                >
                    <source src="/videos/1.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

            <div className="header-content">
                <div className="header-badge">🔥 Популярное заведение Бухары</div>
                <h1 className="header-title">
                    <span className="title-main">Çitir Tavuk</span>
                    <span className="title-sub">Халяль • Вкусно • Быстро</span>
                </h1>
                <p className="header-description">
                    Лучшие куриные крылышки и филе в Бухаре.<br />
                    Сочные, хрустящие, приготовленные с любовью
                </p>
                <div className="header-buttons">
                    <a href="#menu" className="btn-primary">Смотреть меню →</a>
                    <a href="#contacts" className="btn-secondary">Контакты</a>
                </div>
                <div className="header-stats">
                    <div className="stat">
                        <div className="stat-number">1000+</div>
                        <div className="stat-label">Довольных клиентов</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Работаем для вас</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">30 мин</div>
                        <div className="stat-label">Средняя доставка</div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Листайте вниз</span>
                <div className="scroll-arrow">↓</div>
            </div>
        </section>
    );
}