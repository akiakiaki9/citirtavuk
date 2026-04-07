import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="/images/logo.png" alt="Çitir Tavuk" className="footer-logo-img" />
                        <span className="footer-logo-text">Çitir Tavuk</span>
                    </div>
                    <p className="footer-tagline">Халяль • Вкусно • Быстро</p>
                    <div className="footer-links">
                        <a href="#home">Главная</a>
                        <a href="#about">О нас</a>
                        <a href="#menu">Меню</a>
                        <a href="#contacts">Контакты</a>
                    </div>
                    <div className="footer-copyright">
                        <p>© {currentYear} Çitir Tavuk. Все права защищены.</p>
                        <p className="developer">
                            Разработал: <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer">Akbar Soft</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}