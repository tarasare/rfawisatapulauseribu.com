import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const avatarUrl = "/assets/profile/wa.png";

const FloatingWhatsappWidget = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="6285711697270"
      accountName="RFA Wisata"
      avatar={avatarUrl}
      statusMessage="Balas cepat dalam 1 jam"
      chatMessage="Halo! 👋 Ada yang bisa kami bantu untuk rencana liburan ke Pulau Seribu?"
      placeholder="Tulis pesan..."
      allowEsc
      allowClickAway
      notification
      notificationDelay={30}
      buttonClassName="rfa-whatsapp-button"
    />
  );
};

export default FloatingWhatsappWidget;
