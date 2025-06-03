import { useState, useEffect, type FormEvent } from "react"

import type { Note, EditNote, CreateNote } from "../types"

interface Props {
  isOpen: boolean
  note: Note | null
  onClose: () => void
  onEdit: (note: EditNote) => void
  onCreate: (note: CreateNote) => void
}

export const NoteModal = ({ isOpen, note, onClose, onEdit, onCreate }: Props) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      setTitle("")
      setContent("")
    }
  }, [note, isOpen])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    if (note) {
      onEdit({
        ...note,
        title,
        content,
      })
    } else {
      onCreate({
        title,
        content,
        userId: "",
      })
    }

    setTitle("")
    setContent("")
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{note ? "Editar Nota" : "Nueva Nota"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Cerrar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Título de la nota"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input min-h-[150px]"
              placeholder="Escribe el contenido de tu nota aquí..."
              rows={5}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {note ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
