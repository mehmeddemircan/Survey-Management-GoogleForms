# Akınsoft Anket Proje

bu repository akınsoft anket projesinin genel reposudur backend , admin-frontend , user-frontend kısımlarını içermektedir

## Proje Açıklaması

Admin panelinde kayıt olmadan anket oluşturamazsınız , kayıt olduktan sonra 


 - anket oluşturabilirsiniz
 - anket detaylarını görebilirsiniz
 - anketi güncelleyebilir , resim ekleyebilir veya silebilirsiniz  
 - anketi favorinize ekleyebilirsiniz
 - anket favorilerinizi görebilirsiniz 
 - ankete soru ekleyebilirsiniz 
 - anketteki soruları düzenleyebilir veya silebilirsiniz
 - anket sorularını oluşturduktan sonra önizleyebilirsiniz 
 - anketi kullanıcıya mail olarak atabilirsiniz
 - anket de önzizleme kısmında birden fazla yanıt verebilirsiniz 
 - kullanıcı tarafında ki mailde ki link ile formu doldurabilirsiniz 
 - anket yanıtları her soruya göre görebilirsiniz 
 - profilinizi güncelleyebilirsiniz
 - bütün kullanıcıları liste halinde görebilirsiniz 
 - eğer giriş yapamadınız şifrenizi unuttuysanız , şifremi unuttum diyerek şifrenizi yenileyebilirsiniz  






## Projenin Bağımlılıkların yüklenmesi


bu projeninin bağımlılıklarını yüklemek için (projeyi ayağa kaldırmak için) bu komudu yazın 

```bash
  npm install 

```

## Projenin Çalıştırılması 

projeninin çalıştırılması için terminalde her klasöre gidip bu komudu yazmalısınız 
```bash
  npm start 

```
  
## Kullanılan Teknolojiler

**Server:**
- Node.js
- Express.js
- POSTMAN Collection Requests 
- Jwt 
- MongoDb
- Cloudinary (Resim yüklemek)
- onrender.com ( canlıya çıkmak  )

**Client:**
- React.js
- Redux state management tool
- Antd UI framework
- Bootstrap CSS framework
- i18next localization framework
## API Reference

#### Get Bütün Anketler

```http
  GET /api/get-surveys?page=1&limit=10
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | **Required**. Your API key |
| `limit` | `int` | **Required**. Your API key |

#### Get Anket Detayları

```http
  GET /api/surveys/${id}/details
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get Anket Soruları

```http
  GET /api/surveys/${id}/questions
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get Kullanicilar 

```http
  GET /api/users?limit=2&page=2
```






## Deployment

To deploy this project run

```bash
 Admin Kontrol Paneli

 https://akinsoftanket-admin.onrender.com
```

```bash
 Api

 https://akinsoftanketapi.onrender.com
```
