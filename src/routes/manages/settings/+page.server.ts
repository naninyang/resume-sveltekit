import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

type Errors = {
  username?: string;
  email?: string;
};

const validateEmail = (email: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  const userId = user?.id;

  if (!user) {
    throw redirect(302, '/manages/pass');
  }

  const userDetails = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      username: true,
      email: true
    }
  });

  return {
    user: {
      ...user,
      username: userDetails?.username,
      email: userDetails?.email
    }
  };
};

export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete('token', { path: '/' });

    throw redirect(302, '/manages/pass');
  },
  updateUser: async (event) => {
    const user = event.locals.user;

    const userId = user?.id;
    const data = await event.request.formData();

    const username = data.get('username') as string;
    const email = data.get('email') as string;

    const errors: Partial<Errors> = {};

    if (!username) errors['username'] = '이름은 필수 항목입니다';
    else if (username.length < 1) errors['username'] = '이름은 2자 이상 입력해주세요';
    else delete errors['username'];

    const existingEmailUser = await prisma.user.findUnique({ where: { email: email } });
    if (!email) errors['email'] = '이메일은 필수 항목입니다';
    else if (!validateEmail(email)) errors['email'] = '이메일 형식이 맞지 않습니다';
    else if (existingEmailUser) errors['email'] = '이미 존재하는 이메일입니다';
    else delete errors['email'];

    if (Object.keys(errors).length) return fail(400, { errors });

    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email: email
      }
    });
  }
} satisfies Actions;
