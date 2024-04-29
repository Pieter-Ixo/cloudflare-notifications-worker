import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { Context } from 'hono';

export async function sendTestNotification(c: Context) {
	try {
		const expoPushToken = c.req.param('token') as string;
		const expo = new Expo();

		if (!Expo.isExpoPushToken(expoPushToken)) {
			c.status(400);
			return c.json({ error: 'Invalid Expo Push Token' });
		}

		const message: ExpoPushMessage = {
			to: expoPushToken,
			sound: 'default',
			body: 'This is a test notification',
			data: { greet: 'hi' },
		};
		const [chunk] = expo.chunkPushNotifications([message]);
		const [ticket]: ExpoPushTicket[] = await expo.sendPushNotificationsAsync(chunk);

		return c.json(ticket);
	} catch (error) {
		console.error('GET /test/:token', error);
		c.status(500);
		return c.json({ error: (error as Error).message });
	}
}

export async function fetchTicketReceipt(c: Context) {
	try {
		const ticket = c.req.param('ticket') as string;
		const expo = new Expo();

		let receiptIdChunks = expo.chunkPushNotificationReceiptIds([ticket]);
		const receipts = await expo.getPushNotificationReceiptsAsync(receiptIdChunks[0]);
		const receipt = receipts[ticket];

		return c.json(receipt);
	} catch (error) {
		console.error('GET /receipt/:ticket', error);
		c.status(500);
		return c.json({ error: (error as Error).message });
	}
}
