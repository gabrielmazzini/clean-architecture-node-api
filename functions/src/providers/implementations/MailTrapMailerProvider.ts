import Mail = require("nodemailer/lib/mailer");
import {IMailProvider, IMessage} from "../IMailProvider";
import nodemailer from "nodemailer";

/**
 */
export class MailTrapMailerProvider implements IMailProvider {
  private transporter: Mail;
  /**
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7bbaa9257b95d5",
        pass: "6dcfe6468cc54b",
      },
    });
  }

  /**
   * @param {object} message
   */
  async sendEmail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
