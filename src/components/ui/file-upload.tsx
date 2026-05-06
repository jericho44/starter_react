import React, { useRef, useState } from 'react'
import { Button } from './button'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
}

export const FileUpload = ({ 
  onFileSelect, 
  accept = "image/*", 
  maxSize = 5 
}: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File is too large. Max size is ${maxSize}MB`)
        return
      }

      setSelectedFile(file)
      onFileSelect(file)

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
    onFileSelect(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4 w-full">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          selectedFile ? "border-primary bg-primary/5" : "border-muted hover:border-primary hover:bg-accent"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        
        {!selectedFile ? (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {maxSize}MB
            </p>
          </>
        ) : (
          <div className="flex items-center gap-4 w-full">
            {preview ? (
              <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded-md border" />
            ) : (
              <div className="h-16 w-16 bg-muted flex items-center justify-center rounded-md border">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation()
                clearFile()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
