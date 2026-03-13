export const normalizePhone = (phone: string | null) =>
  phone ? phone.replace(/\D/g, "").slice(-11) : "";
