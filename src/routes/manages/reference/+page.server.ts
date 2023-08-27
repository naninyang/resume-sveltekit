import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  const userId = user?.id;
  if (!user) {
    throw redirect(302, '/manages/pass');
  }

  const references = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      military_services: true
    }
  });

  return {
    props: {
      references
    }
  };
};

export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete('token', { path: '/' });

    throw redirect(302, '/manages/pass');
  },
  updateSinglepart: async (event) => {
    const user = event.locals.user;
    const userId = user?.id;

    if (!user) {
      throw redirect(302, '/manages/pass');
    }

    const formData = new URLSearchParams((await event.request.formData()) as any);
    const data: any = Object.fromEntries(formData);

    await prisma.reference.upsert({
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
