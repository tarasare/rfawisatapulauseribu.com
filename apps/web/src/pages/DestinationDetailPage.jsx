import React, { useMemo, useState, useEffect } from "react";
import SeoHelmet from "@/components/SeoHelmet.jsx";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Check, ChevronLeft, ChevronRight, Info, MapPin } from "lucide-react";
import { destinations } from "@/data/destinations.js";
import { priceTableBase } from "@/data/packages.js";
import { packageTemplates } from "@/data/packageTemplates.js";
import Navbar from "@/components/Navbar.jsx";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import Footer from "@/components/Footer.jsx";


const planOptions = ["Paket Standar", "Paket Lengkap"];
const minPeople = 2;
const maxPeople = 500;

const resolveGroupLabel = (count) => {
  if (count >= 20) return "20-100";
  if (count >= 15) return "15-19";
  if (count >= 10) return "10-14";
  if (count === 9) return "9";
  if (count === 8) return "8";
  if (count === 7) return "7";
  if (count === 6) return "6";
  if (count === 5) return "5";
  if (count === 4) return "4";
  if (count === 3) return "3";
  return "2";
};

const steps = [
  {
    title: "Pilih Paket",
    description: "Pilih jenis paket perjalanan yang kamu inginkan.",
  },
  {
    title: "Pilih Plan & Fasilitas",
    description: "Tentukan paket Standar atau Lengkap serta lihat fasilitas.",
  },
  {
    title: "Uraian Kegiatan",
    description: "Lihat itinerary kegiatan selama trip.",
  },
  {
    title: "Jumlah Orang",
    description: "Masukkan jumlah peserta untuk menghitung harga.",
  },
  {
    title: "Ringkasan",
    description: "Cek ringkasan pesanan sebelum order.",
  },
];

