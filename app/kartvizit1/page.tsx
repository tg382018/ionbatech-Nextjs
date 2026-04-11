import { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Ertuğ Bayram YÜRÜK | ionBATech",
  description: "Ertuğ Bayram YÜRÜK Dijital Kartvizit",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Kartvizit1() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          .ionbatech-widget {
            --brand-green: #5eb438;
            --brand-dark: #2c3e50;
            --brand-gray: #f4f6f8;
            --text-color: #555;
            --white: #ffffff;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 40px 20px;
            background-color: #fafafa;
          }
          .ionbatech-widget *, .ionbatech-widget *::before, .ionbatech-widget *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          .ionbatech-widget .digital-card {
            width: 100%;
            max-width: 400px;
            background-color: var(--white);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            position: relative;
            text-align: center;
            padding-bottom: 30px;
          }
          .ionbatech-widget .top-bar {
            height: 6px;
            background: linear-gradient(90deg, #4a8a30, #76d653);
            width: 100%;
          }
          .ionbatech-widget .header-section {
            padding: 40px 20px 20px 20px;
            background: radial-gradient(circle at center, #fafafa, #fff);
          }
          .ionbatech-widget .logo-container {
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
          }
          .ionbatech-widget .main-logo {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .ionbatech-widget .company-slogan {
            font-size: 14px;
            font-weight: 600;
            color: var(--brand-green);
            letter-spacing: 1px;
            margin-top: 15px;
            text-transform: uppercase;
          }
          .ionbatech-widget .sub-slogan {
            font-size: 11px;
            color: #999;
            margin-top: 5px;
          }
          .ionbatech-widget .services-container {
            padding: 10px 25px;
            text-align: left;
          }
          .ionbatech-widget .section-title {
            font-size: 12px;
            color: #bbb;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 15px;
            text-transform: uppercase;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 5px;
          }
          .ionbatech-widget .service-item {
            display: flex;
            align-items: center;
            background-color: #fff;
            border: 1px solid #f0f0f0;
            margin-bottom: 10px;
            padding: 12px;
            border-radius: 12px;
            transition: 0.2s;
          }
          .ionbatech-widget .service-item:hover {
            border-color: var(--brand-green);
            background-color: #fcfcfc;
          }
          .ionbatech-widget .s-icon {
            width: 36px;
            height: 36px;
            background-color: rgba(94, 180, 56, 0.1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--brand-green);
            font-size: 16px;
            margin-right: 12px;
            flex-shrink: 0;
          }
          .ionbatech-widget .s-text h4 {
            font-size: 14px;
            font-weight: 600;
            color: var(--brand-dark);
          }
          .ionbatech-widget .s-text p {
            font-size: 11px;
            color: #888;
            margin-top: 2px;
          }
          .ionbatech-widget .person-card {
            margin: 20px 25px;
            padding: 15px;
            background: linear-gradient(to right, #f8f9fa, #ffffff);
            border-left: 4px solid var(--brand-green);
            border-radius: 4px;
            display: flex;
            align-items: center;
            text-align: left;
          }
          .ionbatech-widget .person-info h3 {
            font-size: 16px;
            font-weight: 700;
            color: var(--brand-dark);
          }
          .ionbatech-widget .person-info span {
            font-size: 12px;
            font-weight: 500;
            color: var(--brand-green);
            display: block;
          }
          .ionbatech-widget .person-info p {
            font-size: 11px;
            color: #999;
          }
          .ionbatech-widget .contact-list {
            padding: 0 25px;
            text-align: left;
          }
          .ionbatech-widget .contact-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            text-decoration: none;
            color: var(--text-color);
            font-size: 13px;
          }
          .ionbatech-widget .contact-row i {
            width: 24px;
            color: var(--brand-green);
            margin-right: 10px;
            text-align: center;
            font-size: 16px;
          }
          .ionbatech-widget .contact-row:hover { color: var(--brand-green); }
          .ionbatech-widget .footer-links {
            margin-top: 25px;
            border-top: 1px solid #f0f0f0;
            padding-top: 20px;
          }
          .ionbatech-widget .web-btn {
            display: inline-block;
            padding: 10px 30px;
            background-color: var(--brand-dark);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 500;
            transition: 0.2s;
          }
          .ionbatech-widget .web-btn:hover {
            background-color: var(--brand-green);
            transform: scale(1.05);
          }
        ` }} />
        <div className="ionbatech-widget">
          <div className="digital-card">
            <div className="top-bar">&nbsp;</div>

            <div className="header-section">
              <div className="logo-container">
                <img alt="ionBATech Logo" className="main-logo" src="https://i.hizliresim.com/9gpxile.png" />
              </div>
              <div className="company-slogan">IONBATECH</div>
              <div className="sub-slogan">Güvenle depola, özgürce harca.</div>
            </div>

            <div className="services-container">
              <div className="section-title">Çözümlerimiz</div>

              <div className="service-item">
                <div className="s-icon"><i className="fa-solid fa-battery-full"></i></div>
                <div className="s-text">
                  <h4>Enerji Depolama</h4>
                  <p>Kesintisiz güç, sıfır fatura hedefi.</p>
                </div>
              </div>

              <div className="service-item">
                <div className="s-icon"><i className="fa-solid fa-bolt"></i></div>
                <div className="s-text">
                  <h4>Elektrikli Araç Şarjı</h4>
                  <p>Güneş enerjisiyle bedava şarj imkanı.</p>
                </div>
              </div>

              <div className="service-item">
                <div className="s-icon"><i className="fa-solid fa-recycle"></i></div>
                <div className="s-text">
                  <h4>Talebe Özel Çözümler</h4>
                  <p>Endüstriyel batarya ve ikinci hayat uygulamaları.</p>
                </div>
              </div>
            </div>

            <div className="person-card">
              <div className="person-info">
                <h3>Ertuğ Bayram YÜRÜK</h3>
                <span>Elektrik Elektronik Mühendisi</span>
                <p>Kurucu / Proje Yöneticisi</p>
              </div>
            </div>

            <div className="contact-list">
              <a className="contact-row" href="tel:+905520089637">
                <i className="fa-solid fa-phone"></i> +90 552 008 96 37
              </a>
              <a className="contact-row" href="mailto:info@ionbatech.com">
                <i className="fa-solid fa-envelope"></i> info@ionbatech.com
              </a>
              <a className="contact-row" href="https://maps.google.com/?q=Mevlana+Mh.+Sht.+Fatih+Duman+Sk.+No:34/B+Talas+Kayseri" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-location-dot"></i> Mevlana Mh. Şht. Fatih Duman Sk. No:34/B Talas / Kayseri
              </a>
            </div>

            <div className="footer-links">
              <a className="web-btn" href="https://www.ionbatech.com">www.ionbatech.com</a>
              <div style={{ marginTop: '20px', fontSize: '10px', color: '#ddd' }}>&copy; 2024 ionBATech Enerji Sistemleri</div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
