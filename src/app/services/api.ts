export async function getToDo(id: number) {
    const response = await fetch(`/api/todos/${id}`);
    const data = await response.json();
    return data.data?.items || [];
}

export async function getToDos(params?: {
    status?: 'all' | 'active' | 'completed';
    search?: string;
    sortBy?: 'createdAt' | 'updatedAt' | 'order' | 'dueDate';
    sortDir?: 'asc' | 'desc';
}) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortDir) queryParams.append('sortDir', params.sortDir);
    
    const url = `/api/todos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data?.items || [];
}

export async function createToDos(title: string, notes?: string, dueDate?: string, tags?: string[], order?: number) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, notes, dueDate, tags, order }),
    });
    const data = await response.json();
    return data.data?.items || [];
}

export async function updateToDos(id: number, title?: string, notes?: string, completed?: boolean, dueDate?: string, tags?: string[], order?: number) {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, notes, completed, dueDate, tags, order }),
    });
    const data = await response.json();
    return data.data?.items || [];
}