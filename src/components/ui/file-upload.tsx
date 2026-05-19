"use client";

import { useState, useRef } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FileUploadProps {
  bucket?: string;
  value?: string;
  onChange?: (url: string) => void;
  accept?: string;
  className?: string;
}

export function FileUpload({ bucket = "uploads", value, onChange, accept = "image/*", className }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${bucket}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
      setPreview(publicUrl);
      onChange?.(publicUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview("");
    onChange?.("");
    if (inputRef.current) inputRef.current.value = "";
  }

  if (preview) {
    return (
      <div className={`relative group ${className ?? ""}`}>
        {preview.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
          <img src={preview} alt="Uploaded" className="w-full h-32 object-cover rounded-md border border-border" />
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-md border border-border bg-card">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground truncate">{preview.split("/").pop()}</span>
          </div>
        )}
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-[var(--accent-brand)] transition-colors ${className ?? ""}`}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
      {uploading ? (
        <span className="text-sm text-muted-foreground">Uploading...</span>
      ) : (
        <>
          <Upload className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">Click to upload</span>
        </>
      )}
    </div>
  );
}
