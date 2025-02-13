import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userEmail, additionalInfo, formData, calculatedCost } = body;

  if (!userEmail) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ivanakrapovic0@gmail.com",
        pass: "qmqb fjle tqnp ipaa",
      },
    });

    const mailOptions = {
      from: '"Solar Inquiry" <ivanakrapovic0@gmail.com>',
      to: "iakrap00@fesb.hr",
      subject: "New Solar Panel Installation Inquiry",
      text: `
        A new inquiry has been submitted:

        kWh Installed: ${formData.kwhInstalled || "Not specified"}
        Roof Type: ${formData.roofType === "sloped" ? "Sloped" : "Straight"}
        Roof Material: ${formData.roofMaterial || "Not specified"}
        Truck Access: ${formData.truckAccess === "yes" ? "Yes" : "No"}
        Lightning Rod: ${formData.lightningRod === "yes" ? "Yes" : "No"}
        Location: ${formData.location || "Not specified"}
        Estimated Cost: €${calculatedCost?.toLocaleString() || "Not calculated yet"}

        Additional Information: ${additionalInfo || "None provided"}

        User Email: ${userEmail}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Inquiry sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send the inquiry." }, { status: 500 });
  }
}
