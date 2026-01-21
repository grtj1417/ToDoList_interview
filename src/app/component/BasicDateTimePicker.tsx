import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

interface BasicDateTimePickerProps {
    value: string | null;
    onChange: (value: string) => void;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

export default function BasicDateTimePicker({ value, onChange, onClose, anchorEl }: BasicDateTimePickerProps) {
    const dayjsValue = value ? dayjs(value) : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                value={dayjsValue}
                open={true}
                onClose={() => onClose()}
                onChange={(newValue) => {
                    if (newValue) {
                        const formatted = newValue.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                        onChange(formatted);
                    }
                }}
                slotProps={{
                    popper: {
                        anchorEl,
                        placement: 'bottom-start',
                    },
                }}
                localeText={{
                    cancelButtonLabel: '取消',
                    okButtonLabel: '確認',
                }}
                sx={{ display: 'none' }}
            />
        </LocalizationProvider>
    );
}
