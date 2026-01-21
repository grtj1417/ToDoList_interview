'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createToDos, getToDos, updateToDos } from '../../../services/api';
import type { ToDoItem, TodoSortKey, TodoStatusFilter } from '../model/types';

interface UseTodosControllerResult {
    todos: ToDoItem[];
    selectedStatus: TodoStatusFilter;
    selectedSort: TodoSortKey;
    editingId: number | null;
    oldTitle: string;
    showPickerId: number | null;
    pickerAnchorEl: HTMLElement | null;

    now: Date;

    setStatus: (status: TodoStatusFilter) => void;
    setSort: (sort: TodoSortKey) => void;

    toggleCompleted: (todoId: number) => void;

    startEditTitle: (todoId: number, currentTitle: string) => void;
    changeTitle: (todoId: number, nextTitle: string) => void;
    commitTitle: (todoId: number) => void;
    cancelEditTitle: (todoId: number) => void;

    addNewTaskRow: () => void;
    changeNewTaskTitle: (nextTitle: string) => void;
    createNewTask: () => void;
    removeNewTaskRow: () => void;

    openDueDatePicker: (todoId: number, anchor: HTMLElement) => void;
    changeDueDate: (todoId: number, nextDueDate: string) => void;
    closeDueDatePickerAndPersist: (todoId: number) => void;
}

export const useTodosController = (): UseTodosControllerResult => {
    const [todos, setTodos] = useState<ToDoItem[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<TodoStatusFilter>('all');
    const [selectedSort, setSelectedSort] = useState<TodoSortKey>('createdAt');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [oldTitle, setOldTitle] = useState<string>('');
    const [showPickerId, setShowPickerId] = useState<number | null>(null);
    const [pickerAnchorEl, setPickerAnchorEl] = useState<HTMLElement | null>(null);

    const now = useMemo(() => new Date(), []);

    // ========== Data fetching ==========
    const refresh = useCallback(
        async (params?: Parameters<typeof getToDos>[0]) => {
            const items = await getToDos(params);
            setTodos(items);
        },
        []
    );

    useEffect(() => {
        refresh();
    }, [refresh]);

    // ========== Filters & sorting ==========
    const setStatus = useCallback(
        (status: TodoStatusFilter) => {
            setSelectedStatus(status);
            refresh({ status, sortDir: 'asc' });
        },
        [refresh]
    );

    const setSort = useCallback(
        (sort: TodoSortKey) => {
            setSelectedSort(sort);
            refresh(
                sort === 'taskId'
                    ? { sortDir: 'asc' }
                    : { sortBy: sort, sortDir: 'asc' }
            );
        },
        [refresh]
    );

    // ========== Completion status ==========
    const toggleCompleted = (todoId: number) => {
        setTodos(prev => {
            const current = prev.find(t => t.id === todoId);
            if (!current) return prev;
            updateToDos(todoId, undefined, undefined, !current.completed, undefined, undefined);
            return prev.map(t =>
                t.id === todoId ? { ...t, completed: !t.completed } : t
            );
        });
    };

    // ========== Title editing ==========
    const startEditTitle = (todoId: number, currentTitle: string) => {
        setEditingId(todoId);
        setOldTitle(currentTitle);
    };

    const changeTitle = (todoId: number, nextTitle: string) => {
        setTodos(prev =>
            prev.map(t => (t.id === todoId ? { ...t, title: nextTitle } : t))
        );
    };

    const commitTitle = (todoId: number) => {
        setTodos(prev => {
            const current = prev.find(t => t.id === todoId);
            if (!current) return prev;
            updateToDos(todoId, current.title).then(refresh);
            return prev;
        });

        setEditingId(null);
    };

    const cancelEditTitle = (todoId: number) => {
        if (editingId !== todoId) return;
        setTodos(prev =>
            prev.map(t =>
                t.id === todoId ? { ...t, title: oldTitle } : t
            )
        );
        setEditingId(null);
    };

    // ========== Creating new tasks ==========
    const addNewTaskRow = () => {
        setTodos(prev => {
            if (prev.some(t => t.id === -1)) return prev;
            return [
                ...prev,
                {
                    id: -1,
                    title: '',
                    completed: false,
                    dueDate: '',
                    createdAt: new Date().toISOString(),
                },
            ];
        });
    };

    const changeNewTaskTitle = (nextTitle: string) => {
        setTodos(prev =>
            prev.map(t => (t.id === -1 ? { ...t, title: nextTitle } : t))
        );
    };

    const createNewTask = () => {
        setTodos(prev => {
            const draft = prev.find(t => t.id === -1);
            if (!draft) return prev;
            createToDos(draft.title).then(refresh);
            return prev;
        });
    };

    const removeNewTaskRow = () => {
        setTodos(prev => prev.filter(t => t.id !== -1));
    };

    // ========== DueDate Picker ==========
    const openDueDatePicker = useCallback(
        (todoId: number, anchor: HTMLElement) => {
            setShowPickerId(todoId);
            setPickerAnchorEl(anchor);
        },
        []
    );

    const changeDueDate = (todoId: number, nextDueDate: string) => {
        setTodos(prev =>
            prev.map(t =>
                t.id === todoId ? { ...t, dueDate: nextDueDate } : t
            )
        );
    };

    const closeDueDatePickerAndPersist = (todoId: number) => {
        setTodos(prev => {
            const current = prev.find(t => t.id === todoId);
            if (current) {
                updateToDos(todoId, undefined, undefined, undefined, current.dueDate, undefined)
                    .then(refresh);
            }
            return prev;
        });

        setShowPickerId(null);
        setPickerAnchorEl(null);
    };


    return {
        todos,
        selectedStatus,
        selectedSort,
        editingId,
        oldTitle,
        showPickerId,
        pickerAnchorEl,
        now,
        setStatus,
        setSort,
        toggleCompleted,
        startEditTitle,
        changeTitle,
        commitTitle,
        cancelEditTitle,
        addNewTaskRow,
        changeNewTaskTitle,
        createNewTask,
        removeNewTaskRow,
        openDueDatePicker,
        changeDueDate,
        closeDueDatePickerAndPersist,
    };
};
