import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, deliveryType, address, time, items, total, maxTime } = body;

    // Validate minimum required fields
    if (!name || !phone || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    // Generate order ID
    const orderId = `EL-${Math.floor(100000 + Math.random() * 900000)}`;

    // Build the message text using HTML formatting
    let message = `🆕 <b>Новая заявка #${orderId}</b>\n\n`;
    message += `👤 <b>Имя:</b> ${name}\n`;
    message += `📞 <b>Телефон:</b> ${phone}\n`;
    message += `🏥 <b>Способ сдачи:</b> ${deliveryType === 'home' ? 'Выезд на дом 🚗' : 'В филиале 🏢'}\n`;
    
    if (deliveryType === 'home') {
      message += `📍 <b>Адрес:</b> ${address || 'Не указан'}\n`;
      if (time) message += `🕒 <b>Желаемое время:</b> ${time}\n`;
    }
    
    message += `\n🧪 <b>Анализы:</b>\n`;
    items.forEach((item: any, index: number) => {
      message += `${index + 1}. ${item.name} - ${item.price} TJS\n`;
    });
    
    message += `\n💰 <b>Итоговая сумма:</b> ${total} TJS\n`;
    message += `⏱ <b>Макс. срок:</b> ${maxTime} ${maxTime === 1 ? 'день' : 'дня'}\n`;

    // If API keys are missing, log the message to console and pretend it succeeded
    if (!botToken || !chatId) {
      console.log('================ NEW ORDER (MOCK TELEGRAM) ================');
      console.log(message.replace(/<[^>]*>?/gm, '')); // Strip HTML for console
      console.log('===========================================================');
      console.log('Note: To send this to Telegram, set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local');
      
      return NextResponse.json({ 
        success: true, 
        orderId, 
        message: 'Order received (Mock mode - keys not set)' 
      });
    }

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API Error:', data);
      return NextResponse.json({ success: false, error: 'Telegram API Error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
