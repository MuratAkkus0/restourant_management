import QRCode from "qrcode";
import { env } from "../../config/env.js";

export const qrService = {
  publicMenuUrl(companySlug: string): string {
    return `${env.WEB_PUBLIC_URL}/menu/${companySlug}`;
  },

  async toPng(companySlug: string): Promise<Buffer> {
    return QRCode.toBuffer(qrService.publicMenuUrl(companySlug), {
      type: "png",
      width: 512,
      margin: 2,
    });
  },

  async toSvg(companySlug: string): Promise<string> {
    return QRCode.toString(qrService.publicMenuUrl(companySlug), {
      type: "svg",
      margin: 2,
    });
  },
};
