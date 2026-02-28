import { Resend } from "resend";

let cachedClient = null;

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.MAIL_FROM || "";

  return { apiKey, from };
}

function getClient() {
  const config = getMailConfig();

  if (!config.apiKey || !config.from) {
    console.error("Email configuration is missing in environment variables.");
    return null;
  }

  if (!cachedClient) {
    cachedClient = new Resend(config.apiKey);
  }

  return cachedClient;
}

export async function sendEmail({ to, subject, text, html }) {
  try {
    if (!to || !subject || (!text && !html)) {
      return { success: false, skipped: true, reason: "invalid_payload" };
    }

    const client = getClient();
    const config = getMailConfig();

    if (!client) {
      return { success: false, skipped: true, reason: "missing_resend_config" };
    }

    const payload = {
      from: config.from,
      to,
      subject,
      text: text || undefined,
      html: html || undefined,
    };

    const { error } = await client.emails.send(payload);

    if (error) {
      console.error("Email sending error:", error);
      return { success: false, skipped: false, reason: error.message || "resend_error" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error.message);
    return { success: false, skipped: false, reason: error.message };
  }
}
