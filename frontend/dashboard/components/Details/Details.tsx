import "./Details.css";
import { PropsWithChildren } from "react";

import React from "react";

type InputKey = "keeper" | "group" | "organization" | "journey";
type InputType = "text" | "date" | "select" | "number";

/**
 * Props interface for DetailItem component
 * @interface DetailItemProps
 */
interface DetailItemProps {
  /** Label text for the detail item */
  label: string;
  /** Value to display */
  value?: string | number;
  /** Whether the item is editable */
  isEditable?: boolean;
  /** Name attribute for the input element */
  inputName?: string;
  /** Key identifier for the input */
  inputKey?: InputKey;
  /** Type of input element */
  inputType?: InputType;
  /** Change event handler */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: "keeper" | "group" | "organization" | "journey"
  ) => void;
  /** Options for select input type */
  selectOptions?: string[];
  /** Start date for date input type */
  startDate?: string | null;
}

/**
 * Component for rendering a single detail item
 * @param {DetailItemProps} props - Component props
 * @returns {React.ReactElement} DetailItem component
 */
const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  isEditable = false,
  inputName,
  inputKey,
  inputType = "text",
  onChange,
  selectOptions = [],
  startDate,
}) => {
  /**
   * Renders the appropriate input element based on type
   * @returns {React.ReactElement} Input element
   */
  const renderInput = () => {
    if (!isEditable) return <span className="detail-value">{value}</span>;
    /**
     * Parses date string to required format
     * @param {string} dateString - Date string to parse
     * @returns {string} Formatted date string
     */
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
            min={
              startDate
                ? startDate
                : parseDate(new Date().toLocaleDateString("it-IT"))
            }
            value={startDate ? startDate : parseDate(String(value))}
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

/**
 * Grid container for detail items
 * @param {PropsWithChildren} props - Component props
 * @returns {React.ReactElement} DetailsGrid component
 */
const DetailsGrid = ({ children }: PropsWithChildren) => {
  return <div className="details-grid">{children}</div>;
};

/**
 * Section container for grouped detail items
 * @param {PropsWithChildren<{ title: string }>} props - Component props
 * @returns {React.ReactElement} DetailsSection component
 */
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
