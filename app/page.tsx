'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  MAX_CONTENT_LENGTH,
  fetchMatchingHashtags,
  extractHashtags,
  resizeTextareaElement,
} from '@/helper/textareaHelper';
import Button from '@mui/material/Button';
import { Hashtag } from '@/interface/hashtag';
import apiClient from '@/lib/apiClient';
import NoteContainer from '@/components/TextAreaComponent';

export default function Publish() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHashtagMode, setIsHashtagMode] = useState(false);
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [matchedHashtags, setMatchedHashtags] = useState<Hashtag[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const cursorPositionRef = useRef<number | null>(null);

  useEffect(() => {
    resizeTextareaElement(textareaRef, divRef, containerRef);
    const currentHashtags = extractHashtags(content);
    setHashtags(currentHashtags);

    if (cursorPosition > 0) {
      const characterBeforeCursor = content[cursorPosition - 1];
      const specialCharactersRegex = /[ \n!@$%^&*()-=_+|,.?/{}[\];'":`~<>，。？（）【】、《》]/;

      if (specialCharactersRegex.test(characterBeforeCursor)) {
        setIsHashtagMode(false);
      }
      if (characterBeforeCursor === '#') {
        setMatchedHashtags([]);
        setIsHashtagMode(true);
      }
    }
    if (isHashtagMode) {
      fetchMatchingHashtags(content, textareaRef, setMatchedHashtags);
    }
  }, [content, cursorPosition, isHashtagMode]);

  const handlePublish = async () => {
    const formData = new FormData();

    formData.append(
      'createBlogDTO',
      JSON.stringify({
        Description: content,
        Hashtags: hashtags,
      }),
    );

    try {
      const response = await apiClient.post('/dotnet-api/api/blog/CreateBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        return;
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  return (
    <div className="w-[393px] h-[90vh] mt-[30px] p-4 bg-white border border-gray-200 rounded-lg overflow-auto mx-auto">
      <div className="flex flex-col items-start mt-[30px] px-4">
        <h2 className="text-2xl sm:text-2xl font-bold mb-5 sm:mb-6 text-[#434343]">创建笔记</h2>

        <div className="flex justify-start mt-3">
          <h3 className="text-[#434343]">笔记正文</h3>
        </div>

        <NoteContainer
          content={content}
          setContent={setContent}
          matchedHashtags={matchedHashtags}
          isHashtagMode={isHashtagMode}
          setIsHashtagMode={setIsHashtagMode}
          textareaRef={textareaRef}
          divRef={divRef}
          containerRef={containerRef}
          cursorPositionRef={cursorPositionRef}
          setCursorPosition={setCursorPosition}
          MAX_CONTENT_LENGTH={MAX_CONTENT_LENGTH}
        />

        <div className="flex items-center justify-center my-20 w-[20rem] h-[2.5rem] rounded-lg relative">
          <Button
            variant="contained"
            className="text-white text-base w-[7.5rem] h-[3rem]"
            onClick={handlePublish}
            disabled={!content}
          >
            发布
          </Button>
        </div>

        {/* Display Extracted Hashtags */}
        <div className="p-2 w-full border-t-2">
          <h3 className="text-lg font-medium text-[#434343] mb-2">提取到的标签:</h3>
          {hashtags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full"
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">未提取到标签</p>
          )}
        </div>
      </div>
    </div>
  );
}
