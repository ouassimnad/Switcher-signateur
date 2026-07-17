# مبدّل توقيعات Gmail

تطبيق شخصي: تسجل دخول بـ Google، تختار تصميم توقيع، تعمر معلوماتك، و تدوس زر واحد باش يتبدل التوقيع مباشرة فحساب Gmail تاعك (عبر Gmail API — بلا ما تدخل للإعدادات و تلصق يدوي).

## 1) تحضير Google Cloud (مرة وحدة فقط)

1. روح لـ [console.cloud.google.com](https://console.cloud.google.com) وسجل دخول بنفس حساب Gmail تاعك
2. أنشئ مشروع جديد (New Project) — سميه مثلاً `signature-switcher`
3. من القائمة الجانبية: **APIs & Services → Library** → دور على "Gmail API" → فعّلها (Enable)
4. **APIs & Services → OAuth consent screen**:
   - User type: **External**
   - عمر الاسم، الإيميل تاعك، و فاش يطلب Scopes زيد: `.../auth/gmail.settings.basic`
   - فـ "Test users" زيد الإيميل تاعك (باش تقدر تسجل دخول حتى قبل ما توافق Google على التطبيق رسميًا — يكفي لاستعمال شخصي)
5. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**
   - Authorized redirect URIs: زيد هذا (بدّل الدومين بالي راح يكون تاعك فـ Vercel):
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - احفظ، و راح يعطيوك **Client ID** و **Client Secret** — خبيهم

## 2) رفع المشروع (GitHub → Vercel، نفس الطريقة المعتادة)

1. أنشئ repo جديد فـ GitHub، ارفع كل ملفات هاذ المجلد (Upload files)
2. روح لـ [vercel.com](https://vercel.com) → New Project → اربط الـ repo
3. قبل الـ Deploy، زيد فـ **Environment Variables**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET` (أي نص عشوائي طويل)
   - `NEXTAUTH_URL` → `https://your-app.vercel.app` (نفس الدومين لي راح يعطيك Vercel)
4. Deploy

⚠️ إذا الدومين تاع Vercel تبدل بعد أول Deploy، لازم ترجع لـ Google Console و تصلح الـ Redirect URI، و كذلك `NEXTAUTH_URL` فـ Vercel.

## 3) الاستعمال

1. افتح الموقع → "تسجيل الدخول بـ Google"
2. اختار تصميم، عمر معلوماتك
3. دوس "تفعيل هذا التوقيع على Gmail" → يتبدل التوقيع مباشرة، ماشي محتاج تروح لإعدادات Gmail

## ملاحظة على الصور و الأنيميشن

باش الصورة/الـ GIF يبانو عند لي يستقبل الإيميل منك، لازم يكونو مستضافين (hosted) فرابط https:// حقيقي — مثلاً ترفعهم لموقعك الشخصي ولا لأي مكان يعطيك رابط مباشر للصورة. الرابط تحطو فخانة "رابط اللوغو" فالفورم.
