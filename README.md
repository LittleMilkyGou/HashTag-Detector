# Hashtag Detector

A modern, modular React component library for hashtag detection, highlighting, and auto-completion. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real-time Hashtag Highlighting** - Automatically highlights hashtags as you type
- **Smart Auto-completion** - Intelligent hashtag suggestions with usage statistics
- **Hashtag Extraction** - Automatically extracts and displays all hashtags from text
- **Modular Architecture** - Clean, reusable components following React best practices
- **TypeScript Support** - Full type safety and excellent developer experience
- **Responsive Design** - Works seamlessly across all device sizes
- **Auto-resizing Textarea** - Dynamically adjusts height based on content
- **Character Limit** - Built-in character counting and validation

## 🚀 Demo

Visit the [live demo](your-demo-url) to see all features in action.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hashtag-detector.git

# Navigate to project directory
cd hashtag-detector

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
hashtag-detector/
├── components/
│   ├── ui/                          # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── hashtag/                     # Hashtag-specific components
│   │   ├── HashtagEditor.tsx        # Complete hashtag editor
│   │   ├── HashtagInput.tsx         # Core input component
│   │   ├── HashtagHighlighter.tsx   # Text highlighting component
│   │   ├── HashtagSuggestions.tsx   # Suggestion dropdown
│   │   ├── HashtagButton.tsx        # Hashtag insert button
│   │   └── ExtractedHashtags.tsx    # Extracted tags display
│   └── layout/                      # Layout components
│       ├── Container.tsx
│       └── Header.tsx
├── hooks/                           # Custom React hooks
│   ├── useHashtagInput.ts          # Input state management
│   ├── useHashtagSuggestions.ts    # Suggestion logic
│   └── useTextareaResize.ts        # Auto-resize functionality
├── utils/                          # Utility functions
│   ├── hashtagParser.tsx           # Text parsing and highlighting
│   ├── textUtils.ts                # Text processing utilities
│   └── constants.ts                # Application constants
├── types/                          # TypeScript type definitions
│   ├── hashtag.ts                  # Hashtag-related types
│   └── common.ts                   # Common types
├── services/                       # API services
│   └── hashtagService.ts           # Hashtag API operations
└── app/                            # Next.js app directory
    ├── page.tsx                    # Main application page
    ├── demo/                       # Interactive demo
    └── api/hashtag/                # API endpoints
```

## 🎯 Usage

### Basic Usage

```tsx
import { HashtagEditor } from '@/components/hashtag/HashtagEditor';

function MyComponent() {
  const handleContentChange = (content: string) => {
    console.log('Content:', content);
  };

  const handleHashtagsChange = (hashtags: string[]) => {
    console.log('Hashtags:', hashtags);
  };

  return (
    <HashtagEditor
      onContentChange={handleContentChange}
      onHashtagsChange={handleHashtagsChange}
      maxLength={500}
      showExtractedTags={true}
    />
  );
}
```

### Individual Components

```tsx
import { HashtagInput } from '@/components/hashtag/HashtagInput';
import { HashtagHighlighter } from '@/components/hashtag/HashtagHighlighter';
import { ExtractedHashtags } from '@/components/hashtag/ExtractedHashtags';

// Use components individually for more control
function CustomEditor() {
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState([]);

  return (
    <div>
      <HashtagInput
        content={content}
        onContentChange={setContent}
        onCursorPositionChange={(pos) => console.log(pos)}
      />
      <ExtractedHashtags hashtags={hashtags} />
    </div>
  );
}
```

### Custom Hooks

```tsx
import { useHashtagInput } from '@/hooks/useHashtagInput';
import { useHashtagSuggestions } from '@/hooks/useHashtagSuggestions';

function CustomComponent() {
  const {
    content,
    cursorPosition,
    handleContentChange,
    insertHashtagAtEnd,
  } = useHashtagInput();

  const {
    suggestions,
    isVisible,
    hideSuggestions,
  } = useHashtagSuggestions(content, cursorPosition, textareaRef);

  // Your custom implementation
}
```

## 🔧 API Reference

### HashtagEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial text content |
| `maxLength` | `number` | `500` | Maximum character limit |
| `onContentChange` | `(content: string) => void` | - | Content change callback |
| `onHashtagsChange` | `(hashtags: string[]) => void` | - | Hashtags change callback |
| `showExtractedTags` | `boolean` | `true` | Show extracted hashtags |
| `className` | `string` | `''` | Additional CSS classes |

### HashtagInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | Current text content |
| `onContentChange` | `(content: string) => void` | - | Content change handler |
| `onCursorPositionChange` | `(position: number) => void` | - | Cursor position handler |
| `maxLength` | `number` | `500` | Maximum character limit |
| `placeholder` | `string` | `'Enter your text here...'` | Placeholder text |
| `className` | `string` | `''` | Additional CSS classes |

## 🎨 Customization

### Styling

The components use Tailwind CSS classes and can be customized by:

1. **CSS Classes**: Pass custom classes via the `className` prop
2. **Tailwind Config**: Modify `tailwind.config.ts` for global changes
3. **CSS Variables**: Override color variables in your CSS

### Constants

Modify `utils/constants.ts` to customize:

```tsx
export const MAX_CONTENT_LENGTH = 500;
export const HASHTAG_COLORS = {
  primary: '#0079FF',
  hover: '#005bb5',
};
export const UI_TEXT = {
  HASHTAG_BUTTON: '# Topic',
  CREATE_NOTE: 'Create Note',
  // ... other text constants
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/hashtag-detector](https://github.com/yourusername/hashtag-detector)