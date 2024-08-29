import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "@/constants/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, contentType } = await request.json();

  try {
    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const ext = name.split(".").at(-1);
    const uid = uuidv4().replace(/-/g, "");
    const filename = `${uid}${ext ? "." + ext : ""}`;

    const { url, fields } = await createPresignedPost(client, {
      Bucket: AWS_BUCKET as string,
      Key: filename,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return NextResponse.json({ url, fields });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
