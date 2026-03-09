import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.jsx";
import { useToast } from "@/hooks/use-toast.js";

const destinations = [
  "Pulau Pramuka",
  "Pulau Tidung",
  "Pulau Pari",
  "Pulau Harapan",
  "Pulau Kelapa",
  "Custom/Lainnya",
];

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Nama harus minimal 2 karakter";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Masukkan alamat email yang valid";
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Masukkan nomor telepon yang valid";
    }

    if (!formData.destination) {
      newErrors.destination = "Pilih destinasi tujuan";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Pilih tanggal mulai";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Pilih tanggal akhir";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = "Tanggal akhir harus setelah tanggal mulai";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Validasi Error",
        description: "Mohon perbaiki kesalahan pada form sebelum mengirim.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format message for WhatsApp
      const message = `Halo, saya ingin melakukan pemesanan.\nNama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nDestinasi: ${formData.destination}\nTanggal Mulai: ${formData.startDate}\nTanggal Akhir: ${formData.endDate}`;

      // Generate WhatsApp URL
      const whatsappUrl = `https://wa.me/6285926048083?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Berhasil! 🎉",
        description: "Membuka WhatsApp untuk melanjutkan pemesanan Anda.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        startDate: "",
        endDate: "",
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memproses pemesanan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-muted">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Pesan Petualangan Anda
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Siap menjelajahi surga tersembunyi? Isi form di bawah ini dan sistem
          kami akan mengarahkan Anda ke WhatsApp untuk konfirmasi pemesanan.
        </p>

        <div className="bg-card rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-card-foreground">
                  Nama Lengkap *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className={`mt-1 bg-background text-foreground ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-card-foreground">
                  Alamat Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email.anda@contoh.com"
                  className={`mt-1 bg-background text-foreground ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-card-foreground">
                  Nomor Telepon / WA *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="0812 3456 7890"
                  className={`mt-1 bg-background text-foreground ${errors.phone ? "border-destructive" : ""}`}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="destination" className="text-card-foreground">
                  Pilihan Destinasi *
                </Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => handleChange("destination", value)}
                >
                  <SelectTrigger
                    className={`mt-1 bg-background text-foreground ${errors.destination ? "border-destructive" : ""}`}
                  >
                    <SelectValue placeholder="Pilih destinasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.destination}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="startDate" className="text-card-foreground">
                  Tanggal Mulai *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={`mt-1 bg-background text-foreground ${errors.startDate ? "border-destructive" : ""}`}
                />
                {errors.startDate && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="endDate" className="text-card-foreground">
                  Tanggal Akhir *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  min={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  }
                  className={`mt-1 bg-background text-foreground ${errors.endDate ? "border-destructive" : ""}`}
                />
                {errors.endDate && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-white text-lg py-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:translate-y-0"
            >
              Pesan Sekarang (via WhatsApp)
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
