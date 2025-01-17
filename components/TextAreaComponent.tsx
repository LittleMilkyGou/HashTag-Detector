'use client';
import React, { RefObject } from 'react';
import {
  updateContent,
  resizeTextareaElement,
  insertHashtag,
  insertContentAtCursor,
  parseTextToHighlightHashtags,
} from '@/helper/textareaHelper';
import { Hashtag } from '@/interface/hashtag';

interface TextAreaComponentProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  matchedHashtags: Hashtag[];
  isHashtagMode: boolean;
  setIsHashtagMode: React.Dispatch<React.SetStateAction<boolean>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  divRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  cursorPositionRef: React.MutableRefObject<number | null>;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
  MAX_CONTENT_LENGTH: number;
}

export default function TextAreaComponent({
  content,
  setContent,
  matchedHashtags,
  isHashtagMode,
  setIsHashtagMode,
  textareaRef,
  divRef,
  containerRef,
  cursorPositionRef,
  setCursorPosition,
  MAX_CONTENT_LENGTH,
}: TextAreaComponentProps) {
  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-start mt-3 relative border border-dashed border-grayDark rounded-[0.5rem] p-2 w-[20rem]"
    >
      {/* Parsed text with highlighted hashtags for display */}
      <div className="relative">
        <div
          ref={divRef}
          className="min-h-28 w-full text-black placeholder-transparent resize-none overflow-hidden focus:outline-none caret-bluePrimary"
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
        >
          {parseTextToHighlightHashtags(content).map((item, index) =>
            typeof item === 'string' ? (
              item.split('\n').map((line, lineIndex) => (
                <React.Fragment key={`${index}-${lineIndex}`}>
                  {line}
                  {lineIndex < item.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))
            ) : (
              item
            )
          )}
        </div>
        
        {/* Textarea for actual input */}
        <textarea
          ref={textareaRef}
          className="min-h-28 w-full text-transparent bg-transparent resize-none overflow-hidden focus:outline-none caret-bluePrimary absolute top-0 left-0"
          placeholder="请输入"
          value={content}
          onChange={(e) =>
            updateContent(
              e,
              setContent,
              setCursorPosition,
              () => resizeTextareaElement(textareaRef, divRef, containerRef),
            )
          }
          maxLength={MAX_CONTENT_LENGTH}
          onSelect={(e) => setCursorPosition((e.target as HTMLTextAreaElement).selectionStart)}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="bg-grayLight w-[3.19rem] h-[1.5rem] flex items-center justify-center rounded-lg">
          <button
            className="text-grayDark text-xs"
            onClick={() => insertHashtag(content, setContent, textareaRef)}
          >
            # 话题
          </button>
        </div>
        <span className="text-grayDark">{MAX_CONTENT_LENGTH - content.length}</span>
      </div>

      {/* Matched Hashtags for selection */}
      {isHashtagMode && (
        <div className="bg-[#FFFFFF] h-auto flex flex-col justify-start rounded-lg shadow-lg z-10 overflow-auto mt-2">
          {matchedHashtags.length > 0 ? (
            matchedHashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex justify-between p-2 text-xs border-b cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  insertContentAtCursor(
                    hashtag.tagName,
                    content,
                    setContent,
                    cursorPositionRef,
                    textareaRef,
                    setIsHashtagMode,
                  )
                }
              >
                <span className="text-grayHover">#{hashtag.tagName}</span>
                <span className="text-grayMuted">{hashtag.tagCount}人使用</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-xs text-gray-500">没有匹配的话题</div>
          )}
        </div>
      )}
    </div>
  );
}
