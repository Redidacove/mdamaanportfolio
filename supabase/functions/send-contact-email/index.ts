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

    // Send thank you email to the user with email verification
    const userEmailResponse = await resend.emails.send({
      from: "MD Amaan <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8b5cf6; margin-bottom: 10px;">Thank You for Reaching Out!</h1>
            <p style="color: #6b7280; font-size: 16px;">Hi ${name}, I'm excited to connect with you! 🎉</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8fafc, #e0e7ff); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
            <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">Your Message:</h3>
            <p style="color: #4b5563; font-style: italic; line-height: 1.6; margin: 0;">"${message}"</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="margin: 0 0 15px 0; color: #374151;">Thank you for your interest! I really appreciate you taking the time to connect with me.</p>
            <p style="margin: 0; color: #374151;"><strong>I'll get back to you within 24 hours.</strong></p>
          </div>
          
          <div style="text-align: center; margin: 35px 0;">
            <p style="color: #6b7280; margin-bottom: 20px;">Want to schedule a meeting right away? Let's chat!</p>
            <a href="${Deno.env.get("CALENDLY_LINK")}" 
               style="background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 10px; 
                      display: inline-block;
                      font-weight: bold;
                      font-size: 16px;
                      box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
                      transition: all 0.3s ease;">
              📅 Schedule a Meeting
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin-top: 0; margin-bottom: 10px;">🚀 What I can help you with:</h4>
            <ul style="color: #78350f; margin: 0; padding-left: 20px;">
              <li>Blockchain Development & Smart Contracts</li>
              <li>Ethereum & Web3 Projects</li>
              <li>Rust & Go Development</li>
              <li>Technical Consulting & Architecture</li>
            </ul>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; margin-bottom: 5px;">Best regards,</p>
            <p style="color: #1f2937; font-weight: bold; margin: 0;"><strong>MD Amaan</strong></p>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Blockchain Developer & Web3 Enthusiast</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
            <p style="font-size: 12px; color: #9ca3af;">
              This email was sent because you contacted me through my portfolio website.<br>
              If you have any questions, feel free to reply to this email.
            </p>
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