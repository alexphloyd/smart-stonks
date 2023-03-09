import * as bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string) {
  return await bcrypt.hash(plainPassword, await bcrypt.genSalt(10));
}
