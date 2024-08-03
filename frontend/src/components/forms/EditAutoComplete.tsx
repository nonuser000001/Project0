import Autocomplete from "@mui/joy/Autocomplete";
import * as React from 'react';

const Kshirut = [{ option: "כשיר" }, { option: "לא כשיר" }];

const EditAutoComplete: React.FC<{ className: string }> = (props) => {
  const [value, setValue] = React.useState<string | null>(Kshirut[0].option);
  return (
    <Autocomplete
    value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
      className={props.className}
      sx={{ height : '1px', backgroundColor: "transparent" }}
      id="SelectKshirot"
      options={Kshirut.map((option) => option.option)}
    />
  );
};

export default EditAutoComplete;
