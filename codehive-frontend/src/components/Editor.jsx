import React, { useEffect, useRef } from "react";
import { Compartment } from "@codemirror/state";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java, javaLanguage } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

export default function Editor({
  initialCode,
  language,
  onCodeChange,
  onLanguageChange,
}) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const languageCompartment = useRef(new Compartment());

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: initialCode || `// Start coding...\n`,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          history(),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...completionKeymap,
          ]),
          closeBrackets(),
          autocompletion(),
          oneDark,
          languageCompartment.current.of(javascript()),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onCodeChange(update.state.doc.toString());
            }
          }),
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });
      viewRef.current = view;
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      viewRef.current &&
      initialCode !== viewRef.current.state.doc.toString()
    ) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: initialCode || "",
        },
      });
    }
  }, [initialCode]);

  useEffect(() => {
    if (viewRef.current) {
      let langExtension;
      switch (language) {
        case "cpp":
          langExtension = cpp();
          break;
        case "java":
          langExtension = java();
          break;
        case "python":
          langExtension = python();
          break;
        default:
          langExtension = javascript();
          break;
      }
      viewRef.current.dispatch({
        effects: languageCompartment.current.reconfigure(langExtension),
      });
    }
  }, [language]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-2 bg-zinc-800 border-b border-zinc-700">
        <label htmlFor="language-select" className="text-white mr-2">
          Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="p-1 rounded-md border border-zinc-600 bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <div ref={editorRef} className="flex-grow overflow-hidden"></div>
    </div>
  );
}
