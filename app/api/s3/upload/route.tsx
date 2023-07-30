import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const POST = async (req: NextRequest) => {
  const data = await req.arrayBuffer();

  const s3: S3Client = new S3Client({ region: "us-east-2" });
  const key = `${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: data,
    ContentType: "image/jpeg",
  });
  try {
    s3.send(command);
    const imageUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ imageUrl }, { status: HttpStatusCodes.OK });
  } catch (err) {
    return new NextResponse(null, {
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      statusText: `Error occured when uploading image: ${err}`,
    });
  }
};
