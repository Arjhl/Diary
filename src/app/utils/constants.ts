export const baseurl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DOMAIN // <-- your domain on live
    : "http://localhost:3000"; // localhost on dev
