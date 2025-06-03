import { isAxiosError } from "axios";

import { api } from "../lib"

import type { CreateNote, CreateNoteResponse, EditNote, Note, Result } from "../types";

export const createNote = async (note: CreateNote): Promise<Result<CreateNoteResponse>> => {
  try {
    const response = await api.post("/note", note);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error creating note:", error);
    let errorMsg = "Error creando la nota";

    if (isAxiosError(error)) {
      errorMsg = error.response?.data?.message;
    }

    return { data: null, error: errorMsg };
  }
}

export const getNotes = async (): Promise<Result<Note[]>> => {
  try {
    const response = await api.get("/note");
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching notes:", error);
    let errorMsg = "Error al obtener las notas";

    if (isAxiosError(error)) {
      errorMsg = error.response?.data?.message || errorMsg;
    }

    return { data: null, error: errorMsg };
  }
}

export const getNote = async (id: string): Promise<Result<Note>> => {
  try {
    const response = await api.get(`/note/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching notes:", error);
    let errorMsg = "Error al obtener la nota";

    if (isAxiosError(error)) {
      errorMsg = error.response?.data?.message || errorMsg;
    }

    return { data: null, error: errorMsg };
  }
}

export const updateNote = async (id: string, note: EditNote): Promise<Result<CreateNoteResponse>> => {
  try {
    const response = await api.put(`/note/${id}`, note);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error updating note:", error);
    let errorMsg = "Error al actualizar la nota";

    if (isAxiosError(error)) {
      errorMsg = error.response?.data?.message || errorMsg;
    }

    return { data: null, error: errorMsg };
  }
}

export const deleteNote = async (id: string): Promise<Result<null>> => {
  try {
    const response = await api.delete(`/note/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error deleting note:", error);
    let errorMsg = "Error al eliminar la nota";

    if (isAxiosError(error)) {
      errorMsg = error.response?.data?.message || errorMsg;
    }

    return { data: null, error: errorMsg };
  }
}