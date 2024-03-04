import { useFormContext } from "react-hook-form";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TextInput, { Props as TextInputProps } from "./TextInput";

export default function DateInput({ label, name, ...props }: TextInputProps) {
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
        mode="date"
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
      <TextInput
        onPress={() => setIsDatePickerVisible(true)}
        name={name}
        label={label}
        inputMode="none"
        caretHidden
        value={selectedDate.toDateString()}
        {...props}
      />
    </>
  );
}
