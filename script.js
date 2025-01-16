let port;
let writer;

document.getElementById('connect').addEventListener('click', async () => {
    try {
        port = await navigator.serial.requestPort(); // Kullanıcıdan seri port seçmesi istenir
        await port.open({ baudRate: 9600 }); // HC-05'in baud hızını ayarlayın
        writer = port.writable.getWriter();
        document.getElementById('status').textContent = 'Durum: HC-05 Bağlandı!';
    } catch (error) {
        console.error(error);
        document.getElementById('status').textContent = 'Durum: Bağlantı başarısız.';
    }
});

document.getElementById('send').addEventListener('click', async () => {
    const selectedCommand = document.getElementById('commandSelector')?.value; // Seçilen komut

    if (writer && selectedCommand) {
        const data = new TextEncoder().encode(selectedCommand + '\n'); // Komutu seri porta yaz
        await writer.write(data);
        alert(`Mesaj gönderildi: ${selectedCommand}`);
    } else {
        alert('HC-05 bağlı değil veya içerik seçilmedi.');
    }
});
