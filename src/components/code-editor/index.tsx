import React from 'react';

import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { useTheme } from 'src/providers/ThemeProvider';
import { cn } from 'src/utils/classnames';

interface CodeEditorProps extends ReactCodeMirrorProps {
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ className, ...props }) => {
  const { theme } = useTheme();

  return (
    <CodeMirror
      theme={theme === 'dark' ? githubDark : githubLight}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      extensions={[json()]}
      className={cn(
        'text-sm border !border-border rounded-md overflow-hidden has-[>.cm-focused]:ring-ring has-[>.cm-focused]:ring-2',
        className,
      )}
      {...props}
    />
  );
};
