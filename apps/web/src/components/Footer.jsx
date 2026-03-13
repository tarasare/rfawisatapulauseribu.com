import React from "react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              RFA Wisata Pulau Seribu
            </h3>
            <p className="text-background/80">
              Your trusted partner for unforgettable island adventures in the
              beautiful Thousand Islands of Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a
                  href="https://www.instagram.com/rfa.pulauseribu?igsh=MTRoeDBpbHd5bzg0OQ=="
                  className="hover:text-background transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://vt.tiktok.com/ZSukx6sam/"
                  className="hover:text-background transition-colors"
                >
                  Tiktok
                </a>
              </li>
              <li>
                <a
                  href="http://facebook.com"
                  className="hover:text-background transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="http://youtube.com"
                  className="hover:text-background transition-colors"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-background/80">
              <li>Email: info@rfawisata.com</li>
              <li>Phone: +62 857-1169-7270</li>
              <li>WhatsApp: +62 857-1169-7270</li>
              <li>Ruko Pelabuhan Utama Pulau Tidung.</li>
              <li>RT.003 / RW. 002, Kelurahan Pulau Tidung </li>
              <li>Kecamatan Kepulauan Seribu Selatan </li>
              <li>Kabupaten Administrasi Kepulauan Seribu </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/80">
          <p>
            © {new Date().getFullYear()} RFA Wisata Pulau Seribu. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
