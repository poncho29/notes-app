export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface CreateNoteResponse {
  note: Note
  message: string
}

export interface CreateNote extends Omit<Note, "id" | "createdAt" | "updatedAt"> {
  userId: string
}

export type EditNote = Partial<Note>
