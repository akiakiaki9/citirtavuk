'use client';

import { useRef, useEffect } from 'react';
import './AboutUs.css';

export default function AboutUs() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-grid">
                    <div className="about-content">
                        <h2 className="about-title">О нас</h2>
                        <div className="about-tagline">Почему выбирают Çitir Tavuk?</div>
                        <p className="about-description">
                            Çitir Tavuk — это место, где вы можете насладиться вкуснейшими куриными
                            крылышками и филе, приготовленными по уникальному рецепту. Мы используем
                            только свежее халяльное мясо и натуральные специи.
                        </p>
                        <div className="features">
                            <div className="feature">
                                <div className="feature-icon">🥩</div>
                                <div>
                                    <h3>Халяль мясо</h3>
                                    <p>Только сертифицированная продукция</p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">⚡</div>
                                <div>
                                    <h3>Быстрая доставка</h3>
                                    <p>От 10.000 сум, в течение 30-40 минут</p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">🍗</div>
                                <div>
                                    <h3>Уникальный рецепт</h3>
                                    <p>Хрустящая корочка и сочное мясо</p>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">⭐</div>
                                <div>
                                    <h3>Любовь клиентов</h3>
                                    <p>Более 1000 довольных гостей</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-video">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="about-video-player"
                        >
                            <source src="/videos/2.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}