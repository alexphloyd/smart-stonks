import * as bcrypt from 'bcrypt';

export async function comparePasswordWithHash(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
