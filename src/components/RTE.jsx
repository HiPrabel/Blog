import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf.js"; // replace with your actual config

const RichTextEditor = ({ name, control, label, defaultValue }) => {
  const editorRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect Tailwind's "dark" class on <html>
  useEffect(() => {
    const html = document.documentElement;
    const checkDark = () => setIsDarkMode(html.classList.contains("dark"));

    checkDark(); // check on mount

    const observer = new MutationObserver(checkDark);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            key={isDarkMode ? "dark" : "light"} // 🔁 Force re-render on theme switch
            id={name}
            apiKey={conf.tinymceApi}
            value={value}
            onEditorChange={onChange}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              menubar: true,
              skin: isDarkMode ? "oxide-dark" : "oxide",
              content_css: isDarkMode ? "dark" : "default",
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: `
                body {
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 14px;
                }

                h1, h2, h3, p, td, th {
                  color: inherit;
                }

                a { color: inherit; }
              `,
              table_advtab: true,
              table_default_styles: {
                width: "100%",
                borderCollapse: "collapse",
              },
              resize: true,
            }}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
