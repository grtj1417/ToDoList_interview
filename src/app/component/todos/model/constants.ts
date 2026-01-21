import type { SelectOption, TodoSortKey, TodoStatusFilter } from './types';

export const statusOptions: Array<SelectOption<TodoStatusFilter>> = [
    { value: 'all', label: '全部任務' },
    { value: 'active', label: '進行中' },
    { value: 'completed', label: '已完成' },
];

export const sortOptions: Array<SelectOption<TodoSortKey>> = [
    { value: 'createdAt', label: 'Created at' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'taskId', label: 'Task ID' },
];
