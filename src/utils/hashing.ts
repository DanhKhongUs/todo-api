import { compare, hash } from "bcryptjs";
import { createHash, createHmac } from "crypto";

export const doHash = async (
  value: string,
  saltRounds: 12
): Promise<string> => {
  return await hash(value, saltRounds);
};

export const doHashValidation = async (
  value: string,
  hashedValue: string
): Promise<Boolean> => {
  return await compare(value, hashedValue);
};

export const hmacProcess = (value: string, key: string): string => {
  return createHmac("sha256", key).update(value).digest("hex");
};
