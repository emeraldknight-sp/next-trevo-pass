export const normalizePhone = (phone: string) =>
  phone ? phone.replace(/\D/g, "").slice(-11) : "";
