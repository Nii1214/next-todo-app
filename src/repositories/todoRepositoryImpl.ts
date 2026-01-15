// src/repositories/todoRepositoryImpl.ts
import { createClient } from "@/lib/supabase/client"
import { TodoRepository } from "./todoRepository"

export const todoRepository: TodoRepository = {
  async create(input) {
    const supabase = createClient()

    const { error } = await supabase
      .from("todos")
      .insert(input)

    if (error) {
      throw error
    }
  },
}
