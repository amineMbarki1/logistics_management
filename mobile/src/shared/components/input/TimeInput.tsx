import { useFormContext } from "react-hook-form";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TextInput, { Props as TextInputProps } from "./TextInput";
import formatTime from "@/utils/formatTime";

export default function TimeInput({ label, name, ...props }: TextInputProps) {
  const { setValue } = useFormContext();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
    setValue(name, date);
  };



  return (
    <>
      <DateTimePickerModal
        mode="time"
        is24Hour
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
      <TextInput
        value={formatTime(selectedDate)}
        onPress={() => setIsDatePickerVisible(true)}
        name={name}
        label={label}
        inputMode="none"
        caretHidden
        {...props}
      />
    </>
  );
}
