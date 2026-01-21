export interface ToDoItem {
    id: number;
    title: string;
    completed: boolean;
    dueDate: string;
    createdAt: string;
}

export type TodoStatusFilter = 'all' | 'active' | 'completed';

export type TodoSortKey = 'createdAt' | 'dueDate' | 'taskId';

export interface SelectOption<T extends string> {
    value: T;
    label: string;
}
