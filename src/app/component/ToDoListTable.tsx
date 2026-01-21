'use client';

import { ToDoListTableView, useTodosController } from './todos';

export const ToDoListTable = () => {
    const vm = useTodosController();

    return (
        <ToDoListTableView
            todos={vm.todos}
            selectedStatus={vm.selectedStatus}
            selectedSort={vm.selectedSort}
            editingId={vm.editingId}
            now={vm.now}
            showPickerId={vm.showPickerId}
            pickerAnchorEl={vm.pickerAnchorEl}
            onChangeStatus={vm.setStatus}
            onChangeSort={vm.setSort}
            onToggleCompleted={vm.toggleCompleted}
            onStartEditTitle={vm.startEditTitle}
            onChangeTitle={vm.changeTitle}
            onCommitTitle={vm.commitTitle}
            onCancelTitle={vm.cancelEditTitle}
            onAddNewTaskRow={vm.addNewTaskRow}
            onChangeNewTaskTitle={vm.changeNewTaskTitle}
            onCreateNewTask={vm.createNewTask}
            onRemoveNewTaskRow={vm.removeNewTaskRow}
            onOpenDueDatePicker={vm.openDueDatePicker}
            onChangeDueDate={vm.changeDueDate}
            onCloseDueDatePickerAndPersist={vm.closeDueDatePickerAndPersist}
        />
    );
}