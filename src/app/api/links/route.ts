import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isValidUrl, isValidCode, generateRandomCode } from '@/lib/validation';

/**
 * POST /api/links
 * Create a new shortened link
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetUrl, code: customCode } = body;

    // Validate targetUrl
    if (!targetUrl || typeof targetUrl !== 'string') {
      return NextResponse.json(
        { error: 'targetUrl is required and must be a string' },
        { status: 400 }
      );
    }

    if (!isValidUrl(targetUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Determine code to use
    let code: string;

    if (customCode) {
      // Validate custom code
      if (!isValidCode(customCode)) {
        return NextResponse.json(
          { error: 'Code must be 6-8 alphanumeric characters' },
          { status: 400 }
        );
      }

      // Check if code already exists
      const existingLink = await prisma.link.findUnique({
        where: { code: customCode },
      });

      if (existingLink) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }

      code = customCode;
    } else {
      // Generate random code
      code = generateRandomCode();

      // Ensure generated code doesn't exist
      let attempts = 0;
      while (attempts < 10) {
        const existing = await prisma.link.findUnique({
          where: { code },
        });
        if (!existing) break;
        code = generateRandomCode();
        attempts++;
      }

      if (attempts === 10) {
        return NextResponse.json(
          { error: 'Failed to generate unique code' },
          { status: 500 }
        );
      }
    }

    // Create link in database
    const link = await prisma.link.create({
      data: {
        code,
        targetUrl,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/links
 * Get all links
 */
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
