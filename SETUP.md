# دليل الإعداد — applyidponline.com

موقع جديد بالكامل، Next.js 16 (App Router). هاد الدليل كيشرح كيفاش تفعّل Supabase Storage، Supabase database، Resend، وGoogle Sheets، وتنشر الموقع فـVercel.

---

## 1) تشغيل محلي

```bash
npm install
cp .env.local.example .env.local   # عمر القيم (الأجزاء تحت)
npm run dev
```

## 2) Supabase (تخزين الطلبات والوثائق)

1. استعمل نفس Supabase project ديال شبكة IDP.
2. من Supabase Dashboard، خد:
   - Project URL
   - anon public key
   - service role key
3. حطهم فـ `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=xxxxx
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   SUPABASE_SERVICE_ROLE_KEY=xxxxx
   ```

**كيفاش خدام**: المتصفح كيرفع وثائق الزبون مباشرة لـSupabase Storage باستعمال anon key. السيرفر كيتحقق من paths وكيكتب الطلب فـSupabase باستعمال service role key غير server-side.

الوثائق غادي يتخزنو فـbucket `documents` داخل paths بحال:
`applyidponline/{reference}/front.ext`,
`applyidponline/{reference}/back.ext`,
`applyidponline/{reference}/selfie.ext`,
`applyidponline/{reference}/signature.ext`.

## 3) Resend (إيميلات الطلبات)

1. فعّل Resend وsender verified.
2. حط القيم فـ `.env.local`:
   ```
   RESEND_API_KEY=xxxxx
   RESEND_FROM_EMAIL=contact@applyidponline.com
   OWNER_ADMIN_EMAIL=admin@example.com
   ```

الإيميلات كتخدم best-effort: إيلا وقع مشكل فالإرسال، الطلب كيبقى متسجل وماكيضيعش.

## 4) Google Sheets (نسخة مساعدة اختيارية)

1. دخل [Google Cloud Console](https://console.cloud.google.com) → أنشئ مشروع جديد (أو استعمل واحد كاين).
2. فعّل **Google Sheets API** من "APIs & Services → Library".
3. أنشئ **Service Account** من "APIs & Services → Credentials → Create Credentials → Service Account".
4. من الـ Service Account، أنشئ **Key جديد** (نوع JSON) وحمّلها.
5. من الملف JSON خد:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (خليه بين quotes، والـ `\n` غادي يتبدلو تلقائيا فالكود)
6. أنشئ Google Sheet جديد، وفيه ورقتين (tabs):
   - `Applications` (للطلبات)
   - `ContactMessages` (لرسائل التواصل)
7. من الـ Sheet، دوز على "Share" وزيد الإيميل ديال الـ Service Account (`client_email`) كـ **Editor**.
8. خد الـ Sheet ID من الرابط: `https://docs.google.com/spreadsheets/d/SHEET_ID_HNA/edit` → حطو فـ `GOOGLE_SHEET_ID`.

### أعمدة `Applications` (بالترتيب):
```
Reference | Submitted At | Full Name | Email | Phone | Date of Birth | Sex | Country of Birth |
Country of Residence | Destination | License Categories | Validity (years) | Format |
License Front URL | License Back URL | Passport Photo URL | Signature URL
```

### أعمدة `ContactMessages`:
```
Submitted At | Name | Email | Message
```

## 5) النشر على Vercel

1. `vercel` (أو دوز عبر GitHub import فـ vercel.com).
2. زيد كل environment variables ديال `.env.local` فـ Vercel Project Settings → Environment Variables.
3. تأكد `SITE_URL` مضبوط بـ `https://applyidponline.com` (باش الـ origin check فـ `/api/submit-application` يخدم مزيان).

## 6) ملاحظات مهمة

- **الدفع**: الموقع ماشي مربوط بأي payment gateway (بحسب القرار ديالك). بعد ما كيوصل الطلب لـGoogle Sheets، خاصك تتواصل مع الزبون يدويا للدفع.
- **Rate limiting**: الكود فيه حماية بسيطة (in-memory) على الـAPI routes. إيلا الموقع بدا ياخد traffic كبير، نصيحة تزيد Upstash Redis أو Vercel KV لحماية أقوى (مذكور فالكود `lib/validation.ts`).
- **الخطوط**: Sora / Inter / JetBrains Mono عبر `next/font/google` — كيتحملو تلقائيا مع أول deploy، ماخاصكش تديرلهم حتى حاجة يدويا.
- **الصور المعاد استعمالها**: 8 تصاور فـ `public/images/` جايين من الأرشيف القديم (مسموح بيهم بحسب المواصفة)، الباقي (logo, favicon, hero mockup) جداد بالكامل.
