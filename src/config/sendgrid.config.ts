import { registerAs } from '@nestjs/config';

export default registerAs('sendgrid', () => ({
  sendGridApiKey: process.env.SENDGRID_API_KEY,
}));
