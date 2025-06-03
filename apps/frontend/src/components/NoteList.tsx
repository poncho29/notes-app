import type { Note } from "../types"

interface Props {
  notes: Note[]
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

export const NoteList = ({ notes, onEdit, onDelete }: Props) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tienes notas aún. Crea una nueva nota para comenzar.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="card hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800 mb-2">{note.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(note)}
                className="text-gray-500 hover:text-emerald-600"
                aria-label="Editar nota"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="text-gray-500 hover:text-red-600"
                aria-label="Eliminar nota"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">{note.content}</p>
          <div className="mt-4 text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  )
}
