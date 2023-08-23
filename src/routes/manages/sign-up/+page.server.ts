import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

type Errors = {
  userid?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const userid = data.get('userid') as string;
    const username = data.get('username') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const passwordConfirmation = data.get('passwordConfirmation') as string;

    const errors: Partial<Errors> = {};

    const existingUserId = await prisma.user.findUnique({ where: { userid } });
    if (!userid) errors['userid'] = '아이디는 필수 항목입니다';
    else if (userid.length < 4) errors['userid'] = '아이디는 4자 이상 입력해 주세요';
    else if (existingUserId) errors['userid'] = '이미 존재하는 아이디입니다';
    else delete errors['userid'];

    if (!username) errors['username'] = '이름은 필수 항목입니다';
    else if (username.length < 1) errors['username'] = '이름은 2자 이상 입력해주세요';
    else delete errors['username'];

    const existingEmailUser = await prisma.user.findUnique({ where: { email: email } });
    if (!email) errors['email'] = '이메일은 필수 항목입니다';
    else if (!validateEmail(email)) errors['email'] = '이메일 형식이 맞지 않습니다';
    else if (existingEmailUser) errors['email'] = '이미 존재하는 이메일입니다';
    else delete errors['email'];

    if (password.length < 10) errors['password'] = '비밀번호는 10자 이상 입력해 주세요';
    else delete errors['password'];

    if (password !== passwordConfirmation)
      errors['passwordConfirmation'] = '비밀번호가 일치하지 않습니다';
    else delete errors['passwordConfirmation'];

    console.log('Object.keys(errors).length):', Object.keys(errors).length);

    if (Object.keys(errors).length) return fail(400, { errors });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        userid,
        username,
        email: email,
        password: hashedPassword
      }
    });
  }
} satisfies Actions;
