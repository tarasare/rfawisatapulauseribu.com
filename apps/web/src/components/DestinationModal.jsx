import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";
import { priceTableBase } from "@/data/packages.js";

const packageTemplates = [
  { id: "2n1d-muara", label: "2N1D Muara Angke", tier: 1 },
  { id: "3n2d-muara", label: "3N2D Muara Angke", tier: 2 },
  { id: "1d-pp-muara", label: "1D P-P Muara Angke", tier: 0 },
  { id: "2n1d-baywalk", label: "2N1D BayWalk Mall", tier: 1 },
  { id: "3n2d-baywalk", label: "3N2D BayWalk Mall", tier: 2 },
  { id: "1d-pp-baywalk", label: "1D P-P BayWalk Mall", tier: 0 },
];

const planOptions = ["Paket Standar", "Paket Lengkap"];

const peopleOptions = priceTableBase.map((tier) => tier.group);

const DestinationModal = ({ isOpen, onClose, destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("fasilitas");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Paket Standar");
  const [selectedPeople, setSelectedPeople] = useState("");

  useEffect(() => {
    if (!isOpen || !destination?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, destination]);

  const packageOptions = useMemo(() => {
    if (!destination) return [];
    return packageTemplates.map((pkg) => ({
      ...pkg,
      name: `${destination.name} ${pkg.label}`,
    }));
  }, [destination]);

  const selectedPackage = useMemo(
    () => packageOptions.find((pkg) => pkg.id === selectedPackageId),
    [packageOptions, selectedPackageId],
  );

  const computedPriceTiers = useMemo(() => {
    if (!selectedPackage) return [];
    const increment = (selectedPackage.tier ?? 0) * 100000;
    return priceTableBase.map((tier) => ({
      label: tier.group,
      standar: tier.standard + increment,
      lengkap: tier.lengkap + increment,
    }));
  }, [selectedPackage]);

  const selectedTier = useMemo(
    () => computedPriceTiers.find((tier) => tier.label === selectedPeople),
    [computedPriceTiers, selectedPeople],
  );

  const formatCurrency = (value) =>
    `Rp ${value.toLocaleString("id-ID")}/orang`;

  const selectedPrice = useMemo(() => {
    if (!selectedTier) return "";
    const raw =
      selectedPlan === "Paket Lengkap" ? selectedTier.lengkap : selectedTier.standar;
    return formatCurrency(raw);
  }, [selectedTier, selectedPlan]);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("fasilitas");
      setSelectedPackageId("");
      setSelectedPlan("Paket Standar");
      setSelectedPeople("");
    }
  }, [isOpen, destination]);

  if (!destination) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + destination.images.length) % destination.images.length,
    );
  };

  const handleOrderNow = () => {
    if (!selectedPackage || !selectedPeople) return;
    const message = `Halo, saya ingin pesan paket ${selectedPackage.name} untuk ${destination.name}. Paket: ${selectedPlan}. Jumlah peserta: ${selectedPeople} orang. Harga: ${selectedPrice || "Konfirmasi admin"}.`;
    const whatsappUrl = `https://wa.me/6285711697270?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background rounded-xl shadow-2xl border-none">
        {/* Top Section: Carousel */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full group">
          {destination.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${destination.name} view ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark overlay gradient for top header readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {destination.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Details */}
        <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              {destination.name}
            </DialogTitle>
            <DialogDescription className="text-lg text-primary font-semibold">
              Mulai dari {destination.price} / orang
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <div className="inline-flex rounded-lg border border-border/60 bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("fasilitas")}
                className={`px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === "fasilitas"
                    ? "bg-background text-foreground shadow-sm rounded-md"
                    : "text-muted-foreground"
                }`}
              >
                Fasilitas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("paket")}
                className={`px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === "paket"
                    ? "bg-background text-foreground shadow-sm rounded-md"
                    : "text-muted-foreground"
                }`}
              >
                Pilihan Paket
              </button>
            </div>

            {activeTab === "fasilitas" && (
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <Info className="w-5 h-5 text-primary" />
                    Deskripsi
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.fullDescription || destination.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">
                      Aktivitas & Highlight
                    </h4>
                    <ul className="space-y-2">
                      {destination.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-foreground">
                      Fasilitas
                    </h4>
                    <ul className="space-y-2">
                      {destination.facilities?.map((facility, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Waktu Terbaik untuk Berkunjung
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      {destination.bestTime}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "paket" && (
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">
                    Pilih Paket
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {packageOptions.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setSelectedPackageId(pkg.id);
                          setSelectedPeople("");
                        }}
                        className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                          selectedPackageId === pkg.id
                            ? "border-primary bg-primary/10"
                            : "border-border/60 bg-background hover:border-primary/60"
                        }`}
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {destination.name} {pkg.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Klik untuk pilih paket
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedPackage && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h5 className="text-lg font-semibold text-foreground">
                        {selectedPackage.name}
                      </h5>
                      {selectedPrice && (
                        <span className="text-primary font-semibold">
                          {selectedPrice}
                        </span>
                      )}
                    </div>

                    <div className="overflow-hidden rounded-lg border border-border/60">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/60">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-foreground">
                              Jumlah Peserta
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-foreground">
                              Paket Standar
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-foreground">
                              Paket Lengkap
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {computedPriceTiers.map((tier) => (
                            <tr
                              key={tier.label}
                              className="border-t border-border/60"
                            >
                              <td className="px-4 py-3 text-muted-foreground">
                                {tier.label}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {formatCurrency(tier.standar)}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {formatCurrency(tier.lengkap)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {planOptions.map((plan) => (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => setSelectedPlan(plan)}
                          className={`rounded-md border px-3 py-2 text-sm font-semibold transition-all ${
                            selectedPlan === plan
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/60 text-muted-foreground hover:border-primary/60"
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-foreground">
                        Pilih Paket berapa orang ?
                      </label>
                      <select
                        value={selectedPeople}
                        onChange={(event) => setSelectedPeople(event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Pilih jumlah orang</option>
                        {peopleOptions.map((option) => (
                          <option key={option} value={option}>
                            {option} / Orang
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedPrice && (
                      <p className="text-sm text-muted-foreground">
                        Harga {selectedPlan}: {selectedPrice}
                      </p>
                    )}

                    <Button
                      className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                      onClick={handleOrderNow}
                      disabled={!selectedPeople}
                    >
                      Order Now
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-end sm:items-center sm:gap-4">
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
            {activeTab !== "paket" && (
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setActiveTab("paket")}
              >
                Pesan Sekarang
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
