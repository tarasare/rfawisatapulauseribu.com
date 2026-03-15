with open('apps/web/src/pages/DestinationDetailPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find("const handleOrderNow = () => {")
end_idx = content.find("const whatsappUrl", idx)

r = r"""const handleOrderNow = () => {
    if (!destination || !selectedPackage || !selectedPeople) return;
    const message = `Halo, saya ingin melakukan pemesanan.\nNama: ${name}\nEmail: ${email}\nTelepon: ${phone}\nDestinasi: ${destination.name}\nPaket: ${selectedPackage.name}\nPlan: ${selectedPlan}\nJumlah Orang: ${selectedPeople}\nHarga: ${selectedPrice || "Konfirmasi admin"}\nTanggal Mulai: ${startDate}\nTanggal Akhir: ${endDate}`;
    """

if idx != -1:
    content = content[:idx] + r + content[end_idx:]
    print("Replaced!")
else:
    print("Not found")

with open('apps/web/src/pages/DestinationDetailPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
