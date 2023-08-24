import prisma from '$lib/prisma';
import auth from '$lib/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcryptjs';

export const actions: Actions = {
  async default(event) {
    const data = await event.request.formData();
    const userid = data.get('userid') as string;
    const password = data.get('password') as string;

    const user = await prisma.user.findUnique({
      where: {
        userid: userid
      }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = '계정이 없거나 ID/비밀번호가 잘못되었습니다';
      return fail(401, { userid, error });
    }

    const { token } = await auth(userid);

    event.cookies.set('token', `Bearer ${token}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 14
    });

    throw redirect(302, '/manages/settings');
  }
} satisfies Actions;
