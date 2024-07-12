import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import Jimp from "jimp";

// Import the OpenAI library
import OpenAI from "openai";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize the Superbase library
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL || "",
  process.env.SUPABASE_SECRET_KEY || "",
  { auth: { persistSession: false } }
);

export async function POST(req: Request) {
  try {
    // Get the prompt from the request body
    const { prompt } = await req.json();

    // Call the OpenAI DALL-E API to generate an image based on the prompt
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `In comic book style: ${prompt}`,
      n: 1, // Number of images to generate
    });

    console.log("DALL-E Response", response);

    if (!response || !response.data || !response.data[0].url) {
      return NextResponse.json(
        { error: "An error occurred" },
        { status: 500, statusText: "An error occurred see service logs" }
      );
    }

    //
    // FETCH IMAGE
    // Get the generated image URL from the response
    //
    const generated_image_url = response.data[0].url;
    const image_target = await Jimp.read(generated_image_url);

    //
    // GENERATE UNIQUE ID
    //
    const uuid = uuidv4();

    //
    // UPLOAD IMAGE
    //
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET || "")
      .upload(
        `public/${uuid}.png`,
        await image_target.getBufferAsync(Jimp.MIME_PNG),
        {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/png",
        }
      );

    if (error) {
      return NextResponse.json(error, {
        status: 500,
        statusText: "An error occurred storing image",
      });
    }

    //
    // CREATE FINAL URL
    //
    console.log("Upload result", data);
    const end_image_url = `${process.env.SUPABASE_PROJECT_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${data.path}`;
    console.log(`Uploaded URL is ${end_image_url}`);

    // Return the image URL as the response
    return NextResponse.json({
      revised_prompt: response.data[0].revised_prompt,
      url: end_image_url,
      uuid,
    });
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error:", error);
    return NextResponse.json(error, {
      status: 500,
      statusText: "An error occurred",
    });
  }
}
