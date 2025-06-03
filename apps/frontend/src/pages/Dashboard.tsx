import { useState, useEffect } from "react"

import { useAuth } from "../hooks"

import { getNotes, createNote, updateNote, deleteNote } from "../services"

import { Navbar, NoteList, NoteModal } from "../components"

import type { CreateNote, EditNote, Note } from "../types"

export const Dashboard = () => {
  const { user } = useAuth()

  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setIsLoading(true)

    const { data, error } = await getNotes()

    if (!data && error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setNotes(data || [])
    setIsLoading(false)
    setError("")
  }

  const handleCreateNote = async (note: CreateNote) => {
    if (!user) return;

    const { data, error } = await createNote({
      ...note,
      userId: user?.id
    })

    if (!data || !data?.note || error) {
      setError(error || "Error al crear la nota")
      return
    } 

    setNotes([...notes, data?.note])
    setIsModalOpen(false)
  }

  const handleUpdateNote = async (note: EditNote) => {
    if (!note.id) return;

    const { data, error } = await updateNote(note.id, note)

    if (!data || !data?.note || error) {
      setError(error || "Error al crear la nota")
      return
    } 

    const updatedNote = data.note

    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)))
    setIsModalOpen(false)
    setCurrentNote(null)
  }

  const handleDeleteNote = async (id: string) => {
    const { data, error } = await deleteNote(id)

    if (!data || error) {
      setError(error || "Error al eliminar la nota")
      return
    }

    setNotes(notes.filter((note) => note.id !== id))
  }

  const openCreateModal = () => {
    setCurrentNote(null)
    setIsModalOpen(true)
  }

  const openEditModal = (note: Note) => {
    setCurrentNote(note)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={user?.name || ""} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mis Notas</h1>
          <button onClick={openCreateModal} className="btn btn-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nueva Nota
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <NoteList
            notes={notes}
            onEdit={openEditModal}
            onDelete={handleDeleteNote}
          />
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        note={currentNote}
        onClose={() => {
          setIsModalOpen(false)
          setCurrentNote(null)
        }}
        onCreate={handleCreateNote}
        onEdit={handleUpdateNote}
      />
    </div>
  )
}
