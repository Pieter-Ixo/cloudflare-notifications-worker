import { Hono, Context } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { cors } from 'hono/cors';

import * as Notifications from './handlers/notifications';

const app = new Hono<{
	Bindings: {
		AUTHORIZATION: string;
	};
}>();

app.use('*', poweredBy());

app.use('*', cors());

app.use('*', async (c: Context, next) => {
	if (c.req.header('Authorization') === c.env.AUTHORIZATION) {
		await next();
	} else {
		return c.text('Authorization Failed', 401);
	}
});

app.get('/', (c) => {
	return c.text('Hello IXO!');
});

app.get('/test/:token', Notifications.sendTestNotification);

app.get('/receipt/:ticket', Notifications.fetchTicketReceipt);

export default app;
