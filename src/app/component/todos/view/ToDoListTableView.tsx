'use client';

import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';

import { theme } from '../../../styles/theme';
import BasicDateTimePicker from '../../BasicDateTimePicker';
import { formatDate } from '../model/formatters';
import { sortOptions, statusOptions } from '../model/constants';
import type { ToDoItem, TodoSortKey, TodoStatusFilter } from '../model/types';

const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#A6A6A6',
        paddingBottom: '8px',
        padding: '16px 0 8px 16px',
    },
    [`&.${tableCellClasses.body}`]: {
        border: 'none',
        padding: '0 0 8px 16px',
    },
}));

const StyledTableRow = styled(TableRow)(({ }) => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledInput = styled(Input)(({ }) => ({
    padding: '4px 8px',
    '&.Mui-focused': {
        borderColor: '#4C88FF',
        borderWidth: 2,
        border: '1px solid #4C88FF',
    },
}));

const StyledSelect = styled(Select)(({ }) => ({
    width: '30px',
    height: '30px',
    padding: '4px 8px',
    borderRadius: '6px',
    '&.Mui-focused': {
        backgroundColor: alpha(theme.palette.text.primary, 0.1),
    },
}));

const StyleMenuItem = styled(MenuItem)(({ }) => ({
    fontSize: 14,
    '&.Mui-selected': {
        color: '#4C88FF',
        backgroundColor: 'transparent',
    }
}));

const compeletedIcon = () => {
    return (
        <div style={{ width: '16px', height: '16px', display: 'flex', padding: '2px', backgroundColor: '#419E34', borderRadius: '50%' }}>
            <CheckIcon fontSize="inherit" />
        </div>
    );
};

export interface ToDoListTableViewProps {
    todos: ToDoItem[];
    selectedStatus: TodoStatusFilter;
    selectedSort: TodoSortKey;
    editingId: number | null;

    now: Date;

    showPickerId: number | null;
    pickerAnchorEl: HTMLElement | null;

    onChangeStatus: (status: TodoStatusFilter) => void;
    onChangeSort: (sort: TodoSortKey) => void;

    onToggleCompleted: (todoId: number) => void;

    onStartEditTitle: (todoId: number, currentTitle: string) => void;
    onChangeTitle: (todoId: number, nextTitle: string) => void;
    onCommitTitle: (todoId: number) => void;
    onCancelTitle: (todoId: number) => void;

    onAddNewTaskRow: () => void;
    onChangeNewTaskTitle: (nextTitle: string) => void;
    onCreateNewTask: () => void;
    onRemoveNewTaskRow: () => void;

    onOpenDueDatePicker: (todoId: number, anchor: HTMLElement) => void;
    onChangeDueDate: (todoId: number, nextDueDate: string) => void;
    onCloseDueDatePickerAndPersist: (todoId: number) => void;
}

export const ToDoListTableView = ({
    todos,
    selectedStatus,
    selectedSort,
    editingId,
    now,
    showPickerId,
    pickerAnchorEl,
    onChangeStatus,
    onChangeSort,
    onToggleCompleted,
    onStartEditTitle,
    onChangeTitle,
    onCommitTitle,
    onCancelTitle,
    onAddNewTaskRow,
    onChangeNewTaskTitle,
    onCreateNewTask,
    onRemoveNewTaskRow,
    onOpenDueDatePicker,
    onChangeDueDate,
    onCloseDueDatePickerAndPersist,
}: ToDoListTableViewProps) => {
    return (
        <Paper sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: theme.palette.background.default, display: "flex", flexDirection: "column", padding: "8px 16px" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '16px' }}>
                <div style={{ fontSize: 20, width: '862px', borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.15)}`, paddingBottom: '8px' }}>Task</div>
                <div style={{ display: 'flex', width: '862px', alignItems: 'center', gap: '12px' }}>
                    <Button size="small" variant="outlined" sx={{ color: theme.palette.text.primary, borderColor: alpha(theme.palette.text.primary, 0.15) }}>
                        + New Task
                    </Button>

                    <StyledSelect
                        labelId="status-filter"
                        id="status-filter"
                        value={selectedStatus}
                        label="Status"
                        variant="standard"
                        disableUnderline
                        renderValue={() => (
                            <Image
                                src="/status-filter-icon.png"
                                alt="status filter icon"
                                width={16}
                                height={16}
                                style={{ marginTop: '5px' }}
                            />
                        )}
                        sx={{ '& .MuiSelect-icon': { display: 'none' } }}
                        onChange={(e) => onChangeStatus(e.target.value as TodoStatusFilter)}
                    >
                        {statusOptions.map(option => (
                            <StyleMenuItem key={option.value} value={option.value}>
                                {option.label}
                                <CheckIcon sx={{ marginLeft: '32px', visibility: selectedStatus === option.value ? 'visible' : 'hidden' }} />
                            </StyleMenuItem>
                        ))}
                    </StyledSelect>

                    <StyledSelect
                        labelId="sort-by"
                        id="sort-by"
                        value={selectedSort}
                        label="Sort By"
                        variant="standard"
                        disableUnderline
                        renderValue={() => (
                            <Image
                                src="/sort-icon.png"
                                alt="sort icon"
                                width={16}
                                height={16}
                                style={{ marginTop: '5px' }}
                            />
                        )}
                        sx={{ '& .MuiSelect-icon': { display: 'none' } }}
                        onChange={(e) => onChangeSort(e.target.value as TodoSortKey)}
                    >
                        {sortOptions.map(option => (
                            <StyleMenuItem key={option.value} value={option.value}>
                                {option.label}
                                <CheckIcon sx={{ marginLeft: '32px', visibility: selectedSort === option.value ? 'visible' : 'hidden' }} />
                            </StyleMenuItem>
                        ))}
                    </StyledSelect>
                </div>
            </div>

            <TableContainer sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: theme.palette.background.default, marginTop: '12px', paddingX: '16px' }} component={Paper}>
                <Table sx={{ minWidth: '100vw', backgroundColor: theme.palette.background.default }} aria-label="todo table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <Image src="/task-title-icon.png" alt="task title icon" width={12} height={12} style={{ marginRight: '4px' }} />Task Title
                            </StyledTableCell>
                            <StyledTableCell>
                                <Image src="/date-icon.png" alt="date icon" width={12} height={12} style={{ marginRight: '4px' }} />Due Date
                            </StyledTableCell>
                            <StyledTableCell>
                                <Image src="/calendar-icon.png" alt="calendar icon" width={12} height={12} style={{ marginRight: '4px' }} />Created at
                            </StyledTableCell>
                            <StyledTableCell>
                                <Image src="/link-icon.png" alt="link icon" width={12} height={12} style={{ marginRight: '4px' }} />Task ID
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {todos.map((todo) => {
                            const isExpired = new Date(todo.dueDate) < now;
                            const isDraft = todo.id === -1;

                            return (
                                <StyledTableRow
                                    key={todo.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            sx={{ '&.Mui-checked': { color: theme.palette.text.primary }, width: '20px', height: '20px', marginRight: '8px' }}
                                            disabled={isDraft}
                                            checked={todo.completed}
                                            checkedIcon={compeletedIcon()}
                                            onClick={() => onToggleCompleted(todo.id)}
                                        />

                                        {isDraft ? (
                                            <StyledInput
                                                autoFocus
                                                disableUnderline
                                                placeholder="輸入後按下Enter進行儲存"
                                                fullWidth
                                                onChange={(e) => onChangeNewTaskTitle(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        onCreateNewTask();
                                                    }
                                                }}
                                                onBlur={() => onRemoveNewTaskRow()}
                                            />
                                        ) : (
                                            <StyledInput
                                                value={todo.title || ''}
                                                disableUnderline
                                                fullWidth
                                                autoFocus={editingId === todo.id}
                                                onFocus={() => onStartEditTitle(todo.id, todo.title)}
                                                onChange={(e) => onChangeTitle(todo.id, e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        onCommitTitle(todo.id);
                                                    }
                                                }}
                                                onBlur={() => onCancelTitle(todo.id)}
                                            />
                                        )}
                                    </StyledTableCell>

                                    <StyledTableCell style={isExpired ? { color: '#F05B56' } : { position: 'relative' }}>
                                        {!todo.dueDate ? (
                                            <Image
                                                src="/date-icon.png"
                                                alt="date icon"
                                                width={12}
                                                height={12}
                                                style={{ cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    const cell = e.currentTarget.closest('td');
                                                    if (!cell) return;
                                                    onOpenDueDatePicker(todo.id, cell as HTMLElement);
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    const cell = e.currentTarget.closest('td');
                                                    if (!cell) return;
                                                    onOpenDueDatePicker(todo.id, cell as HTMLElement);
                                                }}
                                            >
                                                {formatDate(todo.dueDate)}
                                            </div>
                                        )}

                                        {showPickerId === todo.id && (
                                            <BasicDateTimePicker
                                                value={todo.dueDate}
                                                anchorEl={pickerAnchorEl}
                                                onChange={(newDate) => onChangeDueDate(todo.id, newDate)}
                                                onClose={() => onCloseDueDatePickerAndPersist(todo.id)}
                                            />
                                        )}
                                    </StyledTableCell>

                                    <StyledTableCell>{formatDate(todo.createdAt)}</StyledTableCell>
                                    <StyledTableCell>{isDraft ? '' : todo.id}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}

                        <StyledTableRow>
                            <StyledTableCell component="th">
                                <Button
                                    size="small"
                                    sx={{ color: theme.palette.text.secondary, marginLeft: '32px' }}
                                    disabled={todos.some(todo => todo.id === -1)}
                                    onClick={() => onAddNewTaskRow()}
                                >
                                    New Task
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
