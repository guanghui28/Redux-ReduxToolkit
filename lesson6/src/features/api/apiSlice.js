import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
	tagTypes: ["todos"],
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "/todos",
			transformResponse: (res) => res.sort((a, b) => a.id - b.id),
			providesTags: ["todos"],
		}),
		addTodo: builder.mutation({
			query: (todo) => ({
				url: "/todos",
				method: "POST",
				body: todo,
			}),
			invalidatesTags: ["todos"],
		}),
		updateTodo: builder.mutation({
			query: (todo) => ({
				url: `/todos/${todo.id}`,
				method: "PATCH",
				body: todo,
			}),
			invalidatesTags: ["todos"],
		}),
		deleteTodo: builder.mutation({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: ["todos"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = apiSlice;
