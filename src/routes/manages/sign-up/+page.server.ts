import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const userid = data.get('userid');
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirmation = data.get('passwordConfirmation');

    if (!username || !email || !userid || !password || !passwordConfirmation) {
      return fail(400, { missing: true });
    }

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof userid !== 'string' ||
      typeof password !== 'string' ||
      typeof passwordConfirmation !== 'string'
    ) {
      return fail(400, { incorrect: true });
    }

    if (password !== passwordConfirmation) {
      return fail(400, { passwordMismatch: true });
    }

    if (!validateEmail(email)) {
      return fail(400, { incorrect: true });
    }

    const existingEmailUser = await prisma.user.findUnique({ where: { email: email } });
    if (existingEmailUser) {
      return fail(400, { emailExists: true });
    }

    const existingUserId = await prisma.user.findUnique({ where: { userid } });
    if (existingUserId) {
      return fail(400, { useridExists: true });
    }

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
