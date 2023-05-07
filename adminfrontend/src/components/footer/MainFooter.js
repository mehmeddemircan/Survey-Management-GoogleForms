import React, { Fragment } from "react";
import { Tag } from "antd";
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import {
  FooterLogo,
  Footer,
  FooterCol,
  FooterBottom,
  Ul,
  Row,
  Container,
} from "./styles/footer";
const MainFooter = () => {
  return (
    <Fragment>
      <Footer>
        <FooterLogo>
          <a href="#"></a>
        </FooterLogo>
        <Container>
          <Row>
            <FooterCol>
              <h4>İNSAN KAYNAKLARI</h4>
              <Ul>
                <li>
                  <a href="#">İş Başvuru</a>
                </li>
                <li>
                  <a href="#">Staj Başvuru</a>
                </li>
                <li>
                  <a href="#">Staj Uygulaması</a>
                </li>
                <li>
                  <a href="#">Burs Başvurusu</a>
                </li>
                <li>
                  <a href="#">Çalışma Ortamlarımız</a>
                </li>
                <li>
                  <a href="#">Departmanlar</a>
                </li>
                <li>
                  <a href="#">Statüler</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>İLETİŞİM</h4>
              <Ul>
                <li>
                  <a href="#">Ücretsiz Deneyin</a>
                </li>
                <li>
                  <a href="#">Robot Kirala/Satın Al</a>
                </li>
                <li>
                  <a href="#">İstek Ve Öneri</a>
                </li>
                <li>
                  <a href="#">Etkinlik Daveti</a>
                </li>
                <li>
                  <a href="#">Sponsor Talebi</a>
                </li>
                {/* <li>
                  <a href="#">Guest Referrals</a>
                </li> */}

                {/* <li>
                  <a href="#">Gift cards</a>
                </li>

                <li>
                  <a href="#">Airbnb.org</a>
                </li> */}
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>DESTEK ASİSTANI</h4>
              <Ul>
                <li>
                  <a href="#">Lisans Sistemi</a>
                </li>
                <li>
                  <a href="#">Bilgi Bankası</a>
                </li>
                <li>
                  <a href="#">Sıkça Sorulan Sorular</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Video Yardım</a>
                </li>
                <li>
                  <a href="#">Gizlilik Politikası</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
              <h4>SEKTÖREL ÇÖZÜMLER</h4>
              <Ul>
                <li>
                  <a href="#">Hızlı Satış</a>
                </li>
                <li>
                  <a href="#">Otel</a>
                </li>
                <li>
                  <a href="#">Servis</a>
                </li>
                <li>
                  <a href="#">Internet Cafe</a>
                </li>
                <li>
                  <a href="#">Site Yönetimi</a>
                </li>
              </Ul>
            </FooterCol>
            <FooterCol>
               
                <h4 className="d-inline-block">Bizi Takip Edin</h4>
              <img
            src="https://www.akinsoft.com.tr/logo/images/akinsoft_logo.png?3"
            width="40"
            height="40"
            alt=""
            className="ms-2"
          />{" "}
               
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <Tag
                  icon={<TwitterOutlined />}
                  color="#55acee"
                  style={{ margin: "4px 0px", borderRadius: 5 }}
                >
                  Twitter
                </Tag>
                <Tag
                  icon={<YoutubeOutlined />}
                  color="#cd201f"
                  style={{ margin: "4px 0px", borderRadius: 5 }}
                >
                  Youtube
                </Tag>
                <Tag
                  icon={<FacebookOutlined />}
                  color="#3b5999"
                  style={{ margin: "4px 0px", borderRadius: 5 }}
                >
                  Facebook
                </Tag>
                <Tag
                  icon={<LinkedinOutlined />}
                  color="#55acee"
                  style={{ margin: "4px 0px", borderRadius: 5 }}
                >
                  LinkedIn
                </Tag>
              </div>
              {/*
              <div className="social-links">

                  <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a> 
              </div>
              */}
            </FooterCol>

            <FooterBottom>
              <h5 style={{ color: "rgb(34,34,34)", fontWeight: 400 }}>
                copyright &copy;
                2023
                Company designed by <span>AkınSoft</span>
              </h5>
            </FooterBottom>
          </Row>
        </Container>
      </Footer>
    </Fragment>
  );
};

export default MainFooter;
