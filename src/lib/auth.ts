import { JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

import { prisma } from '$lib/prisma';

export const auth = async (userid: string) => {
  const user = await prisma.user.findUnique({
    where: {
      userid
    }
  });

  if (!user) {
    return {
      error: 'Invalid credentials'
    };
  }

  const jwtUser = {
    id: user.id,
    email: user.email
  };

  const token = jwt.sign(jwtUser, JWT_ACCESS_SECRET, {
    expiresIn: '14d'
  });

  return { token };
};
