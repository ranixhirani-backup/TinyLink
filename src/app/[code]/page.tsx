import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

/**
 * Redirect /:code to the target URL and increment click count
 */
export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  try {
    const { code } = params;

    // Find the link
    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      notFound();
    }

    // Increment clicks and update lastClicked
    await prisma.link.update({
      where: { code },
      data: {
        clicks: link.clicks + 1,
        lastClicked: new Date(),
      },
    });

    // Redirect with 307 temporary redirect
    redirect(link.targetUrl);
  } catch (error) {
    console.error('Error in redirect:', error);
    notFound();
  }
}
