import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    // Send thank you email to the user
    const userEmailResponse = await resend.emails.send({
      from: "MD Amaan <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8b5cf6; text-align: center;">Thank You for Reaching Out!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for your message! I really appreciate you taking the time to connect with me.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
            <p style="color: #6b7280; font-style: italic;">"${message}"</p>
          </div>
          
          <p>I'll get back to you as soon as possible, usually within 24 hours.</p>
          
          <p>In the meantime, feel free to check out my work or schedule a meeting:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("CALENDLY_LINK")}" 
               style="background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block;
                      font-weight: bold;">
              Schedule a Meeting
            </a>
          </div>
          
          <p>Looking forward to our conversation!</p>
          <p>Best regards,<br><strong>MD Amaan</strong><br>Blockchain Developer</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            This email was sent because you contacted me through my portfolio website.
          </p>
        </div>
      `,
    });

    // Send notification email to me
    const notificationEmailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["mdamaan2xx1@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">New Contact Form Submission</h1>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
            <h3 style="margin-top: 0; color: #374151;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}" 
               style="background: #1f2937; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block;
                      font-weight: bold;">
              Reply to ${name}
            </a>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { userEmailResponse, notificationEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      userEmailId: userEmailResponse.data?.id,
      notificationEmailId: notificationEmailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);