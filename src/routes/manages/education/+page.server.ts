import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  const userId = user?.id;
  if (!user) {
    throw redirect(302, '/manages/pass');
  }

  const educations = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      educations: true
    }
  });

  return {
    props: {
      educations
    }
  };
};

export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete('token', { path: '/' });

    throw redirect(302, '/manages/pass');
  },
  updateAdd: async (event) => {
    const user = event.locals.user;
    const userId = user?.id;

    if (!user) {
      throw redirect(302, '/manages/pass');
    }

    const formData = new URLSearchParams((await event.request.formData()) as any);
    const data: any = Object.fromEntries(formData);

    await prisma.education.create({
      data: {
        ...data,
        userId: userId
      }
    });
  },
  updateEdit: async (event) => {
    const user = event.locals.user;
    const userId = user?.id;

    if (!user) {
      throw redirect(302, '/manages/pass');
    }

    const formData = new URLSearchParams((await event.request.formData()) as any);
    const data: any = Object.fromEntries(formData);

    await prisma.education.update({
      where: { id: Number(data.id) },
      data: {
        school: data.school,
        major: data.major,
        category: data.category,
        stats: data.stats,
        degree: data.degree,
        degree_num: data.degree_num,
        record: data.record,
        start_date: data.start_date,
        end_date: data.end_date,
        userId: userId
      }
    });
  },
  delete: async (event) => {
    const indexId = event.url.searchParams.get('id');
    console.log('indexId: ', indexId);
    await prisma.education.delete({
      where: { id: Number(indexId) }
    });
  }
};
