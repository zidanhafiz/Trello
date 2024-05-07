'use server';
import { MailtrapClient } from 'mailtrap';
import { VerifyData } from './types';

const TOKEN = 'de1a43b65b95ce343952ea4b2e66139d';

const client = new MailtrapClient({ token: TOKEN });

const sender = {
  email: 'hrofiyani@gmail.com',
  name: 'Trello',
};

export const sendVerifyEmail = async (verifyData: VerifyData) => {
  const recipients = [
    {
      email: verifyData.email,
    },
  ];

  const verifyLink = `https://localhost:3000/register/${verifyData.userId}/verify?token=${verifyData.token}`;

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

  const verifyLink = `https://localhost:3000/register/${verifyData.userId}/verify?token=${verifyData.token}`;

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
