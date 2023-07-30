import bcrypt from "bcrypt";

const rounds: number = Number(process.env.BCRYPT_SALT_ROUNDS);

export const encryptData = async (data: any) => {
  const salt = bcrypt.genSaltSync(rounds);
  const encryptedData = await bcrypt.hash(data, salt);
  return encryptedData;
};
