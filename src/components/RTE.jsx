import React from 'react'
import conf from "../conf/conf.js";
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={conf.tinymceApi}
        initialValue={defaultValue}

        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,  
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "anchor",
            ],
            style_formats: [
              { title: "Headings", items: [
                  { title: "Heading 1", format: "h1" },
                  { title: "Heading 2", format: "h2" },
                  { title: "Heading 3", format: "h3" },
              ]},
              { title: "Inline", items: [
                  { title: "Bold", format: "bold" },
                  { title: "Italic", format: "italic" },
                  { title: "Underline", format: "underline" },
              ]},
            ],
            toolbar:
            "undo redo | format | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | removeformat | code | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            table_advtab: true,
            table_default_styles: {
                width: "100%",
                borderCollapse: "collapse"
            },
            resize: true,
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
