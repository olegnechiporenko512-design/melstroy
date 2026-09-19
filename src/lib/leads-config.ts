/**
 * Facebook Pixel — ID з Events Manager (Налаштування пікселя).
 * Вставте лише цифри, наприклад "123456789012345".
 */
export const META_PIXEL_ID = "";

/**
 * URL веб-додатку Google Apps Script.
 * Коли таблицю створено — вставте сюди посилання Deploy → Web app.
 * Поки порожньо, заявки все одно приймаються (екран «дякуємо»).
 *
 * Скрипт для таблиці (Розширення → Apps Script):
 *
 * function doPost(e) {
 *   const ss = SpreadsheetApp.getActiveSpreadsheet();
 *   let sheet = ss.getSheetByName("Заявки");
 *   if (!sheet) {
 *     sheet = ss.insertSheet("Заявки");
 *     sheet.appendRow(["Дата","Імʼя","Телефон","Пакет","Ціна","Джерело"]);
 *   }
 *   const d = JSON.parse(e.postData.contents);
 *   sheet.appendRow([new Date(), d.name, d.phone, d.pack, d.price, d.source || ""]);
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ ok: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */
export const LEADS_WEBHOOK_URL = "";
