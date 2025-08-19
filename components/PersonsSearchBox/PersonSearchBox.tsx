import React from "react";
import css from "./PersonsSearchBox.module.css";

export interface PersonSearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

const PersonSearchBox = ({ value, onSearch }: PersonSearchBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div className={css.boxInput}>
      <div className={css.border}>
        <input
          onChange={handleChange}
          value={value}
          placeholder="Search persons"
          type="text"
          className={css.input}
        />
      </div>
    </div>
  );
};

export default PersonSearchBox;
