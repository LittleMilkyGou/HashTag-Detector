import { hashtags } from '@/dataset/hashtagMock';
import { NextResponse }  from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input")?.toLowerCase();

  const filteredHashtags = hashtags.filter((hashtag) =>
    hashtag.tagName.toLowerCase().includes(input)
  );

  return NextResponse.json({ $values: filteredHashtags });
}