const DestinationDetailPage = () => {
  const { slug } = useParams();
  const destination = useMemo(
    () => destinations.find((item) => item.slug === slug),
    [slug],
  );

  const [activeTab, setActiveTab] = useState("fasilitas");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Paket Standar");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setCurrentImageIndex(0);
    setActiveTab("fasilitas");
    setSelectedPackageId("");
    setSelectedPlan("Paket Standar");
    setSelectedPeople("");
    setActiveStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setStartDate("");
    setEndDate("");
  }, [slug]);

  const clampPeople = (value) => Math.min(maxPeople, Math.max(minPeople, value));

  const handlePeopleInput = (value) => {
    if (value === "" || value === null || value === undefined) {
      setSelectedPeople("");
      return;
    }
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return;
    setSelectedPeople(clampPeople(numeric));
  };

  const decrementPeople = () => {
    const current = selectedPeople ? Number(selectedPeople) : minPeople;
    handlePeopleInput(current - 1);
  };

  const incrementPeople = () => {
    const current = selectedPeople ? Number(selectedPeople) : minPeople - 1;
    handlePeopleInput(current + 1);
  };

  const canGoNext =
    (activeStep === 1 && !!selectedPackageId) ||
    (activeStep === 2 && !!selectedPlan) ||
    (activeStep === 3) ||
    (activeStep === 4 && !!selectedPeople) ||
    (activeStep === 5);

  const goNext = () => {
    if (activeStep < steps.length && canGoNext) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

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

  const selectedTier = useMemo(() => {
    if (!selectedPeople) return null;
    const label = resolveGroupLabel(Number(selectedPeople));
    return computedPriceTiers.find((tier) => tier.label === label);
  }, [computedPriceTiers, selectedPeople]);

  const formatCurrency = (value) =>
    `Rp ${value.toLocaleString("id-ID")}/orang`;

  const selectedPrice = useMemo(() => {
    if (!selectedTier) return "";
    const raw =
      selectedPlan === "Paket Lengkap" ? selectedTier.lengkap : selectedTier.standar;
    return formatCurrency(raw);
  }, [selectedTier, selectedPlan]);

  const isEmailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = phone === "" || /^[0-9+\-\s()]{9,16}$/.test(phone);

  const canOrder =
    !!selectedPeople &&
    !!name &&
    !!email &&
    isEmailValid &&
    !!phone &&
    isPhoneValid &&
    !!startDate &&
    !!endDate;

  const handleOrderNow = () => {
    if (!destination || !selectedPackage || !selectedPeople) return;
    const message = `Halo, saya ingin melakukan pemesanan.\nNama: ${name}\nEmail: ${email}\nTelepon: ${phone}\nDestinasi: ${destination.name}\nPaket: ${selectedPackage.name}\nPlan: ${selectedPlan}\nJumlah Orang: ${selectedPeople}\nHarga: ${selectedPrice || "Konfirmasi admin"}\nTanggal Mulai: ${startDate}\nTanggal Akhir: ${endDate}`;
    const whatsappUrl = `https://wa.me/6285711697270?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!destination) {
    return (
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Destinasi tidak ditemukan
          </h1>
          <p className="text-muted-foreground">
            Silakan kembali ke daftar destinasi untuk memilih paket lain.
          </p>
          <Link to="/destinations">
            <Button variant="outline">Kembali ke Destinasi</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SeoHelmet
        title={`${destination.name} || Explore the breathtaking beauty of Pulau Seribu with RFA Wisata. Book your island adventure today and experience crystal clear waters, pristine beaches, and unforgettable memories. Best island tour packages in Indonesia.`}
      />

      <Navbar />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background sm:pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Explore", href: "/destinations" },
              { label: destination.name },
            ]}
          />
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {destination.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                Mulai dari {destination.price} / orang
              </p>
            </div>
            <Link to="/destinations">
              <Button variant="outline">Kembali ke Destinasi</Button>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/60">
            <img
              src={destination.images[currentImageIndex]}
              alt={`${destination.name} view ${currentImageIndex + 1}`}
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
            />
            <button
              type="button"
              onClick={() =>
                setCurrentImageIndex(
                  (prev) =>
                    (prev - 1 + destination.images.length) %
                    destination.images.length,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentImageIndex((prev) => (prev + 1) % destination.images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="inline-flex mt-4 mb-2 rounded-lg border border-border/60 bg-muted/40 p-1">
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
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Deskripsi
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {destination.fullDescription || destination.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Aktivitas & Highlight
                  </h3>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Fasilitas
                  </h3>
                  <ul className="space-y-2">
                    {destination.facilities.map((facility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Waktu Terbaik untuk Berkunjung
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {destination.bestTime}
                  </p>
                </div>
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setActiveTab("paket")}
              >
                Pesan Sekarang
              </Button>
            </div>
          )}

          {activeTab === "paket" && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-border/60 bg-background p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Step {activeStep} dari {steps.length}
                    </p>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {steps[activeStep - 1].title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {steps[activeStep - 1].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={goBack}
                      disabled={activeStep === 1}
                    >
                      Kembali
                    </Button>
                    <Button
                      type="button"
                      onClick={goNext}
                      disabled={activeStep === steps.length || !canGoNext}
                    >
                      Lanjut
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  {activeStep === 1 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      {packageOptions.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => {
                            setSelectedPackageId(pkg.id);
                            setSelectedPeople(minPeople);
                            setActiveStep(2);
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
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {planOptions.map((plan) => (
                          <button
                            key={plan}
                            type="button"
                            onClick={() => {
                              setSelectedPlan(plan);
                            }}
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
                      <p className="text-sm text-muted-foreground">
                        Paket terpilih:{" "}
                        <span className="font-semibold text-foreground">
                          {selectedPackage?.name || "Belum dipilih"}
                        </span>
                      </p>

                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        <h3 className="text-lg font-semibold text-foreground">Fasilitas Didapat - Paket Tidung 2N1D Bay Walk Mall</h3>
                        <ul className="list-none pl-0 space-y-1">
                          <li>✓ Transport kapal PP (kaliadem muara angke - pulau tidung)</li>
                          <li>✓ Penginapan / homestay AC</li>
                          <li>✓ Makan 3x</li>
                          <li>✓ Sepeda santai</li>
                          <li>✓ Alat snorkeling lengkap</li>
                          <li>✓ Kapal snorkeling untuk menuju spot perairan</li>
                          <li>✓ Pendamping snorkeling (guide laut)</li>
                          <li>✓ Pemandu wisata (tour guide)</li>
                          <li>✓ Barbeque</li>
                          <li>✓ Welcome drink</li>
                          <li>✓ Camera underwater</li>
                          <li>✓ Banana boat (berlaku untuk paket lengkap)</li>
                          <li>✓ Jalan-jalan ke pantai jembatan cinta</li>
                          <li>✓ Jalan-jalan ke pantai saung cemara</li>
                          <li>✓ Jalan-jalan ke pantai saung sunset / tanjung barat</li>
                        </ul>

                        <h4 className="font-semibold text-foreground mt-4">Keterangan:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Paket STANDAR: Belum termasuk banana boat</li>
                          <li>Paket LENGKAP: Sudah termasuk banana boat</li>
                        </ul>

                        <h4 className="font-semibold text-foreground mt-4">Biaya Diluar Paket:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Tip guide</li>
                          <li>Parkir sepeda saat masuk objek wisata 2,000/sepeda</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <h3 className="text-lg font-semibold text-foreground">Uraian Kegiatan - Paket Tidung 2N1D Bay Walk Mall</h3>

                      <h4 className="font-semibold text-foreground mt-4">HARI PERTAMA</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>06.00-06.30 WIB:</strong> Sudah berkumpul di pelabuhan Kaliadem Muara Angke, kapal berangkat menuju Pulau Tidung pukul 08.00 WIB.</li>
                        <li><strong>08.00 WIB:</strong> Kapal berangkat menuju Pulau Tidung.</li>
                        <li><strong>10.30 WIB:</strong> Tiba di pelabuhan Pulau Tidung langsung menuju homestay untuk check-in (dipandu tour guide), setelah sampai di homestay istirahat sejenak sambil menikmati welcome drink.</li>
                        <li><strong>11.00-12.00 WIB:</strong> Makan siang.</li>
                        <li><strong>12.00-13.00 WIB:</strong> Istirahat sejenak, menunggu waktu snorkeling tiba.</li>
                        <li><strong>13.00-15.00 WIB:</strong> Snorkeling di perairan/laut Pulau Tidung kecil & Pulau Payung.</li>
                        <li><strong>15.00-16.00 WIB:</strong> Mampir ke Pantai Jembatan Cinta (bermain banana boat bagi yang booking paket lengkap).</li>
                        <li><strong>16.00-17.00 WIB:</strong> Kembali ke homestay.</li>
                        <li><strong>17.00-18.00 WIB:</strong> Hunting sunset di Pantai Tanjung Barat.</li>
                        <li><strong>18.00-19.00 WIB:</strong> Makan malam.</li>
                        <li><strong>19.00-21.00 WIB:</strong> Istirahat sejenak, sambil menunggu waktu barbeque tiba.</li>
                        <li><strong>21.00 WIB:</strong> Barbeque time s/d selesai.</li>
                      </ul>

                      <h4 className="font-semibold text-foreground mt-6">HARI KEDUA</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>05.30-07.30 WIB:</strong> Hunting sunrise di pantai.</li>
                      </ul>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-semibold text-foreground">
                          Jumlah Orang
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={decrementPeople}
                            disabled={
                              selectedPeople !== "" && Number(selectedPeople) <= minPeople
                            }
                            className="h-10 w-10 rounded-md border border-input bg-background text-foreground disabled:opacity-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={minPeople}
                            max={maxPeople}
                            step={1}
                            inputMode="numeric"
                            value={selectedPeople}
                            onChange={(event) => handlePeopleInput(event.target.value)}
                            className="h-10 w-24 rounded-md border border-input bg-background px-3 text-center text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder={`${minPeople}-${maxPeople}`}
                          />
                          <button
                            type="button"
                            onClick={incrementPeople}
                            disabled={
                              selectedPeople !== "" && Number(selectedPeople) >= maxPeople
                            }
                            className="h-10 w-10 rounded-md border border-input bg-background text-foreground disabled:opacity-50"
                          >
                            +
                          </button>
                          <span className="text-sm text-muted-foreground">orang</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Harga mengikuti tier jumlah peserta.
                        </p>
                      </div>

                      {selectedPrice && (
                        <p className="text-sm font-semibold text-primary">
                          Harga {selectedPlan}: {selectedPrice}
                        </p>
                      )}

                      <div className="overflow-x-auto rounded-lg border border-border/60">
                        <table className="w-full text-left text-sm text-muted-foreground">
                          <thead className="bg-muted/50 text-xs uppercase text-foreground">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Jumlah Peserta</th>
                              <th className="px-4 py-3 font-semibold">Paket Standar</th>
                              <th className="px-4 py-3 font-semibold">Paket Lengkap</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 bg-background">
                            {computedPriceTiers.map((tier) => (
                              <tr key={tier.label} className="hover:bg-muted/30">
                                <td className="px-4 py-3">{tier.label}</td>
                                <td className="px-4 py-3">{formatCurrency(tier.standar)}</td>
                                <td className="px-4 py-3">{formatCurrency(tier.lengkap)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeStep === 5 && (
                    <div className="space-y-4">
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Paket
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {selectedPackage?.name || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Plan
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {selectedPlan}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Jumlah Orang
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {selectedPeople || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Estimasi Harga
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {selectedPrice || "Konfirmasi admin"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-semibold text-foreground">Nama *</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground">Email *</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full mt-1 rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${!isEmailValid ? 'border-destructive' : 'border-input'}`} required />
                          {!isEmailValid && <p className="text-xs text-destructive mt-1">Format email tidak valid</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground">Telepon *</label>
                          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full mt-1 rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${!isPhoneValid ? 'border-destructive' : 'border-input'}`} required />
                          {!isPhoneValid && <p className="text-xs text-destructive mt-1">Gunakan 9-16 digit angka</p>}
                        </div>
                        <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="text-sm font-semibold text-foreground">Tanggal Mulai *</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-foreground">Tanggal Akhir *</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                          </div>
                        </div>
                      </div>

                      <Button
                        className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                        onClick={handleOrderNow}
                        disabled={!canOrder}
                      >
                        Order Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DestinationDetailPage;
