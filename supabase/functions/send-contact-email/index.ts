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

    // Send greeting email to the user
    const userEmailResponse = await resend.emails.send({
      from: "MD Amaan <onboarding@resend.dev>",
      to: [email],
      subject: "Great to See You visiting my portfolio – Want to Chat?",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; line-height: 1.6;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Hi there 👋,</h2>
          
          <p style="color: #374151; margin-bottom: 16px;">
            Thank you so much for visiting my website! I really appreciate you taking the time to explore my work and learn more about what I do.
          </p>
          
          <p style="color: #374151; margin-bottom: 16px;">
            If you're interested in collaborating, discussing a project, or just having a friendly tech chat, I'd love to connect with you.
          </p>
          
          <p style="color: #374151; margin-bottom: 20px;">
            You can easily schedule a meeting with me using the link below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("CALENDLY_LINK")}" 
               style="background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 10px; 
                      display: inline-block;
                      font-weight: bold;
                      font-size: 16px;
                      box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);">
              📅 Schedule a call
            </a>
          </div>
          
          <p style="color: #374151; margin-bottom: 30px;">
            Looking forward to hearing from you and exploring how we can build something great together!
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; margin-bottom: 5px;">Best regards,</p>
            <p style="color: #1f2937; font-weight: bold; margin-bottom: 5px;"><strong>MD Amaan</strong></p>
            <p style="color: #6b7280; margin-bottom: 5px;">Backend Developer | Full-Stack Engineer</p>
            <p style="color: #6b7280; margin-bottom: 5px;">mdamaan2xx1@gmail.com</p>
            <p style="color: #6b7280; margin-bottom: 5px;">GitHub: <a href="https://github.com/Redidacove" style="color: #8b5cf6; text-decoration: none;">https://github.com/Redidacove</a></p>
            <p style="color: #6b7280; margin: 0;">LinkedIn: <a href="https://linkedin.com/in/md-amaan-305010229" style="color: #8b5cf6; text-decoration: none;">https://linkedin.com/in/md-amaan-305010229</a></p>
          </div>
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