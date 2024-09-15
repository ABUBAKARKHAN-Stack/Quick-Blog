import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import env from '../ENV-Config/config'

function RTE({ control, defaultValue = "", name, label }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-black">
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name || "Content"}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="2j3oz5bi6infjckpnt70x4b9hfyceai1q9e5fj232c8rpprx"
            init={{
              height: 300,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>

  )
}

export default RTE