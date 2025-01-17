import { hashtags } from '@/dataset/hashtagMockdata';
import { NextResponse }  from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input")?.toLowerCase();

  const filteredHashtags = hashtags
    .filter((hashtag) => hashtag.tagName.toLowerCase().startsWith(input))
    .sort((a, b) => b.tagCount - a.tagCount)
    .slice(0, 10);

  return NextResponse.json({ $values: filteredHashtags });
}