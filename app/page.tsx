'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  MAX_CONTENT_LENGTH,
  fetchMatchingHashtags,
  extractHashtags,
  resizeTextareaElement,
} from '@/helper/textareaHelper';
import { Hashtag } from '@/interface/hashtag';
import TextAreaComponent from '@/components/TextAreaComponent';

export default function Publish() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorPositionRef = useRef<number | null>(null);

  const [isHashtagMode, setIsHashtagMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [matchedHashtags, setMatchedHashtags] = useState<Hashtag[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  useEffect(() => {
    resizeTextareaElement(textareaRef, divRef, containerRef);
    const currentHashtags = extractHashtags(content);
    setHashtags(currentHashtags);

    if (cursorPosition > 0) {
      const characterBeforeCursor = content[cursorPosition - 1];
      const specialCharactersRegex = /[ \n!@$%^&*()-=_+|,.?/{}[\];'":`~<>，。？（）【】、《》]/;

      // If the character before cursor is not letter, then stop fetching
      if (specialCharactersRegex.test(characterBeforeCursor)) {
        setIsHashtagMode(false);
      }

      // If the character before cursor is '#', then start fetching
      if (characterBeforeCursor === '#') {
        setMatchedHashtags([]);
        setIsHashtagMode(true);
      }
    }
    if (isHashtagMode) {
      fetchMatchingHashtags(content, textareaRef, setMatchedHashtags);
    }
  }, [content, cursorPosition, isHashtagMode]);


  return (
    <div className="w-[393px] h-[90vh] mt-[30px] p-4 bg-white border border-gray-200 rounded-lg overflow-auto mx-auto">
      <div className="flex flex-col items-start mt-[30px] px-4">
        <h2 className="text-2xl sm:text-2xl font-bold mb-5 sm:mb-6 text-grayPrimary">创建笔记</h2>

        <div className="flex justify-start mt-3">
          <h3 className="text-grayPrimary">笔记正文</h3>
        </div>

        <TextAreaComponent
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

        
        {/* Display Extracted Hashtags */}
        <div className="p-2 w-full mt-10 border-t-2">
          <h3 className="text-lg font-medium text-grayPrimary mb-">提取到的标签:</h3>
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
