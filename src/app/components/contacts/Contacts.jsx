'use client';

import { contacts } from "@/app/utils/data";
import './Contacts.css';

export default function Contacts() {
    return (
        <section id="contacts" className="contacts">
            <div className="contacts-container">
                <h2 className="contacts-title">Контакты</h2>
                <p className="contacts-tagline">{contacts.tagline}</p>

                <div className="contacts-grid">
                    <div className="contacts-info">
                        {contacts.addresses.map((addr, index) => (
                            <div key={index} className="address-card">
                                <div className="address-header">
                                    <span className="address-icon">📍</span>
                                    <h3>Филиал {index + 1}</h3>
                                </div>
                                <p className="address-location">{addr.location}</p>
                                <a href={`tel:${addr.phone}`} className="address-phone">
                                    📞 {addr.phone}
                                </a>
                                <a
                                    href={addr.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="map-link"
                                >
                                    🗺️ Открыть в Google Maps →
                                </a>
                            </div>
                        ))}

                        <div className="delivery-note">
                            <span className="delivery-icon">🚚</span>
                            <div>
                                <strong>{contacts.deliveryNote}</strong>
                                <p>Бесплатная доставка от 50.000 сум</p>
                            </div>
                        </div>
                    </div>

                    <div className="maps-section">
                        <h3>Наши локации</h3>
                        <div className="maps-container">
                            {contacts.addresses.map((addr, index) => (
                                <div key={index} className="map-card">
                                    <div className="map-embed">
                                        <iframe
                                            src={addr.embedUrl}
                                            width="100%"
                                            height="200"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                    <p className="map-label">{addr.location}</p>
                                </div>
                            ))}
                        </div>

                        <div className="social-section">
                            <h3>Мы в соцсетях</h3>
                            <div className="social-links">
                                <a
                                    href={contacts.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link instagram"
                                >
                                    📷 Instagram
                                </a>
                                <a
                                    href={contacts.social.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link telegram"
                                >
                                    💬 Telegram
                                </a>
                                <a
                                    href={contacts.social.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link youtube"
                                >
                                    ▶️ YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}