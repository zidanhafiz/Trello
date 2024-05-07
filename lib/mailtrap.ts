'use server';
import { MailtrapClient, MailtrapClientConfig } from 'mailtrap';
import { VerifyData } from './types';

const TOKEN = process.env.MAILTRAP_SEND_TOKEN;
const ENDPOINT = process.env.MAILTRAP_SEND_ENDPOINT;
const URL = process.env.URL;

const client = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
} as MailtrapClientConfig);

const sender = {
  email: 'mailtrap@zidanhafiz.site',
  name: 'Trello',
};

export const sendVerifyEmail = async (verifyData: VerifyData) => {
  const recipients = [
    {
      email: verifyData.email,
    },
  ];

  const verifyLink = `${URL}/register/${verifyData.userId}/verify?token=${verifyData.token}`;

  const res = await client.send({
    from: sender,
    to: recipients,
    template_uuid: '1618ac4f-e192-4671-bfbb-597c8ff7425c',
    template_variables: {
      user_name: verifyData.username,
      verify_link: verifyLink,
    },
  });

  console.log(res.message_ids);
  return res;
};

export const resendVerifyEmail = async (verifyData: VerifyData) => {
  const recipients = [
    {
      email: verifyData.email,
    },
  ];

  const verifyLink = `${URL}/register/${verifyData.userId}/verify?token=${verifyData.token}`;

  const res = await client.send({
    from: sender,
    to: recipients,
    template_uuid: '8bbbd675-db8e-4241-ad7c-ab754e3bf8f5',
    template_variables: {
      verify_link: verifyLink,
    },
  });

  console.log(res.message_ids);
  return res;
};
