'use client';
import React from 'react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { HashtagEditor } from '@/components/hashtag/HashtagEditor';
import { UI_TEXT } from '@/utils/constants';

export default function HomePage() {
  const handleContentChange = (content: string) => {
    // Handle content changes if needed
    console.log('Content changed:', content);
  };

  const handleHashtagsChange = (hashtags: string[]) => {
    // Handle hashtag changes if needed
    console.log('Hashtags extracted:', hashtags);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <Container maxWidth="lg">
          <div className="relative py-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              ✨ Smart Hashtag Detection
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hashtag Detector
            </h1>

          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container maxWidth="md">
        <div className="pb-16">
          {/* Editor Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {UI_TEXT.CREATE_NOTE}
              </h2>
              <p className="text-gray-600">
                Start typing and watch hashtags with intelligent hashtag highlighting, auto-completion, and extraction
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {UI_TEXT.NOTE_CONTENT}
                </label>
                <HashtagEditor
                  onContentChange={handleContentChange}
                  onHashtagsChange={handleHashtagsChange}
                  showExtractedTags={true}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}