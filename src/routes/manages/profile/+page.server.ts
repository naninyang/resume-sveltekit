import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  const userId = user?.id;
  if (!user) {
    throw redirect(302, '/manages/pass');
  }

  const profiles = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profiles: true
    }
  });

  return {
    props: {
      profiles
    }
  };
};

export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete('token', { path: '/' });

    throw redirect(302, '/manages/pass');
  },
  updateProfile: async (event) => {
    const user = event.locals.user;
    const userId = user?.id;

    if (!user) {
      throw redirect(302, '/manages/pass');
    }

    const formData = new URLSearchParams((await event.request.formData()) as any);
    const data: any = Object.fromEntries(formData);
    data.username_show = data.username_show === 'on';
    data.email_show = data.email_show === 'on';

    await prisma.profile.upsert({
      where: { userId: userId },
      create: {
        ...data,
        userId: userId
      },
      update: {
        ...data
      }
    });
  }
};
