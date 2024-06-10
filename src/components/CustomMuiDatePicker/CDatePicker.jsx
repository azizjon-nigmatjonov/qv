// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
// import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { styled } from "@mui/material/styles";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import CTextField from './CTextField'

export default function CDatePicker({
  label,
  disabled,
  height,
  onChange,
  validation,
  withoutBorder,
  value = null,
  validate,
  error,
  maxDate,
  minDate,
  disableFuture,
  consolable,
  fullWidth,
  icon,
  inputFormat = 'dd/MM/yyyy',
  ...props
}) {
  // const popperSx = styled(DesktopDatePicker)(() => ({
  //   "& .MuiPaper-root": {
  //     border: "1px solid red",
  //   },
  //   "& .MuiCalendarPicker-root": {},
  //   "& .PrivatePickersSlideTransition-root": {},
  //   "& .MuiPickersDay-dayWithMargin": {},
  //   "& .MuiTabs-root": {},
  // }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        value={value}
        disabled={disabled}
        inputFormat={inputFormat}
        onChange={onChange}
        closeOnSelect={true}
        maxDate={maxDate}
        minDate={minDate}
        disableCloseOnSelect={false}
        disableFuture={disableFuture}
        style={{ height: '40px', width: props.width }}
        // minDate={new Date("2017-01-01")}
        // PopperProps={{
        //   sx: popperSx,
        // }}
        renderInput={(params) => (
          <CTextField
            {...params}
            icon={icon}
            errorFromDatePicker={error}
            consolable={consolable}
            style={{ height: '40px' }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment style={{ zIndex: 0}}>
            //       <Calendar />
            //     </InputAdornment>
            //   ),
            // }}
            fullWidth={fullWidth}
            // errorText={error?.message}
            className={withoutBorder ? 'product-table-input' : ''}
            validation={{ required: true }}
            // error={error ? true : false}
          />
        )}
        {...props}
      />
      {/* <MobileDatePicker
        label={label}
        inputFormat="dd/MM/yyyy"
        closeOnSelect={true}
        value={value}
        maxDate={maxDate}
        minDate={minDate}
        disableCloseOnSelect={false}
        disabled={disabled}
        onChange={onChange}
        disableFuture={disableFuture}
        // minDate={new Date('2022-08-12')}
        renderInput={(params) => (
          <FTextField
            {...props}
            fullWidth={fullWidth}
            errorText={error}
            {...params}
            className={withoutBorder ? "product-table-input" : ""}
            validation={{ required: true }}
            // error={error ? true : false}
            style={{
              height: "40px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Calendar />
                </InputAdornment>
              ),
            }}
          />
        )}
      /> */}
    </LocalizationProvider>
  )
}
