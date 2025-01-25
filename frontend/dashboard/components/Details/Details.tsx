import "./Details.css";
import { PropsWithChildren } from "react";

import React from "react";

type InputKey = "keeper" | "group" | "organization" | "journey";
type InputType = "text" | "date" | "select" | "number";

interface DetailItemProps {
  label: string;
  value?: string | number;
  isEditable?: boolean;
  inputName?: string;
  inputKey?: InputKey;
  inputType?: InputType;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: "keeper" | "group" | "organization" | "journey"
  ) => void;
  selectOptions?: string[];
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  isEditable = false,
  inputName,
  inputKey,
  inputType = "text",
  onChange,
  selectOptions = [],
}) => {
  const renderInput = () => {
    if (!isEditable) return <span className="detail-value">{value}</span>;
    const parseDate = (dateString: string) => {
      const [datePart] = dateString.split("-");
      const [day, month, year] = datePart.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    switch (inputType) {
      case "date":
        return (
          <input
            type="date"
            className="detail-value editable"
            min={parseDate(String(new Date().toLocaleDateString("it-IT")))}
            value={parseDate(String(value))}
            onChange={(e) => onChange && onChange(e, inputKey!)}
            name={inputName}
          />
        );

      case "select":
        return (
          <select
            className="detail-value editable"
            onChange={(e) => onChange && onChange(e, inputKey!)}
            name={inputName}
          >
            <option value="" disabled selected>
              {value}
            </option>
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={inputType}
            className="detail-value editable"
            value={value}
            onChange={(e) => onChange && onChange(e, inputKey!)}
            name={inputName}
          />
        );
    }
  };

  return (
    <div className="detail-item">
      <span className="detail-label">{label}:</span>
      {renderInput()}
    </div>
  );
};

const DetailsGrid = ({ children }: PropsWithChildren) => {
  return <div className="details-grid">{children}</div>;
};

const DetailsSection = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <section className="details-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </section>
  );
};

const Details = {
  DetailItem,
  DetailsGrid,
  DetailsSection,
};

export default Details;
