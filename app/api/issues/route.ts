import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions)
  if (!session)
    return NextResponse.json({},{status:401});


  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  });

  return NextResponse.json(newIssue, { status: 201 });
}