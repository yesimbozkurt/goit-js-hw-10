import { defineConfig } from "vite";
import process from "process";

// console.log(process.env.npm_package_name); // nesne dizisidir. içinde proje ismi yazar.
// console.log(process.env.NODE_ENV); // DEVELOPMENT gelir (geliştirici modu)
// build ettikten sonra development modundan çıkar production(ürün) moduna geçer.
// clg leri bilgiyi almak için kullanıp kapattık.

const appName = process.env.npm_package_name;
const appMode = process.env.NODE_ENV; // Development or Production


export default defineConfig({
  //uygulama yolu
  base: appMode === "development" ? "/" : `/${appName}/ `,

  // geliştirici modunda ise tek slash ver (ana dizinde olduğunu gösterir)
  //  değilse adını ver (build edince dist klasöründe src yoluna dosya adı eklenir)


  //çalışma dizini
  root: "src", // Vite'nin proje kök dizini olarak 'src' klasörünü kullanmasını sağlar.
  server: {
    port: 5173, // default ta bu gelir değiştirilebilir.
    open: true, // port açıldığında otomatik browserda sayfa açılması için
    cors: true, // (cors etkinleştir) api gibi dışarıdan istekleri kullanabilmek içinn
  },
  build: {
    //çıktı dizini
    outDir: '../dist', // Çıktıyı proje kökünde 'dist' klasörüne alır. Build edilen dosyaların kaydedileceği yer.
    emptyOutDir: true, // çıktı dizinini temizle
  }
});